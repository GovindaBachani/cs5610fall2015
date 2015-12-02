"use strict";
(function () {
    angular.module("SoccerApp").controller("TeamController", TeamController);

    function TeamController
    ($scope, APIService, $routeParams,$location){
        var teamId = $routeParams.teamid;
        APIService.getTeamDetails(teamId).then(function(team){
            console.log(team);
            $scope.team = team;
        });

        $scope.navigateToResults = function(){
            console.log("navigating to Result");
            $location.path('/teamResult/' + teamId);
        }

        $scope.navigateToFixtures = function(){
            console.log("navigating to Fixtures");
            $location.path('/teamFixture/' + teamId);
        }

        $scope.navigateToSquad = function(){
            console.log("navigating to Squad");
            $location.path('/teamSquad/' + teamId);
        }
    };
})();

