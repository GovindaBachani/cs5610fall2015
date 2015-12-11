"use strict";
(function () {
    angular.module("SoccerApp").controller("TFixtureController", TFixtureController);

    function TFixtureController
    ($q, $scope, APIService, $routeParams, $location, UserService) {

        $scope.comments = [];
        if (window.stButtons) { stButtons.locateElements(); }
        var teamId = $routeParams.teamid;
        UserService.checkLoggedInUser().then(function (user) {
            $scope.user = user;
        });

        UserService.getAllTeamContent(teamId).then(function (team) {
            $scope.comments = team.comments;
            var commentCount = team.comments.length;
            $scope.commentSection = commentCount + " comments";
        });

        APIService.getTeamDetails(teamId).then(function (team) {
            $scope.teamname = team.name;
            document.title = team.name;
        });

        APIService.getTeamFixtures(teamId).then(function (data) {
            
            if (angular.isDefined(data)) {
                var fixtures = data.fixtures;
                var meaningFulFixtures = []
                for (var i = 0; i < fixtures.length; i++) {
                    if (fixtures[i].status === "TIMED") {
                        var dateTime = fixtures[i].date;
                        var res = dateTime.split("T");
                        var date = res[0];
                        var time = res[1];
                        var tempTime = time.split("Z");
                        var myTime = tempTime[0];
                        fixtures[i].myDate = date;
                        fixtures[i].myTime = myTime;
                        meaningFulFixtures.push(fixtures[i]);
                    }
                }
                var groupedDataByDate = [];
                var groupData = []
                for (var i = 0; i < meaningFulFixtures.length - 1; i++) {
                    if (meaningFulFixtures[i].myDate === "2016-05-15") {

                    }
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

        $scope.toUserPage = function (email) {
            $location.path('/user/' + email);
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

        $scope.navigateToResults = function () {
            $location.path('/teamResult/' + teamId);
        }

        $scope.navigateToSquad = function () {
            $location.path('/teamSquad/' + teamId);
        }
        $scope.navigateToNews = function () {
            $location.path('/teamnews/' + teamId);
        }

        $scope.addComment = function () {
            if ($scope.comment !== undefined || $scope.comment == "") {
                if ($scope.user == '0') {
                    $scope.error = 'Please login to Comment';
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

                    UserService.postComment(commentObj, teamId).then(function (team) {
                        $scope.comment = "";
                        $scope.comments = team.comments;
                        $scope.like = team.likes.length;
                        $scope.dislike = team.dislikes.length;
                        var commentCount = team.comments.length;
                        $scope.commentSection = commentCount + " comments";
                    });
                }
            }
        }

        $scope.deleteComment = function (commentId) {
            UserService.deleteComment(commentId, teamId).then(function (team) {
                $scope.comment = "";
                $scope.comments = team.comments;
                $scope.like = team.likes.length;
                $scope.dislike = team.dislikes.length;
                var commentCount = team.comments.length;
                $scope.commentSection = commentCount + " comments";
            });
        }
    
    };
})();

