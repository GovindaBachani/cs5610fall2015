"use strict";
(function () {
    angular.module("SoccerApp").controller("TeamNewsController", TeamNewsController);

    function TeamNewsController
    ($scope, APIService, $routeParams, $location, UserService) {
        $scope.comments = [];
        if (window.stButtons) { stButtons.locateElements(); }
        var teamId = $routeParams.teamid;
        APIService.getTeamDetails(teamId).then(function (team) {
            $scope.team = team;
            document.title = team.name;
        });

        UserService.checkLoggedInUser().then(function (user) {
            $scope.user = user;
        });


        $scope.navigateToResults = function () {
            console.log("navigating to Result");
            $location.path('/teamResult/' + teamId);
        }

        $scope.navigateToFixtures = function () {
            console.log("navigating to Fixtures");
            $location.path('/teamFixture/' + teamId);
        }

        $scope.navigateToSquad = function () {
            console.log("navigating to Squad");
            $location.path('/teamSquad/' + teamId);
        }
        $scope.navigateToTeam = function () {
            console.log("navigating to Squad");
            $location.path('/team/' + teamId);
        }
    }
})();