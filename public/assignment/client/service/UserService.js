"use strict";
(function () {
    angular.module("FormBuilderApp").factory("UserService", UserService);
    function UserService($http,$q) {


        var users = [
            { id: 1, lastName: "Bachani", firstName: "Govinda", userName: "abcd", email: "goo@gmail.com", password: "abcd" }
        ];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        }

        return service;

        function findUserByUsernameAndPassword(userName, password) {
            var defer = $q.defer();
            var url = "/api/assignment/user?username=" + userName + "&password=" + password;
            console.log(url);
            $http.get(url).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }

        function findAllUsers() {
            var defer = $q.defer();
            var url = '/api/assignment/user';
            $http.get(uri).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }

        function createUser(user){
            var defer = $q.defer();
            var url = '/api/assignment/user';
            $http.post(url,user).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }


        function deleteUserById(userId, callback) {
            var defer = $q.defer();
            var url = '/api/assignment/user/'+ userid;
            $http.delete(url,user).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }

        function updateUser(user, userid) {
            var defer = $q.defer();
            var url = '/api/assignment/user/'+ userid;
            console.log(url);
            $http.put(url,user).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }
    }
})();