/**
 * Created by Govinda on 11/30/2015.
 */
"use strict";

module.exports = function (app, mongoose, db, passport, LocalStrategy, FacebookStrategy, GoogleStrategy) {

    var newsModel = require("./models/news.model.js")(mongoose,db);
    var userModel = require("./models/user.model.js")(mongoose, db, passport, LocalStrategy);
    var messageModel = require("./models/message.model.js")(mongoose, db);
    var teamModel = require("./models/team.model.js")(mongoose, db);
    var teamCommentModel = require("./models/team.comment.model.js")(mongoose, db);

    require("./services/news.service.js")(app, newsModel);
    require("./services/user.service.js")(app, passport, userModel, LocalStrategy, FacebookStrategy, GoogleStrategy);
    require("./services/API.service.js")(app, teamModel);
    require("./services/message.service.js")(app, messageModel);
    require("./services/team.comment.service.js")(app, teamCommentModel);
};