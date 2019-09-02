const Sequelize = require('sequelize')
const db = require('../database/db.js')


const Kbli = db.sequelize.define(
  'tbl_kbli',
  { 
    id_row: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },   
    level_1: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },    
    level_2: {
      type: Sequelize.INTEGER,
      primaryKey: true,

    },
    level_3: {
      type: Sequelize.INTEGER,
      primaryKey: true,

    },
    level_4: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    level_5: {
      type: Sequelize.INTEGER,
      primaryKey: true,

    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    createtime: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatetime: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    price: {
      type: Sequelize.STRING
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)
module.exports = Kbli
Kbli.sync()
  .then(() => console.log('Kbli'))
  .catch(err => console.log('‘error credential or something’'));

  