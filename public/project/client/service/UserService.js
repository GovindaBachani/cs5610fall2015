"use strict";
(function () {
    angular.module("SoccerApp").factory("UserService", UserService);
    function UserService($http, $q) {


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
            var url = "/api/project/user?username=" + userName + "&password=" + password;
            $http.get(url).success(function (response) {
                console.log(response);
                defer.resolve(response);
            });
            return defer.promise;
        }

        function findAllUsers() {
            var defer = $q.defer();
            var url = '/api/project/user';
            $http.get(url).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }

        function createUser(user) {
            var defer = $q.defer();
            var url = '/api/project/user';
            console.log(url);
            $http.post(url, user).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }


        function deleteUserById(userId, callback) {
            var defer = $q.defer();
            var url = '/api/project/user/' + userid;
            $http.delete(url, user).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }

        function updateUser(user, userid) {
            var defer = $q.defer();
            var url = '/api/project/user/' + userid;
            console.log(url);
            $http.put(url, user).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }
    }
})();