
(function () {
    "use strict";
    angular.module("SoccerApp").controller("NewsDisplayController", NewsDisplayController);

    function NewsDisplayController($scope, APIService,$sce, $routeParams, $location, $http, NewsService, UserService) {
        {
            var newsId = $routeParams.newsId;
            NewsService.GetNews(newsId).then(function (news) {
                document.title = news.titleNoFormatting;
                $scope.imageurl = news.imageUrl;
                $scope.content = $sce.trustAsHtml(news.content);
                $scope.titleNoFormatting = news.titleNoFormatting;
                $scope.unescapedUrl = news.unescapedUrl;
                $scope.like = news.likes.length;
                $scope.dislike = news.dislikes.length;
                $scope.comments = news.comments;
                var commentCount = news.comments.length;
                console.log(commentCount);
                $scope.commentSection = commentCount + " comments";
            });

            UserService.checkLoggedInUser().then(function (user) {
                $scope.user = user;
            });


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
                        console.log(commentObj);
                        console.log(newsId);

                        NewsService.postComment(commentObj, newsId).then(function (news) {
                            $scope.comment = "";
                            $scope.imageurl = news.imageUrl;
                            $scope.content = news.content;
                            $scope.titleNoFormatting = news.titleNoFormatting;
                            $scope.unescapedUrl = news.unescapedUrl;
                            $scope.like = news.likes.length;
                            $scope.dislike = news.dislikes.length;
                            $scope.comments = news.comments;
                            var commentCount = news.comments.length;
                            console.log(commentCount);
                            $scope.commentSection = commentCount + " comments";
                            console.log($scope.news);
                        });
                    }
                }
            }

            $scope.deleteComment = function (commentId) {
                console.log(commentId);
                NewsService.DeleteComment(commentId, newsId).then(function (news) {
                    $scope.imageurl = news.imageUrl;
                    $scope.content = news.content;
                    $scope.titleNoFormatting = news.titleNoFormatting;
                    $scope.unescapedUrl = news.unescapedUrl;
                    $scope.like = news.likes.length;
                    $scope.dislike = news.dislikes.length;
                    $scope.comments = news.comments;
                    var commentCount = news.comments.length;
                    console.log(commentCount);
                    $scope.commentSection = commentCount + " comments";
                    console.log($scope.news);
                });
            }

            $scope.increaseDislike = function () {
                if ($scope.user.email) {
                    NewsService.increaseDislike(newsId, $scope.user.email).then(function (news) {
                        console.log(news);
                        
                        $scope.imageurl = news.imageUrl;
                        $scope.content = news.content;
                        $scope.titleNoFormatting = news.titleNoFormatting;
                        $scope.unescapedUrl = news.unescapedUrl;
                        $scope.like = news.likes.length;
                        $scope.dislike = news.dislikes.length;
                        $scope.comments = news.comments;
                        var commentCount = news.comments.length;
                        console.log(commentCount);
                        $scope.commentSection = commentCount + " comments";
                        console.log($scope.news);
                    });
                }
                else {
                    $scope.error = "Please login to like dislike teams.";
                }

            }

            $scope.increaseLike = function () {
                if ($scope.user.email) {
                    NewsService.increaseLike(newsId, $scope.user.email).then(function (news) {
                        $scope.imageurl = news.imageUrl;
                        $scope.content = news.content;
                        $scope.titleNoFormatting = news.titleNoFormatting;
                        $scope.unescapedUrl = news.unescapedUrl;
                        $scope.like = news.likes.length;
                        $scope.dislike = news.dislikes.length;
                        $scope.comments = news.comments;
                        var commentCount = news.comments.length;
                        console.log(commentCount);
                        $scope.commentSection = commentCount + " comments";
                        console.log($scope.news);
                    });
                }
                else {
                    $scope.error = "Please login to like dislike teams.";
                }
            }
        }
    }
})();