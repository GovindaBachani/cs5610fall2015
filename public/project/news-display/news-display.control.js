"use strict";
(function () {
    angular.module("SoccerApp").controller("NewsDisplayController", NewsDisplayController);

    function NewsDisplayController($scope, APIService, $rootScope, $location, $http) {
        {           
            $scope.imageUrl = $rootScope.newsObject.thread.main_image;
            $scope.title = $rootScope.newsObject.thread.title;
            $scope.text = $rootScope.newsObject.text;
        }
    }
})();