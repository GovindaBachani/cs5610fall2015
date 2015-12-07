"use strict";
(function () {
    angular.module("SoccerApp")
           .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {
        $scope.$location = $location;
        UserService.checkLoggedInUser().then(function (user) {
            console.log(user);
            console.log(user == 0);
            $scope.user = user;
            if (user != 0) {
                $scope.fullName = user.fullName;
            }            
        });

        $scope.logout = function () {
            UserService.logout().then(function (user) {
                console.log(user == 200);
                console.log(user);
                if (user == 'OK') {
                    $location.path('/login');
                    location.reload();
                }
            });
        }
    }

    
})();