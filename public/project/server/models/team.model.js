﻿"use strict";

var q = require('q');

var teamSchemas = require('./team.schema.js');

module.exports = function (mongoose, db) {
    var schemaInstance = new teamSchemas(mongoose);

    var teamModel = mongoose.model('team', schemaInstance.getSchema());

    var api = {
        Create: Create,
        FindByTeamUrl: FindByTeamUrl,
        FindAll: FindAll
    }

    function FindByTeamUrl(teamIdR) {
        var deferred = q.defer();
        teamModel.findOne({ teamId: teamIdR }, function (err, doc) {
            console.log(doc);
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function FindAll() {
        var deferred = q.defer();
        teamModel.find({}, function (err, doc) {
            console.log(doc);
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function Create(team) {
        var teamId = getTeamId(team._links.self.href);
        var teamObj = {
            teamId: teamId,
            crestUrl: team.crestUrl,
            teamName: team.name
        };
        console.log(teamObj);
        var deferred = q.defer();
        teamModel.create(teamObj, function (err, doc) {
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    

    return api;
};