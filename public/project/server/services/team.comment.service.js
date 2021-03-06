﻿"use strict"

module.exports = function (app, model) {
    app.post("/api/project/comment/:teamId", function (req, res) {
        var teamId = req.params.teamId;
        var comment = req.body;
        model.Create(comment, teamId).then(function (comments) {
            res.json(comments);
        })
    });

    app.get("/api/project/admin/team/comments", function (req, res) {
        model.getAllTeamsWithNonZeroComment().then(function (teams) {
            res.json(teams);
        })
    });

    app.post("/api/project/like/:emailId/:teamId", function (req, res) {
        var teamId = req.params.teamId;
        var emailId = req.params.emailId;
        model.increaseLikeCount(teamId, emailId).then(function (team) {
            res.json(team);
        })
    });
    
    app.post("/api/project/dislike/:emailId/:teamId", function (req, res) {
        var teamId = req.params.teamId;
        var emailId = req.params.emailId;
        model.increasedisLikeCount(teamId, emailId).then(function (team) {
            res.json(team);
        })
    });

    app.get('/api/project/comment/:teamId', function (req, res) {
        var teamId = req.params.teamId;
        model.FindAll(teamId).then(function (team) {
            res.json(team);
        });
    });
    app.delete('/api/project/comment/:teamId/:commentId', function (req, res) {
        var teamId = req.params.teamId;
        var commentId = req.params.commentId;
        model.Delete(teamId, commentId).then(function (comments) {
            res.json(comments);
        });
    });
}