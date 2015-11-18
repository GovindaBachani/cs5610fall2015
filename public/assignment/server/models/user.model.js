"use strict";

var mongoose = require("mongoose");

var uSchema = require("./user.schema.js");

console.log(uSchema);

var UserSchema = new mongoose.Schema({
    username : String,
    firstName  :  String,
    lastNAme  :  String,
    email  :  String,
    password : String
});

var userModel = mongoose.model('cs5610.assignment.user', UserSchema);

module.exports = function(app){
    var api = {
        Create : Create,
        FindAll : FindAll,
        FindById : FindById,
        Update : Update,
        Delete : Delete,
        FindUserByUsername : FindUserByUsername,
        FindUserByCredentials : FindUserByCredentials
    }

    return api;

    function Create(user){
        userModel.create(user, function(err, results){
            console.log(err);
            console.log(err === null && typeof err === "object");
            if(err === null && typeof err === "object"){
                console.log(results);
                return user;
            }
        });
    }

    function FindAll(){
        return users;
    }

    function FindById(id){
        console.log(id);
        for(var i = 0; i<users.length; i++){
            console.log(users[i].id);
            if(id == users[i].id){
                return users[i];
            }
        }
    }

    function Update(id, user){
        for(var i = 0; i<users.length; i++){
            if(id == users[i].id){
                users[i] = user;
                return users[i];
            }
        }
        return null;
    }

    function Delete(id){
        for(var i = 0; i<users.length; i++) {
            if (id == users[i].id) {
                users.splice(i, 1);
            }
        }
    }

    function FindUserByCredentials(credentials){
        var usr = credentials.username;
        var pwd = credentials.password;
        for(var i = 0; i<users.length; i++){
            if(usr === users[i].username && pwd === users[i].password){
                return users[i];
            }
        }
        return null;
    }

    function FindUserByUsername(username){
        for(var i = 0; i<users.length; i++){
            if(username == users[i].username){
                return users[i];
            }
        }
        return null;
    }
};