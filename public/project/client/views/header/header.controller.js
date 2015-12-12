"use strict";
(function () {
    angular.module("SoccerApp")
           .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService, APIService) {
        $scope.$location = $location;


        UserService.checkLoggedInUser().then(function (user) {
            $scope.user = user;
            if (user != 0) {
                $scope.fullName = user.fullName;
            }
        });

        APIService.FindAllTeams().then(function (teams) {
            $scope.allTeams = teams;
            $scope.allTeamNames = getTeamName($scope.allTeams);

            var allTeams = $scope.allTeamNames;
            var substringMatcher = function (strs) {
                return function findMatches(q, cb) {
                    var matches, substrRegex;

                    // an array that will be populated with substring matches
                    matches = [];

                    // regex used to determine if a string contains the substring `q`
                    substrRegex = new RegExp(q, 'i');

                    // iterate through the pool of strings and for any string that
                    // contains the substring `q`, add it to the `matches` array
                    $.each(strs, function (i, str) {
                        if (substrRegex.test(str)) {
                            matches.push(str);
                        }
                    });

                    cb(matches);
                };
            };
            var myTypeAhead = $('#the-basics .typeahead').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            }, { name: 'teams', source: substringMatcher(allTeams) });

            myTypeAhead.on('typeahead:selected', function (evt, data) {
                $scope.teamName = data; //selected datum object
                $rootScope.teamName = data;
            });
        });



        function getTeamName(allTeams) {
            var allteamnames = [];
            for (var i = 0; i < allTeams.length; i++) {
                allteamnames.push(allTeams[i].teamName);
            }
            return allteamnames;
        }

        $scope.toTeamPage = function () {
            var teamId = getTeamId($rootScope.teamName);
            if (teamId) {
                $location.path('/team/' + teamId);
            }
        }
        function getTeamId(teamName) {
            for (var i = 0; i < $scope.allTeams.length; i++) {
                if ($scope.allTeams[i].teamName == teamName) {
                    return $scope.allTeams[i].teamId;
                }
            }
        };




        $scope.logout = function () {
            UserService.logout().then(function (user) {
                if (user == 'OK') {
                    
                    location.reload();
                }
            });
        }

        $scope.toProfile = function () {
            UserService.checkLoggedInUser().then(function (user) {
                $location.path("/user/" + user.email);
            });
        }
    }


})();