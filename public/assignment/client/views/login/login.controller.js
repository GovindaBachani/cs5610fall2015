"use strict";
(function () {
    angular.module("FormBuilderApp").controller("LoginController", LoginController);

    function LoginController($scope, UserService, $rootScope, $location) {
        $scope.login = function () {
            var user = {
                userName: $scope.uName,
                password: $scope.pwd
            };
            UserService.
                findUserByUsernameAndPassword(user.userName, user.password).then(function(currentUser){
                    console.log(currentUser);
                    if(currentUser != null) {
                        $rootScope.loggedUser = currentUser;
                        $location.path("/profile");
                    }
                });
        }
    }
})();