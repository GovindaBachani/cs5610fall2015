var express = require('express');
var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

require('./public/assignment/server/app.js')(app);
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);

