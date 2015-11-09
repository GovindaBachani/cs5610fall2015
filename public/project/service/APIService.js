"use strict";
(function () {
    angular.module("SoccerApp").factory("APIService", APIService);

    function APIService($http) {
        var service = {
            getTableContent: getTableContent,
            getFixtureDetails: getFixtureDetails,
            getRecentNews: getRecentNews
        }

        function getFixtureDetails(leagueId, callback) {
            var uri = 'http://api.football-data.org/alpha/soccerseasons/' + leagueId + '/fixtures';
            $.ajax({
                headers: { 'X-Auth-Token': '0918793d32054063ac52204e3d81735f' },
                url: uri,
                dataType: 'json',
                type: 'GET',
                success: returnJsonObject
            })

            function returnJsonObject(data) {
                return callback(data);
            }
        }
        
        function getTableContent(leagueId, callback) {
            var uri = 'http://api.football-data.org/alpha/soccerseasons/' + leagueId + '/leagueTable';
            console.log(uri);
            $.ajax({
                headers: { 'X-Auth-Token': '0918793d32054063ac52204e3d81735f' },
                url: uri,
                dataType: 'json',
                type: 'GET',
                success: returnJsonObject
            })
            
            function returnJsonObject(data) {
                return callback(data);
            }
        }

        function getRecentNews(callback) {
            var uri = 'https://webhose.io/search?token=e0fa214c-ad96-4b77-9229-b2ee6337fbb5&format=json&q=Premier%20League&language=english&site=bleacherreport.com&ts=1446941136186';
            $.ajax({
                //headers: { 'X-Auth-Token': '0918793d32054063ac52204e3d81735f' },
                url: uri,
                dataType: 'json',
                type: 'GET',
                success: returnJsonObject
            })

            function returnJsonObject(data) {
                return callback(data);
            }
        }

        return service;
    }
})();