"use strict";
(function () {
    angular.module("SoccerApp").controller("IndexController", IndexController);

    function IndexController($scope, APIService) {
        APIService.getLoggedInUser.then(function (user) {
            if (user != 0) {
                $scope.loggedInUser = user;
            }
            else {
                $scope.loggedInUser = 0;
            }
        });
    }
});