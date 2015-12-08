"use strict";
(function () {
    angular.module("SoccerApp").controller("ContactController", ContactController);

    function ContactController(UserService, $scope, $rootScope, $location) {
        document.title = 'Contact Me'

        $scope.sendMessage = function () {
            console.log($scope.emailId + " " + $scope.message);
            var message = {
                emailId: $scope.emailId,
                message: $scope.message
            }
            console.log(message);
            UserService.sendMessage(message).then(function (message) {
                $scope.emailId = undefined;
                $scope.message = undefined;
                $scope.messageError = "";
                $scope.emailError = "";
                $scope.success = "Message Sent!!"
            });
        }
    }
})();