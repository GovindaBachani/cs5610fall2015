"use strict";
(function () {
    angular.module("SoccerApp").factory("APIService", APIService);

    function APIService($http) {
        var service = {
            getTableContent: getTableContent,
            getFixtureDetails : getFixtureDetails
        }

        function getFixtureDetails(leagueId, callback) {
            var uri = 'http://api.football-data.org/alpha/soccerseasons/' + leagueId + '/fixtures';
            console.log(uri);
            $.ajax({
                headers: { 'X-Auth-Token': '0918793d32054063ac52204e3d81735f' },
                url: uri,
                dataType: 'json',
                type: 'GET',
                success: returnJsonObject,
                async: false
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
                success: returnJsonObject,
                async : false
            })
            
            function returnJsonObject(data) {
                return callback(data);
            }
        }

        return service;
    }
})();