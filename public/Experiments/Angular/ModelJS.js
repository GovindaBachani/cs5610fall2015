(function () {
    angular.module("ModelApp", []);
    angular.module("ModelApp").controller("ngModel", ngModel);
    function ngModel($scope) {
        console.log("Gadhe")
        $scope.lorem = "loremkndsx fnjned jfenj ednjkdn jfenj ifndkn ndnwn jn iwndkn iwdinwksam idwindw";
    }
})();