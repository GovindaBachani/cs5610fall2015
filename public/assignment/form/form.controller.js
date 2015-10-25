"use strict";
(function () {
    angular.module("FormBuilderApp")
           .controller("FormController", FormController);

    function FormController($scope, FormService) {
        var fc = this;
        FormService.findAllFormsForUser("1", function (forms) {
            fc.forms = forms;
        });
    }
})();