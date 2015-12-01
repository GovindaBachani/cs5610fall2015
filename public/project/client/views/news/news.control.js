"use strict";
(function () {
    angular.module("SoccerApp").controller("NewsController", NewsController);

    function NewsController($scope, APIService, $rootScope, $location, $http) {
        {
            console.log("lolu");
            APIService.getRecentNews().then(function(data) {
                $scope.posts = data.responseData.results;
                console.log($scope.posts);
            });

            $scope.newsClick = function (index) {
                $location.path('/news-display');
                $rootScope.newsObject = $scope.posts[index];
            }
        }
    }
})();