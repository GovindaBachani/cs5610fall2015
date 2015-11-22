"use strict"

module.exports = function(app,model){

    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/user/:userId/form", getForms);
    app.get("/api/assignment/form/:formId", getForm);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteForm);

    function createForm(req,res){
        var form = req.body;
        var userId = req.params.userId;
        model.Create(form, userId).then(function(forms){
           res.json(forms);
        });
    };

    function getForms(req,res){
        var userId = req.params.userId;
        model.FindFormsByUserId(userId).then(function(userForms){
            res.json(userForms);
        });
    };

    function getForm(req,res){
        var formId = req.params.formId;
        model.FindById(formId).then(function(form){
            res.json(form);
        });
    };

    function updateForm(req,res){
        model.Update(req.params.formId,req.body).then(function(form){
            res.json(form);
        });
    };

    function deleteForm(req,res){
        model.Delete(req.params.formId).then(function(forms){
            res.json(forms);
        });
    };
};