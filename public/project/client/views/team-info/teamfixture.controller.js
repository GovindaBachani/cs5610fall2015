"use strict";
(function () {
    angular.module("SoccerApp").controller("TFixtureController", TFixtureController);

    function TFixtureController
    ($scope, APIService, $routeParams,$location){

        var teamId = $routeParams.teamid;

        $scope.navigateToTeam = function(){
            $location.path('/team/' + teamId);
        }

        $scope.navigateToResults = function(){
            $location.path('/teamResult/' + teamId);
        }

        $scope.navigateToSquad = function(){
            $location.path('/teamSquad/' + teamId);
        }
    };
})();

