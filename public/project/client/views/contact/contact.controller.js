"use strict";
(function () {
    angular.module("SoccerApp").controller("ContactController", ContactController);

    function ContactController(UserService, $scope, $rootScope, $location) {
        

        $scope.sendMessage = function () {
            var message = {
                emailId: $scope.emailId,
                message: $scope.message
            }
            console.log(message);
            UserService.sendMessage(message).then(function (message) {
                $scope.emailId = "";
                $scope.message = "";
                $scope.success = "Message Sent!!"
            });
        }
    }
})();