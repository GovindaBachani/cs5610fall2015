"use strict";
(function () {
    angular.module("SoccerApp").config(function ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
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
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
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
})();