"use strict";
(function () {
    angular.module("SoccerApp").controller("TResultController", TResultController);

    function TResultController
    ($scope, APIService, $routeParams,$location){
        var teamId = $routeParams.teamid;

        APIService.getTeamDetails(teamId).then(function (team) {
            console.log(team);
            $scope.teamname = team.name;
        });

        $scope.navigateToTeam = function(){
            $location.path('/team/' + teamId);
        }

        $scope.navigateToFixtures = function(){
            $location.path('/teamFixture/' + teamId);
        }

        $scope.navigateToSquad = function(){
            $location.path('/teamSquad/' + teamId);
        }
    };
})();

