"use strict";
(function () {
    angular.module("SoccerApp").controller("TableController", TableController);

    function TableController($scope, TableService, $rootScope, $location, $http) {
        $scope.leagueName = "sbc";
        console.log("abcd");
        //$scope.render = function ()
        {
            var param = $location.search();
            var leagueId = param["myVar"];
            console.log(leagueId);
            TableService.getTableContent(leagueId, function (table) {
                if (angular.isDefined(table)) {
                    $scope.teams = table.standing;
                    console.log($scope.teams[0]);
                    $scope.leagueName = table.leagueCaption;
                    console.log($scope.leagueName);
                }
            });
        }
    }
})();