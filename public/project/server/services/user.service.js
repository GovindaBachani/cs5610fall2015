/**
 * Created by Govinda on 11/30/2015.
 */
"use strict"

module.exports = function (app, passport, model, LocalStrategy) {

    var auth = function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        }
        else {
            next();
        }
    };

    passport.use(new LocalStrategy(
        function (username, password, done) {
            var credentials = {
                username: username,
                password: password
            };
            model.FindUserByCredentials(credentials).then(function (user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            })
        }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    app.post("/api/project/login", passport.authenticate('local'), function (req, res) {
        var user = req.user;
        res.json(user);
    });

    app.get('/api/project/loggedin', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/api/project/logout', function (req, res) {
        req.logOut();
        res.send(200);
    });

    app.post("/api/project/user", addUser);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.get('/api/project/user', findUser);
    app.get("/api/project/user/:id", findById);



    app.get('/api/project/loggedin', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/api/project/logout', function (req, res) {
        req.logOut();
        res.send(200);
    });

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
                if (user.role == 'admin') {
                    res.send("admin");
                }
                else {
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

    function addUser(req, res) {
        var user = req.body;
        model.Create(user).then(function (user) {
            res.json(user);
        });
    };
};
