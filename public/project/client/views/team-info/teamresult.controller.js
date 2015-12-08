"use strict";
(function () {
    angular.module("SoccerApp").controller("TResultController", TResultController);

    function TResultController
    ($q, $scope, APIService, $routeParams, $location, UserService) {
        var teamId = $routeParams.teamid;

        
        APIService.getTeamDetails(teamId).then(function (team) {
            console.log(team);
            $scope.teamname = team.name;
            document.title = team.name;
        });

        APIService.getTeamFixtures(teamId).then(function (data) {

            

            UserService.checkLoggedInUser().then(function (user) {
                $scope.user = user;
            });

            UserService.getAllTeamContent(teamId).then(function (team) {
                console.log(team);
                $scope.comments = team.comments;
                var commentCount = team.comments.length;
                console.log(commentCount);
                $scope.commentSection = commentCount + " comments";
                console.log($scope.commentSection);
            });

            //var a = getTeamCrest(teamId)
            //console.log(a);

            //    .then(function (teamCrest) {
            //    console.log(teamCrest);
            //    $scope.teamname = teamCrest.teamName;
            //});
            if (angular.isDefined(data)) {
                var fixtures = data.fixtures;
                var meaningFulFixtures = []
                for (var i = 0; i < fixtures.length; i++) {
                    if (fixtures[i].status === "FINISHED") {
                        var dateTime = fixtures[i].date;
                        var res = dateTime.split("T");
                        var date = res[0];
                        var time = res[1];
                        var tempTime = time.split("Z");
                        var myTime = tempTime[0];
                        fixtures[i].myDate = date;
                        fixtures[i].myTime = myTime;
                        var result = fixtures[i].result;
                        var hGoal = result.goalsHomeTeam;
                        var aGoal = result.goalsAwayTeam;
                        var res = hGoal + "-" + aGoal;
                        fixtures[i].res = res;
                        meaningFulFixtures.push(fixtures[i]);
                    }
                }
                var groupedDataByDate = [];
                var groupData = []
                for (var i = 0; i < meaningFulFixtures.length - 1; i++) {
                    if (meaningFulFixtures[i].myDate === meaningFulFixtures[i + 1].myDate) {
                        groupData.push(meaningFulFixtures[i]);
                        continue;
                    }
                    else {
                        groupData.push(meaningFulFixtures[i]);
                        var element = {
                        };
                        element.date = meaningFulFixtures[i].myDate;
                        element.dataArray = groupData;
                        groupedDataByDate.push(element);
                        groupData = [];
                    }
                }
                groupData.push(meaningFulFixtures[meaningFulFixtures.length - 1]);
                var element = {
                };
                element.date = meaningFulFixtures[meaningFulFixtures.length - 1].myDate;
                element.dataArray = groupData;
                groupedDataByDate.push(element);
                $scope.groupedDataByDate = groupedDataByDate;
                $scope.groupedDataByDate.reverse();
                angular.forEach($scope.groupedDataByDate, function (date) {
                    angular.forEach(date.dataArray, function (fixture) {
                        var awayTeam = fixture._links.awayTeam;
                        var homeTeam = fixture._links.homeTeam;
                        var awayCrest = getTeamCrest(awayTeam);
                        var homeCrest = getTeamCrest(homeTeam);
                        awayCrest.then(function (res) {
                            if (res == null) {
                                fixture.awayCrestUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png';
                            }
                            else {
                                fixture.awayCrestUrl = res.crestUrl;
                            }
                        });
                        homeCrest.then(function (res) {
                            if (res == null) {
                                fixture.homeCrestUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png';
                            }
                            else {
                                fixture.homeCrestUrl = res.crestUrl;
                            }
                        });
                    });
                });
            }
        });

        $scope.toTeamPage = function (teamLink) {
            teamLink = String(teamLink);
            var teamArr = teamLink.split('/');
            var len = teamArr.length;
            var teamId = teamArr[len - 1];
            $location.path('/team/' + teamId);
        };

        function getTeamCrest(team) {
            var d = $q.defer();
            var teamId = APIService.getTeamId(team.href);
            APIService.getTeamCrest(teamId).then(function (teamCrest) {
                    d.resolve(teamCrest);
            });
            return d.promise;
        }



        $scope.navigateToTeam = function () {
            $location.path('/team/' + teamId);
        }

        $scope.navigateToFixtures = function () {
            $location.path('/teamFixture/' + teamId);
        }

        $scope.navigateToSquad = function () {
            $location.path('/teamSquad/' + teamId);
        }

        $scope.addComment = function () {
            console.log($scope.comment);
            if ($scope.comment !== undefined || $scope.comment == "") {
                if ($scope.user == '0') {
                    $scope.error = 'Please login to Comment';
                    console.log("abcd");
                }
                else {
                    var d = new Date();
                    var dt = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
                    var commentObj = {
                        username: $scope.user.fullName,
                        date: dt,
                        commentText: $scope.comment,
                        email: $scope.user.email
                    }

                    UserService.postComment(commentObj, teamId).then(function (comments) {
                        $scope.comment = "";
                        $scope.comments = comments;
                        var commentCount = comments.length;
                        console.log(commentCount);
                        $scope.commentSection = commentCount + " comments";
                        console.log($scope.commentSection);
                    });
                }
            }
        }

        $scope.deleteComment = function (commentId) {
            console.log(commentId);
            UserService.deleteComment(commentId, teamId).then(function (comments) {
                $scope.comment = "";
                $scope.comments = comments;
                var commentCount = comments.length;
                console.log(commentCount);
                $scope.commentSection = commentCount + " comments";
                console.log($scope.commentSection);
            });
        }

    };
})();

