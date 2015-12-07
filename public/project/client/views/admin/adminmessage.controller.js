"use strict";
(function () {
    angular.module("SoccerApp").controller("AdminMessageController", AdminMessageController);

    function AdminMessageController($scope, UserService, $rootScope, $location) {
        UserService.getAllMessage().then(function (messages) {
            $scope.messages = messages;
        });

        $scope.remove = function (messageId) {
            UserService.deleteMessage(messageId).then(function(response){
                UserService.getAllMessage().then(function (messages) {
                    $scope.messages = messages;
                });
            });
        };

        
    }
})();