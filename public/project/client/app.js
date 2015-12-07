var app = angular.module("SoccerApp", ["ngRoute", "ngSanitize"]);

app.filter('reverse', function () {
    return function (items) {
        return items.slice().reverse();
    };
});