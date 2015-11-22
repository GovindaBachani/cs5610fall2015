"use strict"

module.exports = function(app,model){

    app.post("/api/assignment/form/:formId/field", CreateFormField);
    app.get("/api/assignment/form/:formId/field", GetFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", GetFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", UpdateFormField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", DeleteFormField);

    function CreateFormField(req,res){
        model.AddFormField(req.params.formId, req.body).then(function(form){
            res.json(form.fields);
        });
    };

    function GetFormFields(req,res){
        model.FindById(req.params.formId).then(function(form){
            res.json(form.fields);
        });
    };

    function GetFormField(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.FindField(formId,fieldId).then(function(field){
            res.json(field);
        });
    };

    function UpdateFormField(req,res){
        model.UpdateFormField(req.params.formId, req.params.fieldId, req.body)
            .then(function(form){
            res.json(form.fields);
        });
    };

    function DeleteFormField(req,res){
        model.DeleteFormField(req.params.formId, req.params.fieldId)
            .then(function(form){
            res.json(form.fields);
        });
    };
};