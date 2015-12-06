"use strict";
(function () {
    angular.module("SoccerApp").factory("APIService", APIService);

    function APIService($q, $http) {
        var service = {
            getTableContent: getTableContent,
            getFixtureDetails: getFixtureDetails,
            getRecentNews: getRecentNews,
            refineNews: refineNews,
            getTeamDetails: getTeamDetails,
            getTeamId: getTeamId,
            getLoggedInUser: getLoggedInUser,
            getAllTeams: getAllTeams
        }

        function getAllTeams(leagueId) {
            var defer = $q.defer();
            $http.get('/api/project/' + leagueId + '/teams').success(function (response) {
                console.log(response);
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getLoggedInUser() {
            var defer = $q.defer();
            $http.get('/api/project/loggedin').success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getFixtureDetails(leagueId) {
            var defer = $q.defer();
            $http.get('/api/project/fixtures/' + leagueId).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getTeamDetails(teamId) {
            var defer = $q.defer();
            $http.get('/api/project/team/' + teamId).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getTableContent(leagueId) {
            var defer = $q.defer();
            $http.get('/api/project/table/' + leagueId).success(function (response) {

                defer.resolve(response);
            });
            return defer.promise;
        }


        function getRecentNews() {
            var defer = $q.defer();
            $.ajax({
                url: 'https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=Manchester%20United',
                dataType: 'jsonp',
                success: function (data) {
                    defer.resolve(data);
                }
            });
            return defer.promise;
        }

        function refineNews(url) {
            var defer = $q.defer();
            var diffBot = new DiffBot("dca05365819414bb472b23e8b35f0e32");
            diffBot.analyze.get({
                url: url
            }, function (response) {
                console.log(response);
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getTeamId(teamLink) {
            teamLink = String(teamLink);
            var teamArr = teamLink.split('/');
            var len = teamArr.length;
            var teamId = teamArr[len - 1];
            return teamId;
        };

        return service;
    }
})();