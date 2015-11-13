"use strict";

var users = require("./user.mock.json");

var uid = require("uuid");

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
        user.id = uid.v4();
        console.log(user);
        users.push(user);
        return user;
    }

    function FindAll(){
        console.log("2");
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