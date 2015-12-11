/**
 * Created by Govinda on 11/30/2015.
 */

//{clientID: '1022999842621-1a7idb394i442kr46ook1ml5f1d2ggee.apps.googleusercontent.com',clientSecret: 'muYbd9eJfIljR0R71pNmKYAt',callbackURL: 'http://cs5610-govindabachani.rhcloud.com/auth/google/callback'}
//{clientID: '333234730184863',clientSecret: '65d2640dd0c72bd854f580ece8cd852d',callbackURL: 'http://cs5610-govindabachani.rhcloud.com/auth/facebook/callback',profileFields: ["displayName", "email"],enableProof: false}

"use strict"

module.exports = function (app, passport, model, LocalStrategy, FacebookStrategy, GoogleStrategy) {

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
                    return done(null, false, {
                        error: 'Incorrect username or password.'
                    });
                }
                console.log(user);
                return done(null, user);
            })
        }));

    passport.use(new FacebookStrategy(
        //{ clientID: '556162171199230', clientSecret: '8f05c6710e6454ff1e19a88df6f70eb4', callbackURL: 'http://localhost:3000/auth/facebook/callback', profileFields: ["displayName", "email"], enableProof: false }
        //{clientID: '1022999842621-1a7idb394i442kr46ook1ml5f1d2ggee.apps.googleusercontent.com',clientSecret: 'muYbd9eJfIljR0R71pNmKYAt',callbackURL: 'http://cs5610-govindabachani.rhcloud.com/auth/google/callback'}
        { clientID: '333234730184863', clientSecret: '65d2640dd0c72bd854f580ece8cd852d', callbackURL: 'http://cs5610-govindabachani.rhcloud.com/auth/facebook/callback', profileFields: ["displayName", "email"], enableProof: false }
        , function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                var email = String(profile._json.email);
                var arr = email.split('@');
                var username = arr[0];
                model.FindUserByUsername(username).then(function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = {
                            username: username,
                            fullName: profile.displayName,
                            email: email
                        };
                        model.Create(newUser).then(function (user) {
                            return done(null, user);
                        });
                    }
                });
            });
        }));

    passport.use(new GoogleStrategy(
      // { clientID: '392985991485-idb2ehamkiulhlnmk6vbqf7rsb2r1moc.apps.googleusercontent.com', clientSecret: 'QAh5T-KHYvNOceGZFlVsntff', callbackURL: 'http://localhost:3000/auth/google/callback' },
{ clientID: '1022999842621-1a7idb394i442kr46ook1ml5f1d2ggee.apps.googleusercontent.com', clientSecret: 'muYbd9eJfIljR0R71pNmKYAt', callbackURL: 'http://cs5610-govindabachani.rhcloud.com/auth/google/callback' },
//{clientID: '333234730184863',clientSecret: '65d2640dd0c72bd854f580ece8cd852d',callbackURL: 'http://cs5610-govindabachani.rhcloud.com/auth/facebook/callback',profileFields: ["displayName", "email"],enableProof: false}
    function (token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function () {

            // try to find the user based on their google id
            var email = String(profile.emails[0].value);
            var arr = email.split('@');
            var username = arr[0];
            model.FindUserByUsername(username).then(function (user) {
                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser = {
                        username: username,
                        fullName: profile.displayName,
                        email: profile.emails[0].value
                    }

                    // save the user
                    model.Create(newUser).then(function (user) {
                        return done(null, user);
                    });
                }
            });
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        model.FindById(user._id).then(function (userU) {
            //UserU.password = "******";
            done(null, userU);
        });        
    });

    app.post("/api/project/login", passport.authenticate('local'), function (req, res) {
        var user = req.user;
        res.json(user);
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

    app.get('/auth/facebook/callback',
            passport.authenticate('facebook', { failureRedirect: '/project/client/#/login' }),
        function (req, res) {
            // successful auth, user is set at req.user.  redirect as necessary.
            if (req.user.team) {
                res.redirect('/project/client/#/home');
            }
            else {
                res.redirect('/project/client/#/profile');
            }
        });

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/project/client/#/login' }),
        function (req, res) {
            // successful auth, user is set at req.user.  redirect as necessary.
            if (req.user.team) {
                res.redirect('/project/client/#/home');
            }
            else {
                res.redirect('/project/client/#/profile');
            }
        });


    app.get('/api/project/loggedin', function (req, res) {
        if (req.isAuthenticated()) {
            req.user.password = "*******";
            res.send(req.user);
        }
        else {
            res.send('0');
        }
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

    app.get("/api/project/user/find/:email", function (req, res) {
        var email = req.param("email");
        model.FindUserByEmail(email).then(function (user) {
            user.password = "********";
            res.json(user);
        });
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
