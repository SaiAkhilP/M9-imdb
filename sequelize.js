const Sequelize = require('sequelize')
const MovieModel = require('./models/insertmovie')
const TvModel = require('./models/tvseries')
const sequelize = new Sequelize('imdb', 'insomniac', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
const Movie=MovieModel(sequelize,Sequelize)
const Tv=TvModel(sequelize, Sequelize)
sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })
module.exports = {
  Movie,
  Tv
}