"use strict";
(function () {
    angular.module("SoccerApp").controller("TableController", TableController);

    function TableController($scope, $routeParams, APIService, $location) {
        {
            var leagueId = $routeParams.leagueid;
            console.log(leagueId);
            APIService.getTableContent(leagueId).then(function (table) {
                if (angular.isDefined(table)) {
                    $scope.teams = table.standing;
                    $scope.leagueName = table.leagueCaption;
                }
            });
        }

        $scope.toTeamPage = function(teamLink){
            teamLink = String(teamLink);
            var teamArr = teamLink.split('/');
            console.log(teamArr);
            var len = teamArr.length;
            var teamId = teamArr[len-1];
            $location.path('/team/' + teamId);
        };
    }
})();