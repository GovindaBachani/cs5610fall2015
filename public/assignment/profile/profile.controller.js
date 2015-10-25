"use strict";
(function () {
    angular.module("FormBuilderApp").controller("ProfileController", ProfileController);
    
    function ProfileController(UserService, $scope, $rootScope, $location) {
        $scope.uName = $rootScope.loggedUser.userName;
        $scope.email = $rootScope.loggedUser.email;
        $scope.pwd = $rootScope.loggedUser.password;

        $scope.update = function () {
            var user= {
                lastName : $scope.lName,
                firstName : $scope.fName,
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