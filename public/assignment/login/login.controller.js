"use strict";
(function () {
    angular.module("FormBuilderApp").controller("LoginController", LoginController);

    function LoginController($scope, UserService) {
        $scope.login = function ($scope,UserService) {
            console.log("login hit");
        }
    }
})();