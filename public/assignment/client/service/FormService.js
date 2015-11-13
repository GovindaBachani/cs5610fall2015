"use strict";
(function () {
    angular.module("FormBuilderApp").factory("FormService", FormService);

    function FormService($q,$http) {

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }

        return service;

        function createFormForUser(userId, form) {
            var defer = $q.defer();
            var url = "/api/assignment/user/" + userId + "/form";
            console.log(url);
            $http.post(url, form).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
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

        function findAllFormsForUser(userId) {
            var defer = $q.defer();
            var url = "/api/assignment/user/" + userId + "/form";
            console.log(url);
            $http.get(url).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }

        function deleteFormById(formId) {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId;
            console.log(url);
            $http.delete(url).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }

        function updateFormById(formId, newForm) {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId;
            console.log(url);
            $http.put(url,newForm).success(function(response){
                defer.resolve(response);
            });
            return defer.promise;
        }
    }
})();