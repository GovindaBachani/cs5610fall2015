"use strict";
(function () {
    angular.module("SoccerApp").controller("NewsController", NewsController);

    function NewsController($scope, APIService, $rootScope, $location, $http, NewsService) {
        {
            APIService.getRecentNews().then(function (data) {
                $scope.posts = data.responseData.results;
            });

            $scope.newsClick = function (index) {
                var news = $scope.posts[index];
                var hash = HashCode($scope.posts[index].unescapedUrl);
                var newsObj = {
                    "newsId": hash,
                    "content": news.content,
                    "imageUrl": news.image.url,
                    "titleNoFormatting": news.titleNoFormatting,
                    "unescapedUrl": news.unescapedUrl,
                    "comments": [],
                    "likes": [],
                    "dislikes": [],
                };

                NewsService.CreateNews(newsObj).then(function (savedNews) {
                    var url = '/news-display/' + savedNews.newsId;
                    $location.path(url);
                });
            }

            function HashCode(url) {
                var hash = 0, i, chr, len;
                if (url.length === 0) return hash;
                for (i = 0, len = url.length; i < len; i++) {
                    chr = url.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash |= 0; // Convert to 32bit integer
                }
                return hash;
            };
        }
    }
})();