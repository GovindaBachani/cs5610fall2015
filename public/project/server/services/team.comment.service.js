"use strict"

module.exports = function (app, model) {
    app.post("/api/project/comment/:teamId", function (req, res) {
        var teamId = req.params.teamId;
        var comment = req.body;
        model.Create(comment, teamId).then(function (comments) {
            console.log(comments);
            res.json(comments);
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
        console.log(commentId);
        model.Delete(teamId, commentId).then(function (comments) {
            res.json(comments);
        });
    });
}