"use strict";
(function () {
    angular.module("SoccerApp").controller("AdminMessageController", AdminMessageController);

    function AdminMessageController($scope, UserService, $rootScope, $location) {
        document.title = 'Admin'
        UserService.getAllMessage().then(function (messages) {
            console.log(messages);
            $scope.messages = messages;
        });

        $scope.remove = function (messageId) {
            UserService.deleteMessage(messageId).then(function(response){
                UserService.getAllMessage().then(function (messages) {
                    console.log(messages);
                    $scope.messages = messages;
                });
            });
        };

        
    }
})();