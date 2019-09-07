'use strict';
const jwt = require('jsonwebtoken');
let passport = require('passport'),
    express = require('express'),
    app = express(),
    bcrypt = require('bcrypt'),
    passportJWT = require('passport-jwt'),
    ExtractJwt = passportJWT.ExtractJwt,
    JwtStrategy = passportJWT.Strategy,
    todoList = require('./controller'),
    jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = '4sri';


let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = todoList.getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);
app.use(passport.initialize());

module.exports = function(app) {
    // app.route('/')
    //     .get(todoList.index);
    // app.route('/users')
    //     .get(todoList.users);
    // app.route('/users/:user_id')
    //     .get(todoList.findUsers);
    // app.route('/users')
    //     .post(todoList.createUsers);
    // app.route('/users')
    //     .put(todoList.updateUsers);  
    // app.route('/users')
    //     .delete(todoList.deleteUsers);
    // app.route('/login')
    // 	.post(todoList.authUsers);

    app.route('/profile')
    	.get(todoList.profile);
    // app.get('/userss', function(req, res) {
    //   todoList.getAllUsers().then(user => res.json(user)); 
    // });// register route
    // app.post('/registers', function(req, res, next) {
    //   const { name, password } = req.body;
    //   todoList.createUser({ name, password }).then(user =>
    //     res.json({ user, msg: 'account created successfully' })
    //   );
    // });
    // app.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
    //     res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
    // });
    app.post('/level/', passport.authenticate('jwt', { session: false }), async function(req, res) {
         await todoList.createLevel({req}).then(user => res.json(user)).catch(err => res.json(err.errors)); 
    });
    app.put('/level/', passport.authenticate('jwt', { session: false }), async function(req, res) {
         await todoList.updateLevel({req}).then(user => res.json(user)).catch(err => console.log(err)); 
    });
    app.get('/level', passport.authenticate('jwt', { session: false }), async function(req, res) {
        todoList.getAllLevel().then(kbli => res.json(kbli)).catch(err => console.log(err)); 
    });

    app.post('/kbli/sps', passport.authenticate('jwt', { session: false }), async function(req, res) {
         await todoList.getKbliSpecific({req}).then(user => res.json(user)).catch(err => res.json(err.errors)); 
    });
    app.post('/kbli/', passport.authenticate('jwt', { session: false }), async function(req, res) {
         await todoList.createKbli({req}).then(user => res.json(user)).catch(err => res.json(err.errors)); 
    });
    app.put('/kbli/', passport.authenticate('jwt', { session: false }), async function(req, res) {
         await todoList.updateKbli({req}).then(user => res.json(user)).catch(err => console.log(err)); 
    });
    app.get('/kbli', passport.authenticate('jwt', { session: false }), async function(req, res) {
        todoList.getAllKbli().then(kbli => res.json(kbli)).catch(err => console.log(err)); 
    });
    app.post('/kblilast', passport.authenticate('jwt', { session: false }), async function(req, res) {
        todoList.getAllKbliLast({req}).then(kbli => res.json(kbli)).catch(err => console.log(err)); 
    });
    app.post('/kblilasttwo', passport.authenticate('jwt', { session: false }), async function(req, res) {
        todoList.getAllKbliLastTwo({req}).then(kbli => res.json(kbli)).catch(err => console.log(err)); 
    });
    app.post('/kblilastthree', passport.authenticate('jwt', { session: false }), async function(req, res) {
        todoList.getAllKbliLastThree({req}).then(kbli => res.json(kbli)).catch(err => console.log(err)); 
    });
    app.post('/kblilastfour', passport.authenticate('jwt', { session: false }), async function(req, res) {
        todoList.getAllKbliLastFour({req}).then(kbli => res.json(kbli)).catch(err => console.log(err)); 
    });
    app.post('/kblilastfive', passport.authenticate('jwt', { session: false }), async function(req, res) {
        todoList.getAllKbliLastFive({req}).then(kbli => res.json(kbli)).catch(err => console.log(err)); 
    });
    app.get('/kbliByLevel/one', passport.authenticate('jwt', { session: false }), async function(req, res) {
          todoList.getAllKbliByLevel({ level_2 : 0 , level_3 : 0 , level_4 : 0 , level_5 : 0}).then(kbli => res.json(kbli)).catch(err => console.log(err)); 
    });
    app.post('/kbli/row', passport.authenticate('jwt', { session: false }), async function(req, res) {
          const { body } = req
          todoList.getAllKbliByLevel(body).then(kbli => res.json(kbli)).catch(err => console.log(err)); 
    });
    app.post('/kbliByLevel/custom', passport.authenticate('jwt', { session: false }), async function(req, res) {
      const { param , ...rest } = req.body
          todoList.getAllKbligte({ param, ...rest}).then(kbli => res.json(kbli)).catch(err => console.log(err)); 
    });
   
    app.delete('/kbli/', passport.authenticate('jwt', { session: false }), async function(req, res) {
         await todoList.deleteKbli(req.body.id).then(user => res.json(user)); 
    });

    app.delete('/user/', passport.authenticate('jwt', { session: false }), async function(req, res) {
         await todoList.deleteUser(req.body.id).then(user => res.json(user)); 
    });
    app.put('/user/', passport.authenticate('jwt', { session: false }), async function(req, res) {
         await todoList.updateUser({req}).then(user => res.json(user)); 
    });
    app.put('/password/', passport.authenticate('jwt', { session: false }), async function(req, res) {
         await todoList.updatePassword({req}).then(user => res.json(user)); 
    });
    app.route('/register')
      .post(todoList.register);

    app.get('/user', passport.authenticate('jwt', { session: false }), async function(req, res) {
        todoList.getAllUsers().then(user => res.json(user)); 
    });
    app.post('/getUser', passport.authenticate('jwt', { session: false }), async function(req, res) {
        const { email } = req.body;
        let user = await todoList.getUser({ email });
        res.json({ user });
    });

    app.post('/user/createtime', passport.authenticate('jwt', { session: false }), async function(req, res) {
        const { start, end } = req.body;
        let user = await todoList.getUserByDate({ start, end });
        res.json(user);
    });

    app.post('/login', async function(req, res, next) { 
      const { email, password } = req.body;

       try {
                if (email && password) {
                // we get the user with the name and save the resolved promise returned
                let user = await todoList.getUser({ email });
                if (!user) {
                  res.status(401).json({ msg: 'No such user found', user });
                }
               if (bcrypt.compareSync(req.body.password, user.password)) {
                  // from now on we'll identify the user by the id and the id is// the only personalized value that goes into our token
                  let payload = { id: user.id };
                  let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: "1d"
                  });
                  res.json({ email : user.email , token: token });
                } else {
                  res.status(401).json({ msg: 'Password is incorrect' });
                }
              }
          } catch (err) {
            next(err);
          }
    });


};

