"use strict";
(function () {
    angular.module("FormBuilderApp").factory("FieldService", FieldService);

    function FieldService($q,$http) {

        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            cloneField : cloneField
        }

        return service;


        function createFieldForForm(formId, field){
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field";
            console.log(url);
            $http.post(url, field).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getFieldsForForm(formId){
            console.log(formId);
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field";
            $http.get(url).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getFieldForForm(formId, fieldId){
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            $http.get(url).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }

        function deleteFieldFromForm(formId, fieldId){
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            console.log(url);
            $http.delete(url).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }

        function updateField(formId, fieldId, field){
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            $http.put(url,field).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }

        function cloneField(formId, field){
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field";
            $http.post(url,field).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }
    }
})();