/**
 * Created by Govinda on 12/1/2015.
 */
"use strict"

var http = require('http');
var requestify = require('requestify');



module.exports = function (app, teamModel) {

    app.get('/api/project/teams', function (req, res) {

        teamModel.FindAll().then(function (teams) {
            res.json(teams);
        });
    });

    app.get('/api/project/table/:id', getTable);
    app.get('/api/project/fixtures/:id', getFixtures);
    app.get('/api/project/team/:id', getTeamInfo)
    app.get('/api/project/:leagueid/teams', getAllTeams);

    app.post('/api/project/:leagueId', saveAllTeams);

    app.get('/api/project/:teamId', getTeamCrest);

    app.get('/api/project/league/:leagueId', getLeagueDetails);

    app.get('/api/project/teamFix/:teamId', function (req, res) {
        var teamId = req.param('teamId');
        var url = 'http://api.football-data.org/alpha/teams/' + teamId + '/fixtures';
        requestify.request(url, {
            method: 'GET',
            headers: { 'X-Auth-Token': '0c987cef968b4e5e827a9d2e3f88e9f3' }
        }).then(function (response) {
            res.json(response.getBody());
        });
    });

    app.get('/api/project/teamPlayers/:teamId', function (req, res) {
        var teamId = req.param('teamId');
        var url = 'http://api.football-data.org/alpha/teams/' + teamId + '/players';
        requestify.request(url, {
            method: 'GET',
            headers: { 'X-Auth-Token': '0c987cef968b4e5e827a9d2e3f88e9f3' }
        }).then(function (response) {
            res.json(response.getBody());
        });
    });



    function getLeagueDetails(req, res) {
        var leagueId = req.param('leagueId');
        var url = 'http://api.football-data.org/alpha/soccerseasons/' + leagueId;
        requestify.request(url, {
            method: 'GET',
            headers: { 'X-Auth-Token': '0c987cef968b4e5e827a9d2e3f88e9f3' }
        }).then(function (response) {
            res.json(response.getBody());
        });
    }

    function getTeamCrest(req, res) {
        var teamId = req.param("teamId");
        teamModel.FindByTeamUrl(teamId).then(function (team) {

            res.json(team);
        });
    }

    function saveAllTeams(req, res) {
        var leagueId = req.param('leagueId');
        var url = 'http://api.football-data.org/alpha/soccerseasons/' + leagueId + '/teams';
        requestify.request(url, {
            method: 'GET',
            headers: { 'X-Auth-Token': '0c987cef968b4e5e827a9d2e3f88e9f3' }
        }).then(function (response) {
            var teamsObj = response.getBody();
            var teams = teamsObj.teams;
            for (var i = 0 ; i < teams.length; i++) {
                teamModel.Create(teams[i]);
            }
            res.json(response.getBody());

        });
    }
    function getAllTeams(req, res) {

        var leagueId = req.param('leagueid');
        var url = 'http://api.football-data.org/alpha/soccerseasons/' + leagueId + '/teams';
        requestify.request(url, {
            method: 'GET',
            headers: { 'X-Auth-Token': '0c987cef968b4e5e827a9d2e3f88e9f3' }
        }).then(function (response) {
            // Get the response body (JSON parsed or jQuery object for XMLs)
            res.jsonp(response.getBody());
        });
    }

    function getFixtures(req, res) {
        var leagueID = req.param("id");
        var url = 'http://api.football-data.org/alpha/soccerseasons/' + leagueID + '/fixtures';
        requestify.request(url, {
            method: 'GET',
            headers: { 'X-Auth-Token': '0c987cef968b4e5e827a9d2e3f88e9f3' }
        }).then(function (response) {
            // Get the response body (JSON parsed or jQuery object for XMLs)
            res.jsonp(response.getBody());
        });
    }

    function getTable(req, res) {
        var leagueID = req.param("id");
        var url = 'http://api.football-data.org/alpha/soccerseasons/' + leagueID + '/leagueTable';
        requestify.request(url, {
            method: 'GET',
            headers: { 'X-Auth-Token': '0c987cef968b4e5e827a9d2e3f88e9f3' }
        }).then(function (response) {
            var standingsObj = response.getBody();
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