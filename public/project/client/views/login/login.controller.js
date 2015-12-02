"use strict";
(function () {
    angular.module("SoccerApp").controller("LoginController", LoginController);

    function LoginController($scope, UserService, $rootScope, $location) {
        $scope.login = function () {
            var user = {
                userName: $scope.uName,
                password: $scope.pwd
            }
            var currentUser = UserService.
                findUserByUsernameAndPassword(user.userName, user.password).then(function (currentUser) {
                    if(currentUser != null) {
                        $rootScope.loggedUser = currentUser;
                        if($rootScope.loggedUser.role == 'admin'){
                            $location.path("/admin");
                        }
                        else{
                            $location.path("/profile");
                        }
                    }
                });
        }
    }
})();