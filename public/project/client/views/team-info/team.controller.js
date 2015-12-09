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

        $scope.navigateToNews = function () {
            console.log("navigating to Squad");
            $location.path('/teamnews/' + teamId);
        }

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

        $scope.increaseDislike = function () {
            if ($scope.user.email) {
                UserService.increaseDislike(teamId, $scope.user.email).then(function (team) {
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
                    console.log(commentCount);
                    $scope.commentSection = commentCount + " comments";
                    console.log($scope.commentSection);
                });
            }
            else {
                $scope.error = "Please login to like dislike teams.";
            }
        }
    };
})();

