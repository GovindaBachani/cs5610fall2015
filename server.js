var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/assn';
var mongoose = require("mongoose");
var db = mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

require('./public/assignment/server/app.js')(app,mongoose,db);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);