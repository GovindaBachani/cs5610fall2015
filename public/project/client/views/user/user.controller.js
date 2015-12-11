"use strict";
(function () {
    angular.module("SoccerApp").controller("UserController", UserController);

    function UserController
    ($scope, $routeParams, $location, UserService) {
        var email = $routeParams.email;
        UserService.getUserByEmail(email).then(function (user) {
            console.log(user);
            $scope.user = user;
        });

        UserService.checkLoggedInUser().then(function (user) {
            $scope.loggedInUser = user;
            console.log(user);
        });

        $scope.update = function () {
            $location.path("/profile");
        };

        $scope.displayAlert = function () {
            $("#overlay-for-contacts2").fadeIn("slow");
        };

        $scope.remove = function (id) {
            console.log(id);
            UserService.deleteUserById(id).then(function (response) {
                $location.path("/login");
            })
        }
    }
})();