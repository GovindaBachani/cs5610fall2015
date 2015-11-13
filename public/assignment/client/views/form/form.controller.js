"use strict";
(function () {
    angular.module("FormBuilderApp")
           .controller("FormController", FormController);

    function FormController($scope, FormService,$rootScope) {
        FormService.findAllFormsForUser($rootScope.loggedUser.id).then(function (forms) {
            $scope.forms = forms;
        });

        $scope.addForm = function () {
            console.log($scope.formName);
            var form = {
                title: $scope.formName
            };
            console.log(angular.isUndefined($scope.formName));
            if(!angular.isUndefined($scope.formName) && $scope.formName != ""){
                FormService.createFormForUser($rootScope.loggedUser.id, form).then(function(forms) {
                    FormService.findAllFormsForUser($rootScope.loggedUser.id).then(function(forms) {
                        $scope.forms = forms;
                        $scope.formName = "";
                    });
                });
            }
        }

        $scope.deleteForm = function (id) {
            FormService.deleteFormById(id).then(function (forms) {
                FormService.findAllFormsForUser($rootScope.loggedUser.id).then(function (forms) {
                    $scope.forms = forms;
                });
            });
        }

        $scope.selectForm = function (index) {
            console.log(index);
            $scope.selectedFormId = $scope.forms[index].id;
            $scope.formName = $scope.forms[index].title;
            $scope.index = index;
        }

        $scope.updateForm = function (selectedFormId, index) {
            if(!angular.isUndefined($scope.formName) && $scope.formName != ""){
                var formToBeUpdated = $scope.forms[index];
                var newForm = {
                    title: $scope.formName,
                    userId: $rootScope.loggedUser.id
                };
                console.log(newForm);
                FormService.updateFormById(selectedFormId, newForm).then(function (updatedForm) {
                    $scope.forms[index] = updatedForm;
                    $scope.formName = "";
                })
            }
        }
    }
})();