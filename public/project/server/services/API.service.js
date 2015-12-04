/**
 * Created by Govinda on 12/1/2015.
 */
"use strict"

var http = require('http');
var requestify = require('requestify');



module.exports = function (app) {

    app.get('/api/project/table/:id', getTable);
    app.get('/api/project/fixtures/:id', getFixtures);
    app.get('/api/project/team/:id', getTeamInfo)

    function getFixtures(req, res) {
        var leagueID = req.param("id");
        var url = 'http://api.football-data.org/alpha/soccerseasons/' + leagueID + '/fixtures';
        requestify.request(url, {
            method: 'GET',
            headers: { 'X-Auth-Token': '0c987cef968b4e5e827a9d2e3f88e9f3' }
        }).then(function (response) {
            // Get the response body (JSON parsed or jQuery object for XMLs)
            res.jsonp(response.getBody());
        }
        );
    }

    function getTable(req, res) {
        var leagueID = req.param("id");
        var url = 'http://api.football-data.org/alpha/soccerseasons/' + leagueID + '/leagueTable';
        requestify.request(url, {
            method: 'GET',
            headers: { 'X-Auth-Token': '0c987cef968b4e5e827a9d2e3f88e9f3' }
        }).then(function (response) {
            var standingsObj = response.getBody();
            //console.log(standingsObj.standing);
            
            res.jsonp(standingsObj);
        });
    }

    function getTeamInfo(req, res) {
        var teamID = req.param("id");
        var url = 'http://api.football-data.org/alpha/teams/' + teamID;
        requestify.request(url, {
            method: 'GET',
            headers: { 'X-Auth-Token': '0c987cef968b4e5e827a9d2e3f88e9f3' }
        }).then(function (response) {
            res.jsonp(response.getBody());
        }
        );
    }
}