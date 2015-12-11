"use strict";
(function () {
    angular.module("SoccerApp").controller("TeamController", TeamController);

    function TeamController
    ($scope, APIService, $routeParams, $location, UserService) {
        $scope.comments = [];
        if (window.stButtons) { stButtons.locateElements(); }
        var teamId = $routeParams.teamid;
        APIService.getTeamDetails(teamId).then(function (team) {
            $scope.team = team;
            document.title = team.name;
            
        });

        UserService.checkLoggedInUser().then(function (user) {
            $scope.user = user;
        });

        UserService.getAllTeamContent(teamId).then(function (team) {
            if (team) {
                $scope.comments = team.comments;
                var commentCount = team.comments.length;
                $scope.commentSection = commentCount + " comments";
                $scope.like = team.likes.length;
                $scope.dislike = team.dislikes.length;
            }
            else {
                $scope.commentSection = 0 + " comments";
                $scope.like = 0;
                $scope.dislike = 0;
            }
        });

        $scope.navigateToResults = function () {
            $location.path('/teamResult/' + teamId);
        }

        $scope.navigateToFixtures = function () {
            $location.path('/teamFixture/' + teamId);
        }

        $scope.navigateToSquad = function () {
            $location.path('/teamSquad/' + teamId);
        }

        $scope.navigateToNews = function () {
            $location.path('/teamnews/' + teamId);
        }

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

                    UserService.postComment(commentObj, teamId).then(function (team) {
                        $scope.comment = "";
                        $scope.comments = team.comments;
                        $scope.like = team.likes.length;
                        $scope.dislike = team.dislikes.length;
                        var commentCount = team.comments.length;
                        $scope.commentSection = commentCount + " comments";
                    });
                }
            }
        }

        $scope.deleteComment = function (commentId) {
            UserService.deleteComment(commentId, teamId).then(function (team) {
                $scope.comment = "";
                $scope.comments = team.comments;
                $scope.like = team.likes.length;
                $scope.dislike = team.dislikes.length;
                var commentCount = team.comments.length;
                $scope.commentSection = commentCount + " comments";
            });
        }

        $scope.increaseDislike = function () {
            if ($scope.user.email) {
                UserService.increaseDislike(teamId, $scope.user.email).then(function (team) {
                    $scope.comment = "";
                    $scope.comments = team.comments;
                    $scope.like = team.likes.length;
                    $scope.dislike = team.dislikes.length;
                    var commentCount = team.comments.length;
                    $scope.commentSection = commentCount + " comments";
                });
            }
            else {
                $scope.error = "Please login to like dislike teams.";
            }
            
        }

        $scope.increaseLike = function () {
            if ($scope.user.email) {
                UserService.increaseLike(teamId, $scope.user.email).then(function (team) {
                    $scope.comment = "";
                    $scope.comments = team.comments;
                    $scope.like = team.likes.length;
                    $scope.dislike = team.dislikes.length;
                    var commentCount = team.comments.length;
                    $scope.commentSection = commentCount + " comments";
                });
            }
            else {
                $scope.error = "Please login to like dislike teams.";
            }
        }

        $scope.toUserPage = function (email) {
            $location.path('/user/' + email);
        };
    };
})();

