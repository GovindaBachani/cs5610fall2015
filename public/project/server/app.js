/**
 * Created by Govinda on 11/30/2015.
 */
"use strict";

module.exports = function(app, mongoose, db, passport, localStrategy) {

    var newsModel = require("./models/news.model.js")(mongoose, db, passport, localStrategy);
    var userModel = require("./models/user.model.js")(mongoose, db, passport, localStrategy);

    require("./services/news.service.js")(app, newsModel);
    require("./services/user.service.js")(app, userModel);
    require("./services/API.service.js")(app);
};