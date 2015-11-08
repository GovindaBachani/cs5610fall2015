"use strict";
(function () {
    angular.module("SoccerApp").factory("FormService", FormService);

    function FormService() {
        var forms =
            [{ name: "First Form", userid: "1", id: "1" },
            { name: "Second Form", userid: "1", id: "2" },
            { name: "Third Form", userid: "1", id: "3" },
            { name: "Fourth Form", userid: "1", id: "4" }];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }

        return service;

        function createFormForUser(userId, form, callback) {
            if (form.name.length != 0) {
                form.userid = userId;
                form.id = guid();
                forms.push(form);
                console.log(forms);
                return callback(forms);
            }
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
            console.log("abcd");
            var foundForms = [];
            for (var i = 0; i < forms.length; i++) {
                if (userId == forms[i].userid) {
                    foundForms.push(forms[i]);
                }
            }
            return callback(foundForms);
        }

        function deleteFormById(formId, callback) {
            var index = -1;
            for (var i = 0; i < forms.length; i++) {
                if (formId == forms[i].id) {
                    index = i;
                    break;
                }
            }
            forms.splice(index, 1);
            return callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            if (newForm.name.length != 0) {
                for (var i = 0; i < forms.length; i++) {
                    if (formId == forms[i].id) {
                        forms[i].userid = newForm.userid;
                        forms[i].name = newForm.name;
                        return (callback(forms[i]));
                    }
                }
            }
        }
    }
})();