
(function () {
    "use strict";
    angular.module("SoccerApp").controller("NewsDisplayController", NewsDisplayController);

    function NewsDisplayController($scope, APIService, $sce, $routeParams, $location, $http, NewsService, UserService) {
        {
            if (window.stButtons) {
                stButtons.locateElements();
            }
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
                $scope.commentSection = commentCount + " comments";
                stWidget.addEntry({
                    "service": "sharethis",
                    "element": document.getElementById('button_1'),
                    "url": "http://sharethis.com",
                    "title": "sharethis",
                    "type": "large",
                    "text": "ShareThis",
                    "image": "http://www.softicons.com/download/internet-icons/social-superheros-icons-by-iconshock/png/256/sharethis_hulk.png",
                    "summary": "this is description1"
                });
            });

            UserService.checkLoggedInUser().then(function (user) {
                $scope.user = user;
            });


            $scope.addComment = function () {
                if ($scope.comment !== undefined || $scope.comment == "") {
                    if ($scope.user == '0') {
                        $scope.error = 'Please login to Comment';
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
                            $scope.commentSection = commentCount + " comments";
                        });
                    }
                }
            }

            $scope.deleteComment = function (commentId) {
                NewsService.DeleteComment(commentId, newsId).then(function (news) {
                    $scope.imageurl = news.imageUrl;
                    $scope.content = news.content;
                    $scope.titleNoFormatting = news.titleNoFormatting;
                    $scope.unescapedUrl = news.unescapedUrl;
                    $scope.like = news.likes.length;
                    $scope.dislike = news.dislikes.length;
                    $scope.comments = news.comments;
                    var commentCount = news.comments.length;
                    $scope.commentSection = commentCount + " comments";
                });
            }

            $scope.toUserPage = function (email) {
                $location.path('/user/' + email);
            };

            $scope.increaseDislike = function () {
                if ($scope.user.email) {
                    NewsService.increaseDislike(newsId, $scope.user.email).then(function (news) {
                        $scope.imageurl = news.imageUrl;
                        $scope.content = news.content;
                        $scope.titleNoFormatting = news.titleNoFormatting;
                        $scope.unescapedUrl = news.unescapedUrl;
                        $scope.like = news.likes.length;
                        $scope.dislike = news.dislikes.length;
                        $scope.comments = news.comments;
                        var commentCount = news.comments.length;
                        $scope.commentSection = commentCount + " comments";
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
                        $scope.commentSection = commentCount + " comments";
                    });
                }
                else {
                    $scope.error = "Please login to like dislike teams.";
                }
            }
        }
    }
})();