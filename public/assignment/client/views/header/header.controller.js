﻿"use strict";
(function () {
    angular.module("FormBuilderApp")
           .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope) {
        $scope.$location = $location;
        $scope.logout = function logout(){
            $rootScope.loggedUser = null;
            console.log($rootScope.loggedUser);
            $location.path("/login");
        }
    }
})();