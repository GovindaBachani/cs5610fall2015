"use strict";
(function () {
    angular.module("SoccerApp").controller("TFixtureController", TFixtureController);

    function TFixtureController
    ($scope, APIService, $routeParams,$location){

        var teamId = $routeParams.teamid;

        APIService.getTeamDetails(teamId).then(function (team) {
            console.log(team);
            $scope.teamname = team.name;
        });

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

