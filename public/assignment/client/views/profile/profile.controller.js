"use strict";
(function () {
    angular.module("FormBuilderApp").controller("ProfileController", ProfileController);
    
    function ProfileController(UserService, $scope, $rootScope) {
        $scope.uName = $rootScope.loggedUser.username;
        $scope.email = $rootScope.loggedUser.email;
        $scope.pwd = $rootScope.loggedUser.password;
        $scope.fName = $rootScope.loggedUser.firstName;
        $scope.lName = $rootScope.loggedUser.lastName;

        $scope.update = function () {
            var user= {
                lastName : $scope.lName,
                firstName : $scope.fName,
                username : $scope.uName,
                email : $scope.email,
                password : $scope.pwd,
                id: $rootScope.loggedUser.id
            }
            UserService.updateUser(user, user.id).then(function(currentUser) {
                console.log(currentUser);
                user = currentUser;
                $rootScope.loggedUser = user;
                console.log($rootScope.loggedUser);
            });
        }
    }
})();