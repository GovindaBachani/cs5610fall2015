"use strict";
(function () {
    angular.module("SoccerApp").factory("TableService", TableService);

    function TableService($http) {
        var service = {
            getTableContent: getTableContent
        }

        function getTableContent(leagueId, callback) {
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
                console.log(data);
                return callback(data);
            }
        }

        return service;
    }
})();