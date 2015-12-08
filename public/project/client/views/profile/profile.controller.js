"use strict";
(function () {
    angular.module("SoccerApp").controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope, $rootScope, $location, APIService) {
        document.title = 'Profile';
        var leaguesOption = [
            {
                name: 'Premier League',
                leagueId: 398
            },
            {
                name: 'BundesLiga',
                leagueId: 394
            },
            {
                name: 'La Liga',
                leagueId: 399
            },
            {
                name: 'Serie A',
                leagueId: 401
            },
            {
                name: 'Ligue 1',
                leagueId: 396
            },
            {
                name: 'Eredivisie',
                leagueId: 404
            }];
        console.log($rootScope);
        $scope.uName = $rootScope.loggedUser.username;
        $scope.email = $rootScope.loggedUser.email;
        $scope.pwd = $rootScope.loggedUser.password;
        $scope.fName = $rootScope.loggedUser.fullName;
        $scope.leaguesOption = leaguesOption;
        

        $scope.update = function () {
            var user = {
                fullName: $scope.fName,
                username: $scope.uName,
                email: $scope.email,
                password: $scope.pwd,
                id: $rootScope.loggedUser.id,
                league: $scope.league,
                team:  $scope.team
            }
            UserService.updateUser(user, function (currentUser) {
                user = currentUser;
                $rootScope.loggedUser = user;
            });

            $location.path("/home");
        }

        $scope.populate = function () {
            var leagueId = $scope.league.leagueId;
            console.log(leagueId);
            APIService.getAllTeams(leagueId).then(function (response) {
                $scope.teamsOption = response.teams;
            });
        }
    }
})();