"use strict";
(function () {
    angular.module("FormBuilderApp").config(function ($routeProvider) {
        $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                })
                .when("/login", {
                    templateUrl: "views/login/login.view.html",
                })
                .when("/form", {
                    templateUrl: "views/form/form.view.html",
                })
                .when("/profile", {
                    templateUrl: "views/profile/profile.view.html",
                })
                .when("/register", {
                    templateUrl: "views/register/register.view.html",
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                })
                .when("/form-fields", {
                    templateUrl: "views/form-fields/form-fields.view.html",
                })
                .otherwise({
                    redirectTo: "/home"
                });
    });
})();