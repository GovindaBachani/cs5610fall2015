"use strict";
(function () {
    angular.module("FormBuilderApp")
           .controller("FormController", FormController);

    function FormController($scope, FormService,$rootScope) {
        FormService.findAllFormsForUser($rootScope.loggedUser.id, function (forms) {
            $scope.forms = forms;
        });

        $scope.addForm = function () {
            console.log($scope);
            var form = {
                name: $scope.formName
            };
            
            FormService.createFormForUser($rootScope.loggedUser.id, form, function (forms) {
                $scope.forms = forms;
            });
        }

        $scope.deleteForm = function (id) {
            FormService.deleteFormById(id, function (forms) {
                $scope.forms = forms;
            });
        }
    }
})();