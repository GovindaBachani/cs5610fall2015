"use strict";
(function () {
    angular.module("SoccerApp").controller("LoginController", LoginController);

    function LoginController($scope, UserService, $rootScope, $location) {
        $scope.login = function (user) {

            UserService.login(user).then(function (currentUser) {
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

        $scope.facebookLogin = function () {
            //var openUrl = 'login/facebook';
            //href = "/auth/facebook"
            //window.$windowScope = $scope;
            //window.open(openUrl, "Authenticate Account", "width=500, height=500")
            UserService.facebookLogin().then(function (currentUser) {
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