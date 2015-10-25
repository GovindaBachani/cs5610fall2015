"use strict";
(function () {
    angular.module("FormBuilderApp").factory("UserService", UserService);

    function UserService() {
        var users = [
            { id: 1, lastName: "Bachani", firstName: "Govinda", userName: "abcd", email: "goo@gmail.com", password: "abcd" }
        ];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            printToConsole  : printToConsole
        }

        return service;

        function printToConsole() {
            console.log(users);
        }

        function findUserByUsernameAndPassword(userName, password, callback) {
            for (var i = 0; i < users.length; i++) {
                if (userName == users[i].userName && password == users[i].password) {
                    var user = {
                        lastName: users[i].lastName,
                        firstName: users[i].firstName,
                        email: users[i].email,
                        password: users[i].password,
                        userName: users[i].userName,
                        id: users[i].id
                    }
                    return callback(user);
                }
            }
        }

        function findAllUsers(callback) {
            return callback(users);
        }

        function createUser(user, callback) {
            var guID = guid();
            user.id = guID;
            users.push(user);
            return callback(user);
        }



        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        function deleteUserById(userId, callback) {
            for (var i = 0; i < users.length; i++) {
                if (userId == users[i].id) {
                    var user = users[i];
                    delete users[i];
                    return callback(users);
                }
            }
        }

        function updateUser(userId, user, callback) {
            for (var i = 0; i < users.length; i++) {
                if (userId == users[i].id) {
                    users[i].lastName = user.lastName;
                    users[i].firstName = user.firstName;
                    users[i].email = user.email;
                    users[i].password = user.password;
                    users[i].userName = user.userName;
                    return callback(users[i]);
                }
            }
        }
    }
})();