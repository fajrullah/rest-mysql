const Sequelize = require('sequelize')
const db = require('../database/db.js')


const Level = db.sequelize.define(
  'tbl_level',
  {  
    year: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },    
    createtime: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatetime: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)
module.exports = Level
Level.sync()
  .then(() => console.log('Level'))
  .catch(err => console.log('‘error credential or something’'));

  