"use strict";
(function () {
    angular.module("FormBuilderApp").factory("UserService", UserService);

    function UserService() {
        var users = [];
        
        var service = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        }

        return service;

        function findUserByUsernameAndPassword() {

        }

        function findAllUsers() {

        }

        function createUser(user) {
            console.log("create user service");
            guid();
            console.log(guid);
                var newUser = {

                }
        }



            function guid() {
                console.log("guid");
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }

        function deleteUserById() {

        }

        function updateUser() {

        }
    }
})();