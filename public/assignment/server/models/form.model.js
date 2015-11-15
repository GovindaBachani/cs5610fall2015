"use strict";
var forms = require("./form.mock.json");
var uid = require("uuid");

module.exports = function(app){
    var api = {
        Create : Create,
        FindAll : FindAll,
        FindById : FindById,
        Update : Update,
        Delete : Delete,
        FindFormByTitle : FindFormByTitle,
        FindFormsByUserId : FindFormsByUserId,
        AddFormField : AddFormField,
        FindField : FindField,
        UpdateFormField : UpdateFormField,
        DeleteFormField : DeleteFormField
    }

    return api;

    function AddFormField(formId, field){
        for(var i = 0; i<forms.length; i++) {
            if (formId === forms[i].id) {
                if(forms[i].fields == null){
                    forms[i].fields = [];
                    forms[i].fields.push(field);
                }
                else{
                    forms[i].fields.push(field);
                }
                return forms[i].fields;
            }
        }
    }

    function FindField(formId,fieldId){
        for(var i = 0; i<forms.length; i++) {
            if (forms[i].id === formId) {
                for (var j = 0; j < forms[i].fields.length; j++) {
                    if (forms[i].fields[j].id === fieldId) {
                        return forms[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function Create(form,userId){
        console.log(userId + " 1");
        console.log(form);
        form.userId = userId;
        form.id = uid.v4();
        form.fields = [];
        forms.push(form);
        return forms;
    }

    function FindAll(){
        return forms;
    }

    function FindById(id){
        for(var i = 0; i<forms.length; i++){
            if(id === forms[i].id){
                return forms[i];
            }
        }
        return null;
    }

    function Update(id, form){
        for(var i = 0; i<forms.length; i++){
            if(id === forms[i].id){
                forms[i].title = form.title;
                forms[i].userId = form.userId
                return forms[i];
            }
        }
        return null;
    }

    function Delete(id){
        console.log(id);
        for(var i = 0; i<forms.length; i++) {
            console.log(forms[i].id);
            if (id == forms[i].id) {
                forms.splice(i, 1);
            }
        }
    }

    function FindFormByTitle(title){
        for(var i = 0; i<forms.length; i++){
            if(title === forms[i].title){
                return forms[i];
            }
        }
        return null;
    }

    function FindFormsByUserId(userId){
        var userForms = [];
        for(var i = 0; i<forms.length; i++){
            console.log(forms[i].userId);
            if(forms[i].userId == userId){
                userForms.push(forms[i]);
            }
        }
        return userForms;
    }

    function DeleteFormField(formId, fieldId){
        for(var i = 0; i<forms.length; i++){
            if(forms[i].id == formId){
                for(var j = 0; j<forms[i].fields.length; j++){
                    if(forms[i].fields[j].id === fieldId){
                        forms[i].fields.splice(j,1);
                    }
                }
            }
        }
    }

    function UpdateFormField(formId, fieldId, field){
        for(var i = 0; i<forms.length; i++){
            if(forms[i].id === formId){
                for(var j = 0; j<forms[i].fields.length; j++){
                    if(forms[i].fields[j].id === fieldId){
                        forms[i].fields[j] = field;
                    }
                }
            }
        }
    }
};