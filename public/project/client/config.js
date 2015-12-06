"use strict";
(function () {
    angular.module("SoccerApp", ["ngRoute"]).config(function ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                resolve: {
                    loggedin: checkLoggedLoginPage
                }
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
            })
            .when("/contact", {
                templateUrl: "views/contact/contact.view.html",
                
            })
            .when("/about", {
                templateUrl: "views/about/about.view.html",
            })
            .when("/table/:leagueid", {
                templateUrl: "views/table/table.view.html",
                controller: "TableController"
            })
            .when("/news", {
                templateUrl: "views/news/news.view.html",
            })
            .when("/fixtures/:leagueid", {
                templateUrl: "views/fixtures/fixture.view.html",
            })
            .when("/result/:leagueid", {
                templateUrl: "views/result/result.view.html",
            })
            .when("/news-display", {
                templateUrl: "views/news-display/news-display.view.html",
            })
            .when("/adminuser", {
                templateUrl: "views/admin/adminuser.view.html",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/adminmessage", {
                templateUrl: "views/admin/adminmessage.view.html",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/admincomment", {
                templateUrl: "views/admin/admincomment.view.html",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/team/:teamid", {
                templateUrl: "views/team-info/team.view.html",
            })
            .when("/teamResult/:teamid", {
                templateUrl: "views/team-info/teamresult.view.html",
            })
            .when("/teamFixture/:teamid", {
                templateUrl: "views/team-info/teamfixture.view.html",
            })
            .when("/teamSquad/:teamid", {
                templateUrl: "views/team-info/teamsquad.view.html",
            })
            .otherwise({
                redirectTo: "/home"
            });
    });

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                if (user.role == 'admin') {
                    $rootScope.loggedUser = user;
                    deferred.resolve();
                }
                else {
                    deferred.reject();
                    $location.url('/login');
                }
            }
                
            else {
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    }

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        console.log("Config check logged user");

        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.loggedUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else {
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        console.log("Config check current user");
        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.loggedUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

    var checkLoggedLoginPage = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function (user) {
            // User is Authenticated
            if (user !== '0') {
                console.log("1bdsbj");
                $location.url('/home');
                deferred.reject();
            }
            else {
                deferred.resolve();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

})();