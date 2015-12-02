/**
 * Created by Govinda on 12/1/2015.
 */
"use strict";
(function () {
    angular.module("SoccerApp").controller("TSquadController", TSquadController);

    function TSquadController
    ($scope, APIService, $routeParams,$location){
        var teamId = $routeParams.teamid;

        APIService.getTeamDetails(teamId).then(function (team) {
            console.log(team);
            $scope.teamname = team.name;
        });


        $scope.navigateToResults = function(){
            $location.path('/teamResult/' + teamId);
        }

        $scope.navigateToFixtures = function(){
            $location.path('/teamFixture/' + teamId);
        }

        $scope.navigateToTeam = function(){
            $location.path('/team/' + teamId);
        }
    };
})();
