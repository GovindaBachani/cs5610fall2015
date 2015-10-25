"use strict";
(function () {
    angular.module("FormBuilderApp").controller("RegisterController", RegisterController);
    function RegisterController($scope, UserService, $rootScope, $location){
        $scope.register = function(){
            var user = {
                userName : $scope.uName,
                password : $scope.pwd,
                email : $scope.email
            }
            var currentUser = UserService.createUser(user, function (currentUser) {
                if (angular.isDefined(currentUser)) {
                    $rootScope.loggedUser = currentUser;
                    $location.path("/profile");
                }
            });            
        }
    }
})();