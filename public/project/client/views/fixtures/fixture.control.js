﻿"use strict";
(function () {
    angular.module("SoccerApp").controller("FixtureController", FixtureController);

    function FixtureController($q, $scope, APIService, $routeParams, $rootScope, $location, $http) {
        var leagueId = $routeParams.leagueid;
        APIService.getFixtureDetails(leagueId).then(function (data) {
            if (angular.isDefined(data)) {
                var soccerSeasonUrl = data._links[1].soccerseason;
               APIService.getLeagueDetails(soccerSeasonUrl).then(function (response) {
                    $scope.leagueName = response.caption;
                    document.title = response.caption;
                });
                var fixtures = data.fixtures;
                var meaningFulFixtures = []
                for (var i = 0; i < fixtures.length; i++) {
                    if (fixtures[i].status === "TIMED") {
                        var dateTime = fixtures[i].date;
                        var res = dateTime.split("T");
                        var date = res[0];
                        var time = res[1];
                        var tempTime = time.split("Z");
                        var myTime = tempTime[0];
                        fixtures[i].myDate = date;
                        fixtures[i].myTime = myTime;
                        meaningFulFixtures.push(fixtures[i]);
                    }
                }
                var groupedDataByDate = [];
                var groupData = []
                for (var i = 0; i < meaningFulFixtures.length - 1; i++) {
                    if (meaningFulFixtures[i].myDate === "2016-05-15") {

                    }
                    if (meaningFulFixtures[i].myDate === meaningFulFixtures[i + 1].myDate) {
                        groupData.push(meaningFulFixtures[i]);
                        continue;
                    }
                    else {
                        groupData.push(meaningFulFixtures[i]);
                        var element = {
                        };
                        element.date = meaningFulFixtures[i].myDate;
                        element.dataArray = groupData;
                        groupedDataByDate.push(element);
                        groupData = [];
                    }
                }
                groupData.push(meaningFulFixtures[meaningFulFixtures.length - 1]);
                var element = {
                };
                element.date = meaningFulFixtures[meaningFulFixtures.length - 1].myDate;
                element.dataArray = groupData;
                groupedDataByDate.push(element);
                $scope.groupedDataByDate = groupedDataByDate;
                angular.forEach($scope.groupedDataByDate, function (date) {
                    angular.forEach(date.dataArray, function (fixture) {
                        var awayTeam = fixture._links.awayTeam;
                        var homeTeam = fixture._links.homeTeam;
                        var awayCrest = getTeamCrest(awayTeam);
                        var homeCrest = getTeamCrest(homeTeam);
                        awayCrest.then(function (res) {
                            fixture.awayCrestUrl = res.crestUrl;
                        });
                        homeCrest.then(function (res) {
                            fixture.homeCrestUrl = res.crestUrl;
                        });
                    });
                });
            }
        });

        $scope.toTeamPage = function(teamLink){
            teamLink = String(teamLink);
            var teamArr = teamLink.split('/');
            var len = teamArr.length;
            var teamId = teamArr[len-1];
            $location.path('/team/' + teamId);
        };

        function getTeamCrest(team) {
            var d = $q.defer();
            var teamId = APIService.getTeamId(team.href);
            APIService.getTeamCrest(teamId).then(function (teamCrest) {
                d.resolve(teamCrest);
            });
            return d.promise;
        }
    }
})();