"use strict";
var q = require('q');
var formSchema = require('./form.schema.js');

module.exports = function(mongoose,db){


    var FormSchema = new formSchema(mongoose);

    var fSchema = FormSchema.getSchema();

    var formModel = mongoose.model('cs5610.assignment.form', fSchema);

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
        var deferred = q.defer();
        formModel.findById(formId, function(err,doc){
            var fields = doc.fields;
            fields.push(field);
            doc.fields = fields;
            doc.save(function(err,updatedForm){
                deferred.resolve(updatedForm);
            });
        });
        return deferred.promise;
    }

    function FindField(formId,fieldId){
        var deferred = q.defer();
        formModel.findById(formId, function(err,doc){
            var fields = doc.fields;
            for(var j = 0; j<fields.length; j++){
                if(fields[j]._id == fieldId){
                    deferred.resolve(fields[j]);
                }
            }
        });
        return deferred.promise;
    }

    function Create(form,userId){
        form.userId = userId;
        form.fields = [];
        var deferred = q.defer();
        formModel.create(form, function(err,doc){
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function FindFormsByUserId(uid){
        var deferred = q.defer();
        formModel.find({userId: uid}, function(err,doc){
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function FindAll(){
        var deferred = q.defer();
        formModel.find({}, function(err,doc){
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function FindById(id){
        var deferred = q.defer();
        formModel.findById(id, function(err,doc){
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function Update(id, form){
        var deferred = q.defer();
        formModel.findById(id, function (err, formUpdate) {
            formUpdate.title = form.title;
            formUpdate.save(function (err, doc) {
                deferred.resolve(doc);
            });
        });
        return deferred.promise;
    }

    function Delete(id){
        var deferred = q.defer();
        formModel.remove({ _id: id }, function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function FindFormByTitle(title){
        for(var i = 0; i<forms.length; i++){
            if(title === forms[i].title){
                return forms[i];
            }
        }
        return null;
    }

    function DeleteFormField(formId, fieldId){
        var deferred = q.defer();
        formModel.findById({ _id: formId }, function (err, form) {
            var fields = form.fields;
            for(var j = 0; j<fields.length; j++){
                if(fields[j]._id == fieldId){
                    fields.splice(j,1);
                }
            }
            form.fields = fields;
            form.save(function (err, doc) {
                deferred.resolve(doc);
            });
        });
        return deferred.promise;
    }

    function UpdateFormField(formId, fieldId, field){
        var deferred = q.defer();
        formModel.findById({ _id: formId }, function (err, form) {
             var fields = form.fields;
            for(var j = 0; j<fields.length; j++){
               if(fields[j]._id == fieldId){
                    fields[j] = field;
                    break;
                }
            }
            form.fields = fields;
            form.save(function (err, doc) {
                deferred.resolve(doc);
            });
        });
    }
};