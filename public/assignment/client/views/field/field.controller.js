/**
 * Created by Govinda on 11/14/2015.
 */
"use strict";
(function () {
    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, FieldService, $rootScope, $location, $routeParams) {
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;

        FieldService.getFieldsForForm(formId).then(function(fields){
            $scope.fields = fields;
            console.log(fields);
            console.log($scope.fields);
        })

        $scope.addField = function(modelType){
            var textField = {"id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            var textAreaField = {"id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            var dateField = {"id": null, "label": "New Date Field", "type": "DATE"};
            var dropDownField = {"id": null, "label": "New Dropdown",
                "type": "OPTIONS", "options":
                    [ {"label": "Option 1", "value": "OPTION_1"},
                      {"label": "Option 2", "value": "OPTION_2"},
                      {"label": "Option 3", "value": "OPTION_3"} ]};
            var checkBoxField = {"id": null, "label": "New Checkboxes",
                "type": "CHECKBOXES", "options":
                [ {"label": "Option A", "value": "OPTION_A"},
                  {"label": "Option B", "value": "OPTION_B"},
                  {"label": "Option C", "value": "OPTION_C"} ]};
            var radioBoxField = {"id": null, "label": "New Radio Buttons",
                "type": "RADIOS", "options":
                [ {"label": "Option X", "value": "OPTION_X"},
                  {"label": "Option Y", "value": "OPTION_Y"},
                  {"label": "Option Z", "value": "OPTION_Z"} ]};
            $scope.fieldItems = [textField, textAreaField, dateField, dropDownField, checkBoxField, radioBoxField];
            var field = $scope.selection = $scope.items[0];
            console.log(field);
            FieldService.createFieldForForm(formId,field).then(function(fields){
                console.log(fields);
                $scope.fields =fields;
            });
        }
    }
})();