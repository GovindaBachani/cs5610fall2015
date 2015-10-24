"use strict";
(function () {
    angular.module("FormBuilderApp").controller("RegisterController", RegisterController);
    function RegisterController($scope, UserService){
        $scope.register = function(){
            var user = {
                userName : $scope.uName,
                password : $scope.pwd,
                email : $scope.email
            }
            console.log(user);
            UserService.createUser(user);
        }
    }
})();


