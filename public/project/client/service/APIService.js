"use strict";
(function () {
    angular.module("SoccerApp").factory("APIService", APIService);

    function APIService($q,$http) {
        var service = {
            getTableContent: getTableContent,
            getFixtureDetails: getFixtureDetails,
            getRecentNews: getRecentNews,
            refineNews: refineNews
        }



        function getFixtureDetails(leagueId, callback) {
            var uri = 'http://api.football-data.org/alpha/soccerseasons/' + leagueId + '/fixtures';
            $.ajax({
                headers: { 'X-Auth-Token': '0918793d32054063ac52204e3d81735f' },
                url: uri,
                dataType: 'json',
                type: 'GET',
                success: returnJsonObject
            })

            function returnJsonObject(data) {
                return callback(data);
            }
        }
        
        function getTableContent(leagueId, callback) {
            var uri = 'http://api.football-data.org/alpha/soccerseasons/' + leagueId + '/leagueTable';
            console.log(uri);
            $.ajax({
                headers: { 'X-Auth-Token': '0918793d32054063ac52204e3d81735f' },
                url: uri,
                dataType: 'json',
                type: 'GET',
                success: returnJsonObject
            })
            
            function returnJsonObject(data) {
                return callback(data);
            }
        }

        /*function searchComplete() {

            // Check that we got results
            //document.getElementById('content').innerHTML = '';

            if (newsSearch.results && newsSearch.results.length > 0) {
                console.log(newsSearch);
                return newsSearch.results;
                /!*for (var i = 0; i < newsSearch.results.length; i++) {

                    // Create HTML elements for search results
                    var p = document.createElement('p');
                    var p1 = document.createElement('p');
                    var a = document.createElement('a');
                    a.href= newsSearch.results[i].unescapedUrl;
                    a.innerHTML = newsSearch.results[i].title;
                    p1.innerHTML = newsSearch.results[i].content;

                    // Append search results to the HTML nodes
                    p.appendChild(a);
                    //p1.appendChild(newsSearch.results[i].title);
                    document.body.appendChild(p);
                    document.body.appendChild(p1);
                }*!/
            }
        }*/



        function getRecentNews() {
            /*google.load('search', '1');

            var newsSearch;

            var defer = $q.defer();

            newsSearch = new google.search.NewsSearch();

            newsSearch.setSearchCompleteCallback(this, searchComplete, null);

            newsSearch.execute('Manchester United');

            if (newsSearch.results && newsSearch.results.length > 0) {
                console.log(newsSearch);
                defer.resolve(newsSearch.results);
            }

            return defer.promise;*/



            /*var defer = $q.defer();
            var url = "https://webhose.io/search?token=e0fa214c-ad96-4b77-9229-b2ee6337fbb5&format=json" +
                "&q=football&site=espnfc.com&ts=1448656623749";
            console.log(url);
            $http.get(url).success(function(response){
                console.log(response);
                defer.resolve(response);
            });
            return defer.promise;*/
            var defer = $q.defer();
            $.ajax({
                url: 'https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=Manchester%20United',
                dataType: 'jsonp',
                success: function (data) {
                    defer.resolve(data);
                }
            });
            return defer.promise;
        }

        function refineNews(url) {
            /*var defer = $q.defer();
             var uri = "http://www.diffbot.com/testdrive/?api=analyze&token=dca05365819414bb472b23e8b35f0e32&url="
             + url + "&callback";
             console.log(uri);
             $http.get(uri).success(function(response){
             console.log(response);
             defer.resolve(response);
             });
             return defer.promise;*/
            var defer = $q.defer();
            var diffBot = new DiffBot("dca05365819414bb472b23e8b35f0e32");
            diffBot.analyze.get({
                url: url
            }, function (response) {
                console.log(response);
                defer.resolve(response);
            });
            return defer.promise;
        }

        return service;
    }
})();