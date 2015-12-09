var app = angular.module("SoccerApp", ["ngRoute", "ngSanitize", "ui.bootstrap"]);

app.filter('reverse', function () {
    return function (items) {
        return items.slice().reverse();
    };
});