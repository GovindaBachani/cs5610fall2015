"use strict";
(function () {
    angular.module("FormBuilderApp").controller("LoginController", LoginController);

    function LoginController($scope, UserService, $rootScope, $location) {
        $scope.login = function () {
            var user = {
                userName: $scope.uName,
                password: $scope.pwd
            }
            var currentUser = UserService.
                findUserByUsernameAndPassword(user.userName, user.password, function (currentUser) {
                    if (angular.isDefined(currentUser)) {
                        $rootScope.loggedUser = currentUser;
                        $location.path("/profile");
                    }
                });
        }
    }
})();