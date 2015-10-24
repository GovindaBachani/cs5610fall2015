"use strict";
(function () {
    angular.module("FormBuilderApp")
           .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location) {
        $scope.$location = $location;
        console.log("sidebar");
        console.log($scope.$location.$$path);
        console.log($location.url());
    }
})();