module.exports = (sequelize, type) => {
    return sequelize.define('tv', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        show: type.STRING,
        year:   type.INTEGER,
        rating: type.INTEGER,
        season: type.INTEGER
    })
}

//addshow
//showlist
