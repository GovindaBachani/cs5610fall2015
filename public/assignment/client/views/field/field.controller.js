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

        $scope.fieldsOption = [{ name: "Single Line Text Field", id: 0 },
            { name: "Multi Line Text Field", id: 1},
            { name: "Date Field", id: 2},
            { name: "Dropdown Field", id: 3},
            { name: "CheckBoxes Field", id: 4 },
            { name: "Radio Buttons Field", id: 5}];

        FieldService.getFieldsForForm(formId).then(function(fields){
            $scope.fields = fields;
        });

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
            var field;

            if(modelType === "Single Line Text Field"){
                field = textField;
            }
            else if(modelType === "Multi Line Text Field"){
                field = textAreaField;
            }
            else if(modelType === "Date Field"){
                field = dateField;
            }
            else if(modelType === "Dropdown Field"){
                field = dropDownField;
            }
            else if(modelType === "CheckBoxes Field"){
                field = checkBoxField;
            }
            else if(modelType === "Radio Buttons Field"){
                field = radioBoxField;
            }

            console.log(field);
            FieldService.createFieldForForm(formId,field).then(function(fields){
                $scope.fields =fields;
            });
        }

        $scope.removeField = function(field){
            FieldService.deleteFieldFromForm(formId,field.id).then(function(fields){
                $scope.fields = fields;
            });
        }

        $scope.clone = function(field){
            FieldService.cloneField(formId,field).then(function(fields){
                $scope.fields = fields;
            });
        }
    }
})();