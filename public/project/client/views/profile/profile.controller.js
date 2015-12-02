"use strict";
(function () {
    angular.module("SoccerApp").controller("ProfileController", ProfileController);
    
    function ProfileController(UserService, $scope, $rootScope, $location) {
        $scope.uName = $rootScope.loggedUser.username;
        $scope.email = $rootScope.loggedUser.email;
        $scope.pwd = $rootScope.loggedUser.password;
        $scope.fName = $rootScope.loggedUser.fullName;

        $scope.update = function () {
            var user= {
                fullName : $scope.fName,
                userName : $scope.uName,
                email : $scope.email,
                password : $scope.pwd,
                id: $rootScope.loggedUser.id
            }
            UserService.updateUser(user, function (currentUser) {
                user = currentUser;
                $rootScope.loggedUser = user;
            });
        }
    }
})();