var express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    controller = require('./controller');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Learn Node JS With Kiddy, RESTful API server started on: ' + port);