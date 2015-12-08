"use strict";

var q = require('q');

var teamCommentSchemas = require('./team.comment.schema.js');

module.exports = function (mongoose, db) {
    var schemaInstance = new teamCommentSchemas(mongoose);

    var teamCommentModel = mongoose.model('teamComments', schemaInstance.getSchema());

    var api = {
        Create: Create,
        FindAll: FindAll,
        Delete: Delete
    }

    function Create(comment, teamId) {
        var deferred = q.defer();
        teamCommentModel.findOne({ teamId: teamId }, function (err, team) {
            if (team) {
                team.comments.push(comment);
                team.save(function (err, doc) {
                    deferred.resolve(doc.comments);
                });
            }
            else {
                var comments = [];
                comments.push(comment);
                var team = {
                    teamId: teamId,
                    comments: comments,
                    likes: [],
                    dislikes: [],
                };
                teamCommentModel.create(team, function (err, team) {
                    deferred.resolve(team.comments);
                });
            }
        });
        return deferred.promise;
    }

    function FindAll(teamId) {
        var deferred = q.defer();
        console.log(teamId);
        teamCommentModel.findOne({ teamId: teamId }, function (err, team) {
            deferred.resolve(team);
        });
        return deferred.promise;
    }

    function Delete(teamId, commentId) {
        var deferred = q.defer();
        teamCommentModel.findOne({ teamId: teamId }, function (err, team) {
            for (var i = 0; i < team.comments.length; i++) {
                if (team.comments[i]._id == commentId) {
                    team.comments.splice(i, 1);
                }
            }
            team.save(function (err, doc) {
                deferred.resolve(doc.comments);
            });
        });
        return deferred.promise;

    }

    return api;
};