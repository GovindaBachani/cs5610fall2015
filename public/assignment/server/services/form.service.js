"use strict"

module.exports = function(app,model){

    app.post("/api/assignment/user/:userId/form", function(req,res){
        res.json(model.Create(req.body,req.params.userId));
    });

    app.get("/api/assignment/user/:userId/form", function(req,res){
        var userId = req.params.userId;
        console.log(userId);
        res.json(model.FindFormsByUserId(userId));
    });

    app.get("/api/assignment/form/:formId", function(req,res){
        res.json(model.FindById(req.params.formId));
    });

    app.put("/api/assignment/form/:formId",function(req,res){
        res.json(model.Update(req.params.formId,req.body));
    });

    app.delete("/api/assignment/form/:formId",function(req,res){
        res.json(model.Delete(req.params.formId));
    });
};