"use strict"

module.exports = function (app, model) {

    app.post("/api/assignment/user", addUser);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.get('/api/assignment/user', findUser);
    app.get("/api/assignment/user/:id", findById);

    function addUser(req, res) {
        var user = req.body;
        model.Create(user).then(function (user) {
            res.json(user);
        });
    };

    function findUser(req, res) {
        var username = req.param("username");
        var password = req.param("password");
        if (typeof username === 'undefined' && typeof password === 'undefined') {
            model.FindAll().then(function (users) {
                res.json(users);
            });
        }
        else if (username != null && password != null) {
            var credentials = {
                username: username,
                password: password
            };
            model.FindUserByCredentials(credentials).then(function (user) {
                res.json(user);
            });
        }
        else {
            model.FindUserByUsername(username).then(function (user) {
                res.json(user);
            });
        }
    };

    function updateUser(req, res) {
        model.Update(req.params.id, req.body).then(function (user) {
            res.json(user);
        });
    };

    function deleteUser(req, res) {
        model.Delete(req.params.id).then(function (users) {
            res.json(users);
        });
    };


    function findById(req, res) {
        model.FindById(req.params.id).then(function (user) {
            res.json(user);
        });
    };


};