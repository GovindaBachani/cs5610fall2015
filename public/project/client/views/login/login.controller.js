"use strict";
(function () {
    angular.module("SoccerApp").controller("LoginController", LoginController);

    function LoginController($scope, UserService, $rootScope, $location) {
        document.title = 'Login';
        $scope.login = function (user) {

            UserService.login(user).then(function (currentUser) {
                if (currentUser != null) {
                    if (currentUser.status != 401) {
                        $rootScope.loggedUser = currentUser;
                        if ($rootScope.loggedUser.role == 'admin') {
                            $location.path("/adminuser");
                        }
                        else {
                            $rootScope.loggedUser = currentUser;
                            $location.path("/home");
                        }
                    }
                    else {
                        $scope.errorMessage = "*Invalid Credentials"
                    }
                }
            });
        }
    }
})();