"use strict";
(function () {
    angular.module("SoccerApp")
           .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }
})();