"use strict"

module.exports = function (app, model) {
    app.post('/api/project/message/send', addMessage);
    app.get('/api/project/admin/message', getAllMessages);
    app.delete('/api/project/message/:id', deleteMessage);

    function addMessage(req, res) {
        var message = req.body;
        model.Create(message).then(function (message) {
            res.json(message);
        });
    }

    function getAllMessages(req,res) {
        model.FindAll().then(function (messages) {
            res.json(messages);
        });
    }

    function deleteMessage(req,res) {
        model.Delete(req.params.id).then(function (messages) {
            res.json(messages);
        });
    }
}