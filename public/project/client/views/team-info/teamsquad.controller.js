/**
 * Created by Govinda on 12/1/2015.
 */
"use strict";
(function () {
    angular.module("SoccerApp").controller("TSquadController", TSquadController);

    function TSquadController
    ($scope, APIService, $routeParams,$location){
        var teamId = $routeParams.teamid;


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
