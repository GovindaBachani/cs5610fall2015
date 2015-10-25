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
                $scope.formName = "";
            });
        }

        $scope.deleteForm = function (id) {
            FormService.deleteFormById(id, function (forms) {
                $scope.forms = forms;
            });
        }

        $scope.selectForm = function (index) {
            $scope.selectedFormId = $scope.forms[index].id;
            $scope.formName = $scope.forms[index].name;
            $scope.index = index;
        }

        $scope.updateForm = function (selectedFormId, index) {
            var formToBeUpdated = $scope.forms[index];
            var newForm = {
                name: $scope.formName,
                userid: formToBeUpdated.userid
                };
            FormService.updateFormById(selectedFormId, newForm, function (updatedForm) {
                $scope.forms[index] = updatedForm;
                $scope.formName = "";
            })
        }
    }
})();