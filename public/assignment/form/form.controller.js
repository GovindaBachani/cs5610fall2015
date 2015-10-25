"use strict";
(function () {
    angular.module("FormBuilderApp")
           .controller("FormController", FormController);

    function FormController($scope, FormService) {
        var fc = this;
        
        var forms = FormService.findAllFormsForUser("1", function (forms) {
            console.log(forms);
        });        
        console.log(this.forms);
    }
})();