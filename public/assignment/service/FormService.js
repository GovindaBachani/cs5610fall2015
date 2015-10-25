"use strict";
(function () {
    angular.module("FormBuilderApp").factory("FormService", FormService);

    function FormService() {
        var forms =
            [{ id: "abcd", name: "First Form", userid: "1" },
            { id: "efgh", name: "Second Form", userid: "1" },
            { id: "ijkl", name: "Third Form", userid: "1" },
            { id: "mnop", name: "Fourth Form", userid: "1" }];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }

        return service;

        function createFormForUser(userId, form, callback) {
            form.userid = userId;
            form.id = guid();
            forms.push(form);
            return callback(form);
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        function findAllFormsForUser(userId, callback) {
            var foundForms = [];
            for (var i = 0; i < forms.length; i++) {
                if (userId == forms[i].userid) {
                    foundForms.push(forms[i]);
                }
            }
            return callback(foundForms);
        }

        function deleteFormById(formId, callback) {
            for (var i = 0; i < forms.length; i++) {
                if (formId == forms[i].id) {
                    delete forms[i];
                }
            }
            return callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var i = 0; i < forms.length; i++) {
                if (formId == forms[i].id) {
                    forms[i].userid = newForm.userid;
                    forms[i].name = newForm.name;
                    return (callback(forms[i]));
                }
            }
        }
    }
})();