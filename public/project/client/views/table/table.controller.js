"use strict";
(function () {
    angular.module("SoccerApp").controller("TableController", TableController);

    function TableController($q, $scope, $routeParams, APIService, $location) {
        var leagueId = $routeParams.leagueid;
        $scope.crestUrls = [];
        $scope.teams = [];
        var teamUrl = [];
        var teamIds = [];
        var crestUrl = [];

        var table = APIService.getTableContent(leagueId);
        table.then(function (response) {
            console.log(response);
            $scope.teams = response.standing;
            $scope.leagueName = response.leagueCaption;
            $scope.matchDay = 'MatchDay ' + response.matchday;
            document.title = response.leagueCaption;
            angular.forEach($scope.teams, function (team) {
                var teamInfo = getTeamCrest(team);
                teamInfo.then(function (res) {
                    team.crestUrl = res;
                    console.log(team);
                });
            })
        });

        

        $scope.toTeamPage = function (teamLink) {
            var teamId = APIService.getTeamId(teamLink);
            $location.path('/team/' + teamId);
        };

        function getTeamCrest(team) {
            var d = $q.defer();
            var teamId = APIService.getTeamId(team._links.team.href);
            APIService.getTeamCrest(teamId).then(function (teamCrest) {
                d.resolve(teamCrest);
                //console.log(teamInfo);
            });
            return d.promise;
        }
    }
})();