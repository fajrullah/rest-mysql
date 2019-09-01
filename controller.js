'use strict'
var response = require('./res');
var connection = require('./conn');

const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./models/User')
const Kbli = require('./models/Kbli')
const Op = require('./database/db').Sequelize.Op;
users.use(cors())

process.env.SECRET_KEY = '4sri'

exports.users = function(req,res){
	    connection.query('SELECT * FROM person', function (error, rows, fields){
        if(error){
            return res.send({ error: false, data: results, message: 'users list.' });
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req,res){
	response.ok("... status", res)
}

exports.findUsers = function(req, res) {
    var user_id = req.params.user_id;
    connection.query('SELECT * FROM person where id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
        	return res.send({ error: false, data: results, message: 'users list.' });
        } else{
            response.ok(rows, res)
        }
    });
};


exports.createUsers = function(req, res) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    connection.query('INSERT INTO person (first_name, last_name) values (?,?)',
    [ first_name, last_name ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};

exports.updateUsers = function(req, res) {
    var user_id = req.body.user_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    connection.query('UPDATE person SET first_name = ?, last_name = ? WHERE id = ?',
    [ first_name, last_name, user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteUsers = function(req, res) {
    var user_id = req.body.user_id;
    connection.query('DELETE FROM person WHERE id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};

exports.authUsers = function(req, res){
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      } else {
        res.status(400).json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
}

/** Kode ini digunakan untuk Registrasi User ,
 jika ada perubahan bisa lakukan pada Kode ini */
exports.register = function(req, res){
  const today = new Date()

  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: 200,
                         description : user.email + ' success , menunggu konfirmasi admin',
                         msgCode : 'success' 
                          })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
             res.json({ status: 200,
                         description : 'User already exist',
                         msgCode : 'danger'
                          })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

exports.profile = function(req, res){
  const token = req.headers['authorization']
  const secret = req.headers['secret']
  jwt.verify(token, secret, function(err, decoded) {
    if(err){
      res.send({ status : 'off' ,  error : err})
    }else{
      User.findOne({
        where: {
          id: decoded.id
        }
      })
        .then(user => {
          if (user) {
            res.send({status : 'on' , details : user})
          } 
        })
        .catch(err => {
          res.send({status : 'off' , details : err})
        })
    }
  });
  // jwt.verify(token, req.headers['secret'], function(err, decoded) {
  //   if(decoded.id){
  //     User.findOne({
  //       where: {
  //         id: decoded.id
  //       }
  //     })
  //       .then(user => {
  //         if (user) {
  //           res.send({status : 'on' , details : user})
  //         } 
  //       })
  //       .catch(err => {
  //         res.send({status : 'off' , details : err})
  //       })
  //   }
  //   if(err){
  //     res.send({status : 'off' , error : err})
  //   }

  // });

}

exports.createUser = async ({ name, password }) => { 
  return await User.create({ name, password });
};

exports.deleteUser = async (id) => { 
  return await User.destroy({where: {id: id}})
        .then(affectedRow => affectedRow)
        .catch(error => console.log(error))
};
exports.getAllUsers = async () => {
  return await User.findAll();
};
exports.getUser = async (obj) => {
    return await User.findOne({
    where: obj,
  });
};
exports.getUserByDate = async (obj) => {
    const {start , end } = obj
    return await User.findAll({
        where: {
              created: {
                  [Op.between]: [start,end]
                }
        }
      });
};
exports.updateUser = async (obj) => {
    const { req } = obj
    return await User.update({status: req.body.status , 
                      level : req.body.level ,  
                      last_name : req.body.last_name, 
                      first_name : req.body.first_name},
                     {returning: true, plain: true, where: {id: req.body.id} })
                    .then(update => update)
                    .catch(error => error)
};

exports.updatePassword = async (obj) => {
    const { req } = obj
    return await bcrypt.hash(req.body.password, 10, (err, hash) => {
          return User.update({password: hash},
                     {returning: true, plain: true, where: {email: req.body.email} })
                    .then(update => update)
                    .catch(error => error)
        })
};

exports.getAllKbli = async () => {
  return await Kbli.findAll();
};

exports.createKbli = async (obj) => { 
    const { req } = obj
    const { body } = req
    return await Kbli.create(body);
};

exports.updateKbli = async (obj) => {
    const { req } = obj
    return await Kbli.update({
                    price: JSON.stringify(req.body.price),
                    title : req.body.title,
                    description : req.body.description
                        },
                     {returning: true, plain: true, where: {id_row: req.body.id_row } })
                    .then(update => update)
                    .catch(error => error)
};