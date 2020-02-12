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

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
// dependencies
const { User, Blog, Tag, Movie, Tv } = require('./sequelize')

app.post('/addmovie', (req, res) => {
    console.log(req.body);
    Movie.create(req.body).then(movie => res.json(movie))
    // console.log(req.body.name);
})
//SHOWS
app.post('/addshow', (req, res) => {
    console.log(req.body);
    Tv.create(req.body).then(show => res.json(show))
})
app.get('/showlist', (req, res) => {
    Tv.findAll().then(list => res.json(list))
    
})
app.get('/topratedmovies', (req, res) => {
    Movie.findAll().then(list => res.json(list))
    
})