(function () {
    angular.module("ClickApp", []);
    angular.module("ClickApp").controller("NgClickController", NgClickController);
    function NgClickController($scope) {
        console.log("Hello Sir");
        $scope.setLorem = function () {
            $scope.lorem = "Lorem Ipsum Para nfdnikn ndwkn ndwkn newkn  kwnkn  ksnkn wks kwdnskwndskndknkjfndc jwenfdjnwedj edjc wejsd jwenfcm cjedcjwedjnwe djc ej jen cwje cjews djq wasj qdaj qdasj qdwajs qwj jdwn asjqwn asjqwdnsa ja";
        }
        $scope.setAnswer = addInt;

        function addInt(a, b) {
            $scope.answer = parseInt(a) + parseInt(b);
        }

    }
})();