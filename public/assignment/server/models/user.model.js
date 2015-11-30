"use strict";

var q = require('q');

var userSchemas = require('./user.schema.js');

module.exports = function (mongoose, db, passport, localStrategy) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email,password,done) {
            UserModel.findOne({email: email}, function (err, user) {
                console.log('aunthenticating');
                if (err) {
                    console.log('error occured');
                    return done(null, false, {message: 'Unable to Login'});
                }
                else if (user == null || user == "") {
                    user = null
                    return done(null, user);
                }
                else {
                    console.log(user);
                    if (password == user.password) {
                        var user = {id: user._id, fname: user.fname, lname: user.lname, email: user.email};
                        return done(null, user);
                    }
                    else {
                        user = null
                        return done(null, user);
                    }
                }


            });
        }));

    var schemaInstance = new userSchemas(mongoose);

    var userModel = mongoose.model('cs5610.assignment.user', schemaInstance.getSchema());

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