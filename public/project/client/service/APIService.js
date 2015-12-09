﻿"use strict";
(function () {
    angular.module("SoccerApp").factory("APIService", APIService);

    function APIService($q, $http, NewsService) {
        var service = {
            getTableContent: getTableContent,
            getFixtureDetails: getFixtureDetails,
            getRecentNews: getRecentNews,
            getTeamDetails: getTeamDetails,
            getTeamId: getTeamId,
            getLoggedInUser: getLoggedInUser,
            getAllTeams: getAllTeams,
            getTeamCrest: getTeamCrest,
            getLeagueDetails: getLeagueDetails,
            getTeamFixtures: getTeamFixture,
            getFirstTeam: getFirstTeam,
            FindAllTeams: FindAllTeams
        }

        function FindAllTeams() {
            var defer = $q.defer();
            $http.get('/api/project/teams').success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getFirstTeam(teamId) {
            var defer = $q.defer();
            $http.get('/api/project/teamPlayers/' + teamId).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getTeamFixture(teamId) {
            var defer = $q.defer();
            $http.get('/api/project/teamFix/' + teamId).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getTeamCrest(teamId) {
            var defer = $q.defer();
            $http.get('/api/project/' + teamId).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getAllTeams(leagueId) {
            var defer = $q.defer();
            $http.get('/api/project/' + leagueId + '/teams').success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getLeagueDetails(leagueUrl) {
            var defer = $q.defer();
            var leagueId = getTeamId(leagueUrl);
            $http.get('/api/project/league/' + leagueId).success(function (response) {
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