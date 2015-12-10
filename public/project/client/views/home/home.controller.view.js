"use strict";
(function () {
    angular.module("SoccerApp").controller("HomeController", HomeController);

    function HomeController($q, $scope, NewsService, UserService, APIService, $routeParams, $rootScope, $location, $http) {
        document.title = 'Home';
        UserService.checkLoggedInUser().then(function (user) {
            console.log(user);
            if (user == 0) {
                console.log("not Logged In");
                APIService.getRecentNews("Manchester United").then(function (data) {
                    
                    $scope.slides = data;
                    var table = APIService.getTableContent(398);
                    table.then(function (response) {
                        console.log(response);
                        $scope.teams = response.standing;
                        $scope.leagueName = response.leagueCaption + "!!";
                        $scope.matchDay = 'MatchDay ' + response.matchday;
                        
                        angular.forEach($scope.teams, function (team) {
                            var teamInfo = getTeamCrest(team);
                            teamInfo.then(function (res) {
                                team.crestUrl = res;
                                console.log(team);
                            });
                        })
                    });
                });
            }
            else {
                if (user.team) {
                    console.log("logged in team Present");
                    console.log(user.team.name);
                    APIService.getRecentNews(user.team.name).then(function (data) {
                        $scope.slides = data;
                        var table = APIService.getTableContent(user.league.leagueId);
                        table.then(function (response) {
                            console.log(response);
                            $scope.teams = response.standing;
                            $scope.leagueName = response.leagueCaption + "!!";
                            $scope.matchDay = 'MatchDay ' + response.matchday;
                            document.title = response.leagueCaption;
                            angular.forEach($scope.teams, function (team) {
                                var teamInfo = getTeamCrest(team);
                                teamInfo.then(function (res) {
                                    team.crestUrl = res;
                                    console.log(team);
                                });
                            })
                        });
                    });
                }
                else {
                    console.log("logged in team Not Present");
                    APIService.getRecentNews("Manchester United").then(function (data) {
                        $scope.slides = data;
                        var table = APIService.getTableContent(398);
                        table.then(function (response) {
                            console.log(response);
                            $scope.teams = response.standing;
                            $scope.leagueName = response.leagueCaption + "!!";
                            $scope.matchDay = 'MatchDay ' + response.matchday;
                            document.title = response.leagueCaption;
                            angular.forEach($scope.teams, function (team) {
                                var teamInfo = getTeamCrest(team);
                                teamInfo.then(function (res) {
                                    team.crestUrl = res;
                                    console.log(team);
                                });
                            })
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
                console.log(url);
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

        $scope.toTeamPage = function (teamLink) {
            var teamId = APIService.getTeamId(teamLink);
            $location.path('/team/' + teamId);
        };

        function getTeamCrest(team) {
            var d = $q.defer();
            var teamId = APIService.getTeamId(team._links.team.href);
            APIService.getTeamCrest(teamId).then(function (teamCrest) {
                d.resolve(teamCrest);
                //console.log(teamInfo);
            });
            return d.promise;
        }

        
    }
})();