"use strict";
(function () {
    angular.module("FormBuilderApp").controller("RegisterController", RegisterController);
    function RegisterController($scope, UserService, $rootScope, $location){
        $scope.register = function(){
            var user = {
                username : $scope.uName,
                password : $scope.pwd,
                email : $scope.email
            }
            var currentUser = UserService.createUser(user).then(function(currentUser){
                console.log(currentUser);
                if (angular.isDefined(currentUser)) {
                    $rootScope.loggedUser = currentUser;
                    $rootScope.$apply();
                    $location.path("/profile");
                }
            });            
        }
    }
})();