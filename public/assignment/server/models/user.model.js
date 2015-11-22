"use strict";

var q = require('q');

module.exports = function (mongoose,db) {
    var mongoose = require('mongoose');

    var UserSchema = new mongoose.Schema({
        "firstName": String,
        "lastName": String,
        "username": String,
        "password": String,
        "email": String
    });

    var userModel = mongoose.model('cs5610.assignment.user', UserSchema);

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        FindUserByUsername: FindUserByUsername,
        FindUserByCredentials: FindUserByCredentials
    }

    return api;

    function Create(user) {
        var deferred = q.defer();

        userModel.create(user, function (err, doc) {
            userModel.findById(doc._id, function (err, user) {
                deferred.resolve(user);
            });
        });
        return deferred.promise;
    }

    function FindUserByCredentials(credentials) {
        var usr = credentials.username;
        var pwd = credentials.password;
        var deferred = q.defer();
        userModel.findOne({ username: usr, password: pwd }, function (err, user) {
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
        userModel.findById(id, function (err, userUpdate) {
            userUpdate.lastName = user.lastName;
            userUpdate.firstName = user.firstName;
            userUpdate.email = user.email;
            userUpdate.password = user.password;
            userUpdate.username = user.username;
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
};