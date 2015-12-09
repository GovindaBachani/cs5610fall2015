"use strict";
(function () {
    angular.module("SoccerApp").factory("NewsService", NewsService);

    function NewsService($q, $http) {

        var service = {
            CreateNews: CreateNews,
            postComment: postComment,
            DeleteComment: DeleteComment,
            increaseLike: increaseLike,
            increaseDislike: increaseDislike,
            GetNews: GetNews
        };

        function GetNews(newsId) {
            var deferred = $q.defer();
            $http.get('/api/project/news/' + newsId).success(function (news) {
                deferred.resolve(news);
            });
            return deferred.promise;
        }

        function CreateNews(newsObj) {
            var deferred = $q.defer();
            $http.post('/api/project/news', newsObj).success(function (news) {
                deferred.resolve(news);
            });
            return deferred.promise;
        }

        function postComment(commentObj, newsId) {
            var deferred = $q.defer();
            var url = '/api/project/project/' + newsId;
            $http.post(url, commentObj).success(function (news) {
                deferred.resolve(news);
            });
            return deferred.promise;
        }

        function DeleteComment(commentId, NewsId) {
            var deferred = $q.defer();
            var url = '/api/project/news/' + NewsId + '/' + commentId;
            $http.delete(url).success(function (news) {
                deferred.resolve(news);
            });
            return deferred.promise;
        }

        function increaseLike(newsId, emailId) {
            var defer = $q.defer();
            var url = "/api/project/news/like/" + newsId + "/" + emailId;
            console.log(url);
            $http.post(url).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }

        function increaseDislike(newsId, emailId) {
            var defer = $q.defer();
            var url = "/api/project/news/dislike/" + newsId + "/" + emailId;
            console.log(url);
            $http.post(url).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }

        return service;
    }
})();