"use strict";

var q = require('q');

var teamCommentSchemas = require('./team.comment.schema.js');

module.exports = function (mongoose, db) {
    var schemaInstance = new teamCommentSchemas(mongoose);

    var teamCommentModel = mongoose.model('teamComments', schemaInstance.getSchema());

    var api = {
        Create: Create,
        FindAll: FindAll,
        Delete: Delete,
        increaseLikeCount: increaseLikeCount,
        increasedisLikeCount: increasedisLikeCount

    }

    function Create(comment, teamId) {
        var deferred = q.defer();
        teamCommentModel.findOne({ teamId: teamId }, function (err, team) {
            if (team) {
                team.comments.push(comment);    
                team.save(function (err, doc) {
                    deferred.resolve(doc);
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
                    deferred.resolve(team);
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
                deferred.resolve(doc);
            });
        });
        return deferred.promise;

    }
    function increaseLikeCount(teamId, email) {
        var deferred = q.defer();
        teamCommentModel.findOne({ teamId: teamId }, function (err, doc) {
            if (!doc) {
                var team = {
                    teamId: teamId,
                    comments: [],
                    likes: [email],
                    dislikes: []
                };

                teamCommentModel.create(team, function (err, doc) {
                    deferred.resolve(doc);
                });
            }
            else {
                var likes = doc.likes;
                var dislikes = doc.dislikes;
                if (!emailPresent(likes, email) && emailPresent(dislikes, email)) {
                    var dLikes = removeEmail(dislikes, email);
                    doc.dislikes = dLikes;
                    doc.likes.push(email);
                    doc.save(function (err, doc) {
                        deferred.resolve(doc);
                    });
                }
                else if (!emailPresent(likes, email) && !emailPresent(dislikes, email)) {
                    doc.likes.push(email);
                    doc.save(function (err, doc) {
                        deferred.resolve(doc);
                    });
                }
            }
        });
        return deferred.promise;
    };

    function increasedisLikeCount(teamId, email) {
        var deferred = q.defer();
        teamCommentModel.findOne({ teamId: teamId }, function (err, doc) {
            if (!doc) {
                console.log("err");
                var team = {
                    teamId: teamId,
                    comments: [],
                    likes: [],
                    dislikes: [email]
                };
                teamCommentModel.create(team, function (err, doc) {
                    deferred.resolve(doc);
                });
            }
            else {
                var likes = doc.likes;
                var dislikes = doc.dislikes;
                if (emailPresent(likes, email) && !emailPresent(dislikes, email)) {
                    var likesNEw = removeEmail(likes, email);
                    doc.likes = likesNEw;
                    doc.dislikes.push(email);
                    doc.save(function (err, doc) {
                        deferred.resolve(doc);
                    });
                }
                else if (!emailPresent(likes, email) && !emailPresent(dislikes, email)) {
                    doc.dislikes.push(email);
                    doc.save(function (err, doc) {
                        deferred.resolve(doc);
                    });
                }
            }
        });
        return deferred.promise;
    }


    function emailPresent(likeDLike, email) {
        for (var i = 0; i < likeDLike.length; i++) {
            if (likeDLike[i] == email) {
                return true;
            }
        }
        return false;
    }

    function removeEmail(likeDLike, email) {
        for (var i = 0; i < likeDLike.length; i++) {
            if (likeDLike[i] == email) {
                likeDLike.splice(i, 1);
            }
        }
        return likeDLike;
    }
    return api;
};