var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var connectionStringAssignment = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/cs5610';
var mongoose = require("mongoose");
var multer = require('multer');
var db = mongoose.connect(connectionStringAssignment);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var logout = require('express-passport-logout');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(expressSession({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

require('./public/assignment/server/app.js')(app, mongoose, db, passport, LocalStrategy);
require('./public/project/server/app.js')(app, mongoose, db, passport, LocalStrategy);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);