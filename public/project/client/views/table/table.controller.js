"use strict";
(function () {
    angular.module("SoccerApp").controller("TableController", TableController);

    function TableController($scope, APIService, $rootScope, $location, $http) {
        {
            var param = $location.search();
            var leagueId = param["myVar"];
            APIService.getTableContent(leagueId, function (table) {
                if (angular.isDefined(table)) {
                    $scope.teams = table.standing;
                    $scope.leagueName = table.leagueCaption;
                    $scope.$apply();
                }
            });
        }
    }
})();