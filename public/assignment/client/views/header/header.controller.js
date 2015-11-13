"use strict";
(function () {
    angular.module("FormBuilderApp")
           .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location,$rootScope) {
        $scope.$location = $location;
    }

    function logout(){
        $rootScope.loggedUser = null;
        $location.path("/login");
    }
})();