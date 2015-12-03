"use strict";
(function () {
    angular.module("SoccerApp").controller("LoginController", LoginController);

    function LoginController($scope, UserService, $rootScope, $location) {
        $scope.login = function (user) {

            var currentUser = UserService.
                login(user).then(function (currentUser) {
                    console.log(currentUser);
                    if (currentUser != null) {
                        $rootScope.loggedUser = currentUser;
                        if ($rootScope.loggedUser.role == 'admin') {
                            $location.path("/admin");
                        }
                        else {
                            $location.path("/profile");
                        }
                    }
                });
        }
    }
})();