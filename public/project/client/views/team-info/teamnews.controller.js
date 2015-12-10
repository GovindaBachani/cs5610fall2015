"use strict";
(function () {
    angular.module("SoccerApp").controller("TeamNewsController", TeamNewsController);

    function TeamNewsController
    ($scope, APIService, $routeParams, $location, UserService, NewsService) {
        $scope.comments = [];
        if (window.stButtons) { stButtons.locateElements(); }
        var teamId = $routeParams.teamid;
        APIService.getTeamDetails(teamId).then(function (team) {
            $scope.team = team;
            document.title = team.name;
            console.log(team.name);
            APIService.getRecentNews($scope.team.name).then(function (data) {
                $scope.posts = data;
                console.log($scope.posts);
            });
        });

        UserService.checkLoggedInUser().then(function (user) {
            $scope.user = user;
            console.log($scope.user);
        });
        console.log($scope.team);
        

        $scope.newsClick = function (index) {
            var news = $scope.posts[index];
            var str = news.titleNoFormatting;
            str = str.replace(/[^\w\s]/gi, '');
            var hash = HashCode($scope.posts[index].unescapedUrl);
            var newsObj = {
                "newsId": hash,
                "content": news.content,
                "imageUrl": news.image.url,
                "titleNoFormatting": str,
                "unescapedUrl": news.unescapedUrl,
                "comments": [],
                "likes": [],
                "dislikes": [],
            };

            NewsService.CreateNews(newsObj).then(function (savedNews) {
                var url = '/news-display/' + savedNews.newsId;
                console.log(url);
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


        $scope.navigateToResults = function () {
            console.log("navigating to Result");
            $location.path('/teamResult/' + teamId);
        }

        $scope.navigateToFixtures = function () {
            console.log("navigating to Fixtures");
            $location.path('/teamFixture/' + teamId);
        }

        $scope.navigateToSquad = function () {
            console.log("navigating to Squad");
            $location.path('/teamSquad/' + teamId);
        }
        $scope.navigateToTeam = function () {
            console.log("navigating to Squad");
            $location.path('/team/' + teamId);
        }
    }
})();