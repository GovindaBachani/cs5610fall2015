"use strict";
(function () {
    angular.module("SoccerApp").controller("LoginController", LoginController);

    function LoginController($scope, UserService, $rootScope, $location) {
        $scope.login = function (user) {

            UserService.login(user).then(function (currentUser) {
                console.log(currentUser);
                if (currentUser != null) {
                    
                    $rootScope.loggedUser = currentUser;
                    if ($rootScope.loggedUser.role == 'admin') {
                        $location.path("/adminuser");
                    }
                    else {
                        $rootScope.loggedUser = currentUser;
                        $location.path("/home");
                    }
                }
            });
        }
    }
})();