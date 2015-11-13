var express = require('express');
var app = express();
var uuid = require('uuid');

app.get('/', function (req, res) {
    res.send('hello world');
});

app.get('/getSomeJson', function (req, res) {
    res.send({ message: "hello World" });
});

app.get('/getUUID', function (req, res) {
    res.send(uuid.v4());
});

app.get('/user', function(req,res){
    res.send('hello world');
    var param = req.param("username");
    var param1 = req.param("password");
    console.log(param);
    console.log(param1);
});
app.listen(3000);