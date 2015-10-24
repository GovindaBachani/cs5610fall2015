"use strict";
(function () {
    angular.module("FormBuilderApp").factory("FormService", FormService);

    function FormService() {
        var forms = [];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }

        return service;

        function createFormForUser() {

        }

        function findAllFormsForUser() {

        }

        function deleteFormById() {

        }

        function updateFormById() {

        }
    }
})();