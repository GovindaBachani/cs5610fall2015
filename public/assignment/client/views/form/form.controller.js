"use strict";
(function () {
    angular.module("FormBuilderApp")
           .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope, $location) {
        console.log($rootScope.loggedUser);
        FormService.findAllFormsForUser($rootScope.loggedUser._id).then(function (forms) {
            $scope.forms = forms;
        });

        $scope.addForm = function () {
            console.log($scope.formName);
            var form = {
                title: $scope.formName
            };
            console.log(angular.isUndefined($scope.formName));
            if(!angular.isUndefined($scope.formName) && $scope.formName != ""){
                FormService.createFormForUser($rootScope.loggedUser._id, form).then(function(forms) {
                    FormService.findAllFormsForUser($rootScope.loggedUser._id).then(function(forms) {
                        $scope.forms = forms;
                        $scope.formName = "";
                    });
                });
            }
        }

        $scope.deleteForm = function (_id) {
            FormService.deleteFormById(_id).then(function (forms) {
                FormService.findAllFormsForUser($rootScope.loggedUser._id).then(function (forms) {
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

        $scope.updateForm = function (_id, index) {
            if (!angular.isUndefined(index)) {
                console.log(index);
                if (!angular.isUndefined($scope.formName) && $scope.formName != "") {
                    var formToBeUpdated = $scope.forms[index];
                    console.log(formToBeUpdated);
                    var newForm = {
                        title: $scope.formName,
                        userId: $rootScope.loggedUser._id
                    };
                    console.log(newForm);
                    FormService.updateFormById(formToBeUpdated._id, newForm).then(function (updatedForm) {
                        $scope.forms[index] = updatedForm;
                        $scope.formName = "";
                    })
                }
            }
        }

        $scope.navigate = function(index){
            $location.path("/user/" + $rootScope.loggedUser._id + "/form/" + $scope.forms[index]._id + "/fields");
        }
    }
})();