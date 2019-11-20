const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'insomniac',
  password : 'password',
  database : 'imdb'
});


// connection.query('SELECT now()', function(err, rows) {
//     if (err) throw err;
  
//     console.log('The current time is: ', rows[0].solution);
//   });
// API ENDPOINTS

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

// dependencies
const { User, Blog, Tag, Movie } = require('./sequelize')

app.post('/api/signup', (req, res) => {

    // console.log(req.body);
    User.create(req.body).then(user => res.json(user))
    // console.log(req.body.name);
})

app.post('/api/addmovie', (req, res) => {

    // console.log(req.body);
    Movie.create(req.body).then(movie => res.json(movie))
    // console.log(req.body.name);
})

// create a user
app.post('/api/users', (req, res) => {

    console.log(req.body);
    User.create(req.body).then(user => res.json(user))
    console.log(req.body.name);
})
// get all users
app.get('/api/users', (req, res) => {
    User.findAll().then(users => res.json(users))
    
})

app.get('/api/movielist', (req, res) => {
    Movie.findAll().then(lund => res.json(lund))
    
})

// create a blog post
app.post('/api/blogs', (req, res) => {
    const body = req.body
    // either find a tag with name or create a new one
    const tags = body.tags.map(tag => Tag.findOrCreate({ where: { name: tag.name }, defaults: { name: tag.name }}).spread((tag, created) => tag))
    User.findById(body.userId).then(() => Blog.create(body)).then(blog => Promise.all(tags).then(storedTags => blog.addTags(storedTags)).then(() => blog)).then(blog => Blog.findOne({ where: {id: blog.id}, include: [User, Tag]})).then(blogWithAssociations => res.json(blogWithAssociations)).catch(err => res.status(400).json({ err: `User with id = [${body.userId}] doesn\'t exist.`}))
})

// find blogs belonging to one user or all blogs
app.get('/api/blogs/:userId?', (req, res) => {
    let query;
    if(req.params.userId) {
        query = Blog.findAll({ include: [
            { model: User, where: { id: req.params.userId } },
            { model: Tag }
        ]})
    } else {
        query = Blog.findAll({ include: [Tag, User]})
    }
    return query.then(blogs => res.json(blogs))
})

// find blogs by tag
app.get('/api/blogs/:tag/tag', (req, res) => {
    Blog.findAll({
        include: [
            { model: Tag, where: { name: req.params.tag } }
        ]
    }).then(blogs => res.json(blogs))
})

// find blogs by tag
app.get('/api/blogs/:tag/tag', (req, res) => {
    Blog.findAll({
        include: [
            { model: Tag, where: { name: req.params.tag } }
        ]
    }).then(blogs => res.json(blogs))
})