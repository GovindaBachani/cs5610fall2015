"use strict";
(function () {
    angular.module("SoccerApp").controller("NewsDisplayController", NewsDisplayController);

    function NewsDisplayController($scope, APIService, $rootScope, $location, $http) {
        {
            console.log($rootScope);
            var url = $rootScope.newsObject.unescapedUrl;

            console.log(url);

            APIService.refineNews(url).then(function(data){
                console.log(data.images[0].url);
                console.log(data.title);
                $scope.imageUrl = data.images[1].url;
                $scope.title = data.title;
                console.log(data);
                $scope.text = data.text;
            });
            /*
            $scope.text = $rootScope.newsObject.text;*/
        }
    }
})();