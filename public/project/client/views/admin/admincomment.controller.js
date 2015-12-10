"use strict";
(function () {
    angular.module("SoccerApp").controller("AdminCommentController", AdminCommentController);

    function AdminCommentController($scope, UserService, $rootScope, $location) {
        document.title = 'Admin'
        UserService.getAllTeamsWithNonZeroComment().then(function (teams) {
            $scope.teams = teams;
        });

        $scope.delete = function (team, comment) {
            UserService.deleteComment(comment._id, team.teamId).then(function (team) {
                UserService.getAllTeamsWithNonZeroComment().then(function (teams) {
                    $scope.teams = teams;
                });
            });
        };
        $scope.toTeamPage = function (teamId) {
            $location.path('/team/' + teamId);
        }
    }
})();