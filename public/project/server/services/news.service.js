/**
 * Created by Govinda on 11/30/2015.
 */
"use strict"

module.exports = function (app, model) {
    app.post("/api/project/news", addNews);
    app.post("/api/project/project/:newsId", addComment);
    app.delete("/api/project/news/:newsId/:commentId", deleteComment)
    app.post('/api/project/news/like/:newsId/:emailId', incrementLike);
    app.post('/api/project/news/dislike/:newsId/:emailId', decrementLike);
    app.get('/api/project/news/:newsId', getNews);

    function incrementLike (req, res) {
        var newsId = req.params.newsId;
        var emailId = req.params.emailId;
        model.increaseLikeCount(newsId, emailId).then(function (team) {
            console.log(news);
            res.json(news);
        })
    }

    app.get("/api/project/admin/news/comments", function (req, res) {
        model.getAllNewsWithNonZeroComment().then(function (teams) {
            res.json(teams);
        })
    });

    function decrementLike(req, res) {
        var newsId = req.params.newsId;
        var emailId = req.params.emailId;
        model.increasedisLikeCount(newsId, emailId).then(function (team) {
            console.log(news);
            res.json(news);
        })
    };

    function addNews(req,res) {
        var news = req.body;
        model.CreateNews(news).then(function (news) {
            console.log(news);
            res.json(news);
        })
    }

    function addComment(req, res) {
        var newsId = req.params.newsId;
        var comment = req.body;
        model.addComment(comment, newsId).then(function (news) {
            console.log(news);
            res.json(news);
        });
    }

    function deleteComment(req, res) {
        var newsId = req.params.newsId;
        var commentId = req.params.commentId;
        model.deleteComment(commentId, newsId).then(function (news) {
            console.log(news);
            res.json(news);
        });
    }

    function incrementLike(req, res) {
        var newsId = req.params.newsId;
        var emailId = req.params.emailId;
        model.increaseLikeCount(newsId, emailId).then(function (news) {
            console.log(news);
            res.json(news);
        })
    }

    function decrementLike(req, res) {
        var newsId = req.params.newsId;
        var emailId = req.params.emailId;
        model.increaseDislikeCount(newsId, emailId).then(function (news) {
            console.log(news);
            res.json(news);
        })
    }

    function getNews(req, res) {
        var newsId = req.params.newsId;
        model.getNewsContent(newsId).then(function(news){
            console.log(news);
            res.json(news);
        });
    }
};
