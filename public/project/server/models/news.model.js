/**
 * Created by Govinda on 11/30/2015.
 */

"use strict";

var q = require('q');

var newsSchema = require('./news.schema.js');

module.exports = function (mongoose, db) {

    var schemaInstance = new newsSchema(mongoose);

    var newsModel = mongoose.model('news', schemaInstance.getSchema());

    var api = {
        CreateNews: CreateNews,
        getNewsContent: getNewsContent,
        addComment: addComment,
        deleteComment: deleteComment,
        increaseDislikeCount: increasedisLikeCount,
        increaseLikeCount: increaseLikeCount

    }

    function getNewsContent(newsId) {
        var deferred = q.defer();
        newsModel.findOne({ newsId: newsId }, function (err, doc) {
            console.log(doc);
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function CreateNews(newsObj) {
        var newsId1 = newsObj.newsId;
        console.log(newsId1);
        var deferred = q.defer();
        newsModel.findOne({ newsId: newsId1 }, function (err, rNews) {
            console.log(rNews);
            if (rNews) {
                deferred.resolve(rNews);
            }
            else {
                newsModel.create(newsObj, function (err, doc) {
                    console.log(doc);
                    deferred.resolve(doc);
                });
            }
        });
        return deferred.promise;
    }

    function addComment(comment, newsId) {
        var deferred = q.defer();
        newsModel.findOne({ newsId: newsId }, function (err, rNews) {
            rNews.comments.push(comment);
            rNews.save(function (err, doc) {
                deferred.resolve(doc);
            });
        });
        return deferred.promise;
    }

    function deleteComment(commentId, newsId) {
        var deferred = q.defer();
        newsModel.findOne({ newsId: newsId }, function (err, news) {
            for (var i = 0; i < news.comments.length; i++) {
                if (news.comments[i]._id == commentId) {
                    news.comments.splice(i, 1);
                }
            }
            news.save(function (err, doc) {
                deferred.resolve(doc);
            });
        });
        return deferred.promise;
    }

    function increaseLikeCount(newsId, email) {
        var deferred = q.defer();
        newsModel.findOne({ newsId: newsId }, function (err, doc) {
            if (!doc) {
                var team = {
                    newsId: newsId,
                    comments: [],
                    likes: [email],
                    dislikes: []
                };

                newsModel.create(team, function (err, doc) {
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

    function increasedisLikeCount(newsId, email) {
        var deferred = q.defer();
        newsModel.findOne({ newsId: newsId }, function (err, doc) {
            if (!doc) {
                console.log("err");
                var team = {
                    newsId: newsId,
                    comments: [],
                    likes: [],
                    dislikes: [email]
                };
                newsModel.create(team, function (err, doc) {
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
