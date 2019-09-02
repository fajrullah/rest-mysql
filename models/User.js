const Sequelize = require('sequelize')
const db = require('../database/db.js')


const User = db.sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    status : {
      type: Sequelize.INTEGER
    },    
    level : {
      type: Sequelize.INTEGER
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false,
  },
)
module.exports = User
User.prototype.toJSON =  function () {
  let values = Object.assign({}, this.get());
  delete values.password;
  return values;
}

User.sync()
  .then(() => console.log('User'))
  .catch(err => console.log('‘BTW, did you enter wrong database credentials?’'));

  