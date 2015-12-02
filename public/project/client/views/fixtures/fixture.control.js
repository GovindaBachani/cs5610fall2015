"use strict";
(function () {
    angular.module("SoccerApp").controller("FixtureController", FixtureController);

    function FixtureController($scope, APIService, $routeParams, $rootScope, $location, $http) {
        var leagueId = $routeParams.leagueid;
        APIService.getFixtureDetails(leagueId).then(function (data) {
            if (angular.isDefined(data)) {
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
                console.log(meaningFulFixtures);
                console.log(groupedDataByDate);
                $scope.groupedDataByDate = groupedDataByDate;
            }
        });

        $scope.toTeamPage = function(teamLink){
            console.log(teamLink);
            teamLink = String(teamLink);
            var teamArr = teamLink.split('/');
            console.log(teamArr);
            var len = teamArr.length;
            var teamId = teamArr[len-1];
            $location.path('/team/' + teamId);
        };
    }
})();