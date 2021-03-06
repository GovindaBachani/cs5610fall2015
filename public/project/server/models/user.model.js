"use strict";

var q = require('q');

var userSchemas = require('./user.schema.js');

module.exports = function (mongoose, db) {

    var schemaInstance = new userSchemas(mongoose);

    var userModel = mongoose.model('user', schemaInstance.getSchema());

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        FindUserByUsername: FindUserByUsername,
        FindUserByCredentials: FindUserByCredentials,
        FindUserByEmail: FindUserByEmail
    }

    return api;

    function Create(newUser) {
        var deferred = q.defer();
        newUser.followers = [];
        newUser.following = [];
        
        userModel.create(newUser, function (err, doc) {
            if (err) {
                console.log(err);
                deferred.resolve(err);
            }
            else {
                deferred.resolve(doc);
            }            
        });
        return deferred.promise;
    }

    function FindUserByCredentials(credentials) {
        var usr = credentials.username;
        var pwd = credentials.password;
        var deferred = q.defer();
        userModel.findOne({ username: usr, password: pwd }, function (err, user) {
            
            if (user) {
                deferred.resolve(user);
            }
            else {
                deferred.resolve(user);
            }
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function FindAll() {
        var deferred = q.defer();
        userModel.find({}, function (err, users) {
            deferred.resolve(users);
        });
        return deferred.promise;
    }

    function FindById(id) {
        var deferred = q.defer();
        userModel.findById(id, function (err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function Update(id, user) {
        var deferred = q.defer();
        userModel.findOne({username: user.username}, function (err, userUpdate) {
            userUpdate.username = user.username;
            userUpdate.fullName = user.fullName;
            userUpdate.email = user.email;
            userUpdate.password = user.password;
            userUpdate.league = user.league;
            userUpdate.team = user.team;
            userUpdate.save(function (err, doc) {
                deferred.resolve(doc);
            });
        });
        return deferred.promise;
    }

    function Delete(id) {
        var deferred = q.defer();

        userModel.remove({ _id: id }, function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function FindUserByUsername(username) {
        var deferred = q.defer();
        userModel.findOne({ username: username }, function (err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function FindUserByEmail(email) {
        var deferred = q.defer();
        userModel.findOne({ email: email }, function (err, user) {
            if (user) {
                user.password = "******"
            }            
            deferred.resolve(user);
        });
        return deferred.promise;
    }
};