"use strict";
(function () {
    angular.module("SoccerApp").controller("TableController", TableController);

    function TableController($scope, $routeParams, APIService, $location) {
        var leagueId = $routeParams.leagueid;
        $scope.crestUrls = [];
        $scope.teams = [];
        console.log(leagueId);
        APIService.getTableContent(leagueId).then(function (table) {
            if (angular.isDefined(table)) {
                $scope.teams = table.standing;
                $scope.leagueName = table.leagueCaption;
            }
        });

        $scope.toTeamPage = function (teamLink) {
            var teamId = APIService.getTeamId(teamLink);
            $location.path('/team/' + teamId);
        };
    }
})();