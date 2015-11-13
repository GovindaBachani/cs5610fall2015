"use strict"

module.exports = function(app,model){

    app.post("/api/assignment/form/:formId/field", function(req,res){
        res.json(model.AddFormField(formId, req.body));
    });

    app.get("/api/assignment/form/:formId/field", function(req,res){
        res.json(model.FindById(req.params.formId).fields);
    });

    app.get("/api/assignment/form/:formId/field/:fieldId", function(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.FindField(formId,fieldId));
    });

    app.put("/api/assignment/form/:formId/field/:fieldId",function(req,res){
        res.json(model.UpdateFormField(req.params.formId, req.params.fieldId, req.body));
    });

    app.delete("/api/assignment/form/:formId/field/:fieldId",function(req,res){
        res.json(model.DeleteFormField(req.params.formId, req.params.fieldId));
    });
};