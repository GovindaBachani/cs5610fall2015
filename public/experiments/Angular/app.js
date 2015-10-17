(function () {
    angular.module("WhiteBoardApp",[]);
    angular.module("WhiteBoardApp").controller("HelloWorldController", HelloWorldController);

    function HelloWorldController($scope) {
        console.log("Hello World Angular!!!!");
        $scope.hello = "Hello World"
        $scope.cname = "Web Development"
    }
})();