/**
 * Created by Govinda on 11/30/2015.
 */
"use strict";

module.exports = function(app, mongoose, db, passport, LocalStrategy) {

    var newsModel = require("./models/news.model.js")(mongoose, db, passport, LocalStrategy);
    var userModel = require("./models/user.model.js")(mongoose, db, passport, LocalStrategy);

    require("./services/news.service.js")(app, newsModel);
    require("./services/user.service.js")(app, passport, userModel, LocalStrategy);
    require("./services/API.service.js")(app);
};