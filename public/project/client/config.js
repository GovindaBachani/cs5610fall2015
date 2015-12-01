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
                .when("/table", {
                    templateUrl: "views/table/table.view.html",
                    controller: "TableController"
                })
                .when("/news", {
                templateUrl: "views/news/news.view.html",
                })
                .when("/fixtures", {
                    templateUrl: "views/fixtures/fixture.view.html",
                })
                .when("/result", {
                    templateUrl: "views/result/result.view.html",
                })
                .when("/news-display", {
                    templateUrl: "views/news-display/news-display.view.html",
                })
                //})
                //.when("/news-display/:title/:content", {
                //    templateUrl: "news-display/news-display.view.html",
                //})
                .otherwise({
                    redirectTo: "views//home"
                });
    });
})();