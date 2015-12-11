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
        });
        UserService.getAllTeamContent(teamId).then(function (team) {
            if (team) {
                console.log(team);
                $scope.comments = team.comments;
                var commentCount = team.comments.length;
                console.log(commentCount);
                $scope.commentSection = commentCount + " comments";
                $scope.like = team.likes.length;
                $scope.dislike = team.dislikes.length;
            }
            else {
                console.log(team);
                $scope.commentSection = 0 + " comments";
                $scope.like = 0;
                $scope.dislike = 0;
            }

            console.log($scope.commentSection);
        });


        $scope.newsClick = function (news) {
            console.log(news);
            var hash = HashCode(news.unescapedUrl);
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

        $scope.toUserPage = function (email) {
            $location.path('/user/' + email);
        };

        $scope.addComment = function () {
            console.log($scope.comment);
            if ($scope.comment !== undefined || $scope.comment == "") {
                if ($scope.user == '0') {
                    $scope.error = 'Please login to Comment';
                    console.log("abcd");
                }
                else {
                    var d = new Date();
                    var dt = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
                    var commentObj = {
                        username: $scope.user.fullName,
                        date: dt,
                        commentText: $scope.comment,
                        email: $scope.user.email
                    }

                    UserService.postComment(commentObj, teamId).then(function (team) {
                        $scope.comment = "";
                        $scope.comments = team.comments;
                        $scope.like = team.likes.length;
                        $scope.dislike = team.dislikes.length;
                        var commentCount = team.comments.length;
                        console.log(commentCount);
                        $scope.commentSection = commentCount + " comments";
                        console.log($scope.commentSection);
                    });
                }
            }
        }

        $scope.deleteComment = function (commentId) {
            console.log(commentId);
            UserService.deleteComment(commentId, teamId).then(function (team) {
                $scope.comment = "";
                $scope.comments = team.comments;
                $scope.like = team.likes.length;
                $scope.dislike = team.dislikes.length;
                var commentCount = team.comments.length;
                console.log(commentCount);
                $scope.commentSection = commentCount + " comments";
                console.log($scope.commentSection);
            });
        }
    }
})();