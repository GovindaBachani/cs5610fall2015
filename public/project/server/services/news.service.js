/**
 * Created by Govinda on 11/30/2015.
 */
"use strict"

module.exports = function (app, model) {

    app.post("/api/project/news", addNews);
    app.put("/api/project/project/:url", updateUser);
    app.get('/api/project/news/:id', findUser);

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
                if(user.role == 'admin'){
                    res.send("admin");
                }
                else{
                    res.json(user);
                }
            });
        }
        else {
            model.FindUserByUsername(username).then(function (user) {
                res.json(user);
            });
        }
    };

    function deleteUser(req, res) {
        model.Delete(req.params.id).then(function (users) {
            res.json(users);
        });
    };

    function updateUser(req, res) {
        model.Update(req.params.id, req.body).then(function (user) {
            res.json(user);
        });
    };

    function findById(req, res) {
        model.FindById(req.params.id).then(function (user) {
            res.json(user);
        });
    };

    function addNews(req, res) {
        var user = req.body;
        model.Create(user).then(function (user) {
            res.json(user);
        });
    };
};
