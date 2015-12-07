﻿"use strict";
(function () {
    angular.module("SoccerApp").controller("AdminUserController", AdminUserController);

    function AdminUserController($scope, UserService, $rootScope, $location) {
        UserService.findAllUsers().then(function (response) {
            console.log(response);

            $scope.users = response;
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].username == 'admin') {
                    $scope.users.splice(i, 1);
                }
            }
        });

        $scope.remove = function (id) {
            UserService.deleteUserById(id).then(function (response) {
                UserService.findAllUsers().then(function (response) {
                    console.log(response);

                    $scope.users = response;
                    for (var i = 0; i < $scope.users.length; i++) {
                        if ($scope.users[i].username == 'admin') {
                            $scope.users.splice(i, 1);
                        }
                    }
                });
            });
        }
    }
})();