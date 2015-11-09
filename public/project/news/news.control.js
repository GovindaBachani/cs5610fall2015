"use strict";
(function () {
    angular.module("SoccerApp").controller("NewsController", NewsController);

    function NewsController($scope, APIService, $rootScope, $location, $http) {
        {
            APIService.getRecentNews(function (data) {
                if (angular.isDefined(data)) {
                    $scope.posts = data.posts;
                    $scope.imgURL = "http://www.naturalhighsafaris.com/cdn/cache/made/cdn/uploads/country_images/India/North/Delhi/India-Gate--Delhi-Photos2_940_529_80_s_c1.jpg";
                    $scope.$apply();
                }
            });

            $scope.newsClick = function (index) {
                $location.path('/news-display');
                $rootScope.newsObject = $scope.posts[index];
            }
        }
    }
})();