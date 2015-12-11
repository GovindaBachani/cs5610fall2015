"use strict";
(function () {
    angular.module("SoccerApp").controller("RegisterController", RegisterController);
    function RegisterController($scope, UserService, $rootScope, $location) {
        document.title = 'Register';

        $scope.register = function () {
            if ($scope.repPwd != $scope.pwd) {
                $scope.errorMessage = "Passwords should Match";
                console.log($scope.errorMessage); 
            }
            else {
                var user = {
                    username: $scope.uName,
                    password: $scope.pwd,
                    email: $scope.email,
                    fullName: $scope.fname
                }
                var currentUser = UserService.createUser(user).then(function (currentUser) {
                    UserService.login(currentUser).then(function (loggedUser) {
                        $rootScope.loggedUser = currentUser;
                        $location.path("/profile");
                    });
                });
            }
        }
    }
})();