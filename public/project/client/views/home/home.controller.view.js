"use strict";
(function () {
    angular.module("SoccerApp").controller("HomeController", HomeController);

    function HomeController($q, $scope, NewsService, UserService, APIService, $routeParams, $rootScope, $location, $http) {
        document.title = 'Home';
        UserService.checkLoggedInUser().then(function (user) {
            if (user == 0) {
                APIService.getRecentNews("Manchester United").then(function (data) {

                    $scope.slides = data;
                    var table = APIService.getTableContent(398);
                    table.then(function (response) {
                        $scope.teams = response.standing;
                        $scope.leagueName = response.leagueCaption + "!!";
                        $scope.matchDay = 'MatchDay ' + response.matchday;

                        angular.forEach($scope.teams, function (team) {
                            var teamInfo = getTeamCrest(team._links.team.href);
                            teamInfo.then(function (res) {
                                team.crestUrl = res;
                            });
                        })
                    });
                    APIService.getTeamFixtures(66).then(function (data) {
                        var fixtures = data.fixtures;
                        var j = 0, k = 0;
                        for (var i = 1; i < fixtures.length; i++) {
                            if (fixtures[i].status == "TIMED") {
                                j = i - 1;
                                k = i;
                                break;
                            }
                        }
                        var nextFixture = fixtures[k];
                        var previousResult = fixtures[j];
                        var result = previousResult.result;
                        var hGoal = result.goalsHomeTeam;
                        var aGoal = result.goalsAwayTeam;
                        $scope.res = hGoal + "-" + aGoal;
                        $scope.vs = 'vs';
                        var rdateTime = previousResult.date;
                        var rres = rdateTime.split("T");
                        var rdate = rres[0];
                        var rtime = rres[1];
                        var rtempTime = rtime.split("Z");
                        var rmyTime = rtempTime[0];
                        $scope.rmyTime = rmyTime;
                        $scope.rDate = rdate;
                        var fdateTime = nextFixture.date;
                        var fres = fdateTime.split("T");
                        var fdate = fres[0];
                        var ftime = fres[1];
                        var ftempTime = ftime.split("Z");
                        var fmyTime = ftempTime[0];
                        $scope.fmyTime = fmyTime;
                        $scope.fDate = fdate;
                        getTeamCrest(previousResult._links.homeTeam.href).then(function (data) {
                            $scope.resultHomeCrest = data;
                        });
                        getTeamCrest(previousResult._links.awayTeam.href).then(function (data) {
                            $scope.resultAwayCrest = data;
                        });
                        getTeamCrest(nextFixture._links.homeTeam.href).then(function (data) {
                            $scope.fixtureHomeCrest = data;
                        });
                        getTeamCrest(nextFixture._links.awayTeam.href).then(function (data) {
                            $scope.fixtureAwayCrest = data;
                        });
                    });
                });
            }
            else {
                if (user.team) {
                    APIService.getRecentNews(user.team.name).then(function (data) {
                        $scope.slides = data;
                        var table = APIService.getTableContent(user.league.leagueId);
                        table.then(function (response) {
                            $scope.teams = response.standing;
                            $scope.leagueName = response.leagueCaption + "!!";
                            $scope.matchDay = 'MatchDay ' + response.matchday;
                            angular.forEach($scope.teams, function (team) {
                                var teamInfo = getTeamCrest(team._links.team.href);
                                teamInfo.then(function (res) {
                                    team.crestUrl = res;
                                });
                            })
                        });
                        var teamId = APIService.getTeamId(user.team._links.self.href);
                        APIService.getTeamFixtures(teamId).then(function (data) {
                            var fixtures = data.fixtures;
                            var j = 0, k = 0;
                            for (var i = 1; i < fixtures.length; i++) {
                                if (fixtures[i].status == "TIMED") {
                                    j = i - 1;
                                    k = i;
                                    break;
                                }
                            }
                            var nextFixture = fixtures[k];
                            var previousResult = fixtures[j];
                            var result = previousResult.result;
                            var hGoal = result.goalsHomeTeam;
                            var aGoal = result.goalsAwayTeam;
                            $scope.res = hGoal + "-" + aGoal;
                            $scope.vs = 'vs';
                            var rdateTime = previousResult.date;
                            var rres = rdateTime.split("T");
                            var rdate = rres[0];
                            var rtime = rres[1];
                            var rtempTime = rtime.split("Z");
                            var rmyTime = rtempTime[0];
                            $scope.rmyTime = rmyTime;
                            $scope.rDate = rdate;
                            var fdateTime = nextFixture.date;
                            var fres = fdateTime.split("T");
                            var fdate = fres[0];
                            var ftime = fres[1];
                            var ftempTime = ftime.split("Z");
                            var fmyTime = ftempTime[0];
                            $scope.fmyTime = fmyTime;
                            $scope.fDate = fdate;
                            getTeamCrest(previousResult._links.homeTeam.href).then(function (data) {
                                $scope.resultHomeCrest = data;
                            });
                            getTeamCrest(previousResult._links.awayTeam.href).then(function (data) {
                                $scope.resultAwayCrest = data;
                            });
                            getTeamCrest(nextFixture._links.homeTeam.href).then(function (data) {
                                $scope.fixtureHomeCrest = data;
                            });
                            getTeamCrest(nextFixture._links.awayTeam.href).then(function (data) {
                                $scope.fixtureAwayCrest = data;
                            });
                        });
                    });
                }
                else {
                    APIService.getRecentNews("Manchester United").then(function (data) {
                        $scope.slides = data;
                        var table = APIService.getTableContent(398);
                        table.then(function (response) {
                            $scope.teams = response.standing;
                            $scope.leagueName = response.leagueCaption + "!!";
                            $scope.matchDay = 'MatchDay ' + response.matchday;
                            angular.forEach($scope.teams, function (team) {
                                var teamInfo = getTeamCrest(team._links.team.href);
                                teamInfo.then(function (res) {
                                    team.crestUrl = res;
                                });
                            })
                        });
                        APIService.getTeamFixtures(66).then(function (data) {
                            var fixtures = data.fixtures;
                            var j = 0, k = 0;
                            for (var i = 1; i < fixtures.length; i++) {
                                if (fixtures[i].status == "TIMED") {
                                    j = i - 1;
                                    k = i;
                                    break;
                                }
                            }
                            var nextFixture = fixtures[k];
                            var previousResult = fixtures[j];
                            var result = previousResult.result;
                            var hGoal = result.goalsHomeTeam;
                            var aGoal = result.goalsAwayTeam;
                            $scope.res = hGoal + "-" + aGoal;
                            $scope.vs = 'vs';
                            var rdateTime = previousResult.date;
                            var rres = rdateTime.split("T");
                            var rdate = rres[0];
                            var rtime = rres[1];
                            var rtempTime = rtime.split("Z");
                            var rmyTime = rtempTime[0];
                            $scope.rmyTime = rmyTime;
                            $scope.rDate = rdate;
                            var fdateTime = nextFixture.date;
                            var fres = fdateTime.split("T");
                            var fdate = fres[0];
                            var ftime = fres[1];
                            var ftempTime = ftime.split("Z");
                            var fmyTime = ftempTime[0];
                            $scope.fmyTime = fmyTime;
                            $scope.fDate = fdate;
                            getTeamCrest(previousResult._links.homeTeam.href).then(function (data) {
                                $scope.resultHomeCrest = data;
                            });
                            getTeamCrest(previousResult._links.awayTeam.href).then(function (data) {
                                $scope.resultAwayCrest = data;
                            });
                            getTeamCrest(nextFixture._links.homeTeam.href).then(function (data) {
                                $scope.fixtureHomeCrest = data;
                            });
                            getTeamCrest(nextFixture._links.awayTeam.href).then(function (data) {
                                $scope.fixtureAwayCrest = data;
                            });
                        });
                    });
                }
            }
        });


        $scope.newsClick = function (news) {
            var hash = HashCode(news.unescapedUrl);
            var newsObj = {
                "newsId": hash,
                "content": news.content,
                "imageUrl": news.image.url,
                "titleNoFormatting": news.titleNoFormatting,
                "unescapedUrl": news.unescapedUrl,
                "comments": [],
                "likes": [],
                "dislikes": [],
            };

            NewsService.CreateNews(newsObj).then(function (savedNews) {
                var url = '/news-display/' + savedNews.newsId;
                $location.path(url);
            });
        }

        function HashCode(url) {
            var hash = 0, i, chr, len;
            if (url.length === 0) return hash;
            for (i = 0, len = url.length; i < len; i++) {
                chr = url.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        };

        function getTeamCrest(teamLink) {

            var d = $q.defer();
            var teamId = APIService.getTeamId(teamLink);
            APIService.getTeamCrest(teamId).then(function (teamCrest) {
                d.resolve(teamCrest);
            });
            return d.promise;
        }

        $scope.toTeamPage = function (teamLink) {
            var teamId = APIService.getTeamId(teamLink);
            $location.path('/team/' + teamId);
        };

        $scope.toTeamPageI = function (teamId) {
            $location.path('/team/' + teamId);
        };
    }
})();