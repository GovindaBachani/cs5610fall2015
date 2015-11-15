"use strict";
(function () {
    angular.module("FormBuilderApp").factory("FieldService", FieldService);

    function FieldService($q,$http) {

        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        }

        return service;


        function createFieldForForm(formId, field){
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field";
            console.log(url);
            $http.post(url, field).success(function(response){
                console.log(response);
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getFieldsForForm(formId){
            var defer = $q.defer();
            console.log(formId);
            var url = "/api/assignment/form/" + formId + "/field";
            console.log(url);
            $http.get(url).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getFieldForForm(formId, fieldId){

        }

        function deleteFieldFromForm(formId, fieldId){

        }

        function updateField(formId, fieldId, field){

        }
    }
})();