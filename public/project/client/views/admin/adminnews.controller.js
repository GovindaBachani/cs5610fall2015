"use strict";
(function () {
    angular.module("SoccerApp").controller("AdminNewsController", AdminNewsController);

    function AdminNewsController($scope, NewsService, $rootScope, $location) {
        document.title = 'Admin'
        NewsService.getAllNewsWithNonZeroComment().then(function (news) {
            $scope.news = news;
        });

        $scope.delete = function (news, comment) {
            NewsService.DeleteComment(comment._id, news.newsId).then(function (news) {
                NewsService.getAllNewsWithNonZeroComment().then(function (news) {
                    $scope.news = news;
                });
            });
        };
        $scope.toNewsPage = function (newsId) {
            console.log(newsId);
            $location.path('/news-display/' + newsId);
        }
    }
})();