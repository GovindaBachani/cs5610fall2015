"use strict";
(function () {
    angular.module("SoccerApp").config(function ($routeProvider) {
        $routeProvider
                .when("/home", {
                templateUrl: "home/home.view.html",
                })
                .when("/login", {
                templateUrl: "login/login.view.html",
                })
                .when("/register", {
                    templateUrl: "register/register.view.html",
                })
                .when("/contact", {
                    templateUrl: "contact/contact.view.html",
                })
                .when("/about", {
                    templateUrl: "about/about.view.html",
                })
                .when("/table", {
                    templateUrl: "table/table.view.html",
                    controller: "TableController"
                })
                .when("/news", {
                templateUrl: "news/news.view.html",
                })
                .when("/fixture", {
                    templateUrl: "fixture/fixture.view.html",
                })
                .otherwise({
                    redirectTo: "/home"
                });
    });
})();