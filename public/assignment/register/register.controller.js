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
            console.log(user);
            UserService.createUser(user);
            if(user != undefined){
                $rootScope.loggedUser = user;
                console.log($location);
                $location.path("/profile");
                console.log($location)
            }
        }
    }
})();


