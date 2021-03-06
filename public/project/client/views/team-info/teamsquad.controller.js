/**
 * Created by Govinda on 12/1/2015.
 */
"use strict";
(function () {
    angular.module("SoccerApp").controller("TSquadController", TSquadController);

    function TSquadController
    ($scope, APIService, $routeParams, $location, UserService) {
        var teamId = $routeParams.teamid;
        UserService.checkLoggedInUser().then(function (user) {
            $scope.user = user;
        });

        UserService.getAllTeamContent(teamId).then(function (team) {
            $scope.comments = team.comments;
            var commentCount = team.comments.length;
            $scope.commentSection = commentCount + " comments";
        });

        APIService.getTeamDetails(teamId).then(function (team) {
            $scope.teamname = team.name;
            document.title = team.name;
        });

        APIService.getFirstTeam(teamId).then(function (squad) {
            $scope.players = squad.players;
        });


        $scope.navigateToResults = function(){
            $location.path('/teamResult/' + teamId);
        }

        $scope.navigateToFixtures = function(){
            $location.path('/teamFixture/' + teamId);
        }

        $scope.navigateToTeam = function(){
            $location.path('/team/' + teamId);
        }

        $scope.navigateToNews = function () {
            $location.path('/teamnews/' + teamId);
        }

        $scope.toUserPage = function (email) {
            $location.path('/user/' + email);
        };

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

    };
})();
