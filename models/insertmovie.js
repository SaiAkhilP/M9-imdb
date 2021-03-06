module.exports = (sequelize, type) => {
    return sequelize.define('movie', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: type.STRING,
        year:   type.INTEGER,
        rating: type.INTEGER
    })
}
