/**
 * Created by Govinda on 10/8/2015.
 */

(function () {
    $(init);

    function init() {
        var tbody = $("#container");
        var row = $("#row");
        var h3 = $("#matchday");
        
        $.ajax({
            headers: { 'X-Auth-Token': '0918793d32054063ac52204e3d81735f' },
            url: 'http://api.football-data.org/alpha/soccerseasons/402/leagueTable',
            dataType: 'json',
            type: 'GET',
            success: renderStandings
        })


        function renderStandings(table) {
            var md = "MatchDay " + table.matchday;
            console.log(md);
            $("#lt h3 #matchday").text(md);
            //console.log(h3.html);
            console.log(table);
            tbody.empty();
            var teams = table.standing;
            console.log(teams);
            for (var standing in teams) {
                var crest;
                var team = teams[standing];
                var teamURL = team._links.team.href;
                console.log(teamURL);
                $.ajax({
                    headers: { 'X-Auth-Token': '0918793d32054063ac52204e3d81735f' },
                    url: teamURL,
                    dataType: 'json',
                    async : false,
                    type: 'GET',
                    success: function (teamInfo) {
                        console.log(teamInfo);
                        crest = teamInfo.crestUrl;
                        console.log(teamInfo.crestUrl);
                    }
                })
                var gd = team.goalDifference;
                var gs = team.goals;
                var ga = team.goalsAgainst;
                var p = team.playedGames;
                var points = team.points;
                var pos = team.position;
                var tn = team.teamName;
                var tr = row.clone();
                tr.find(".pos").html(pos);
                tr.find(".team").html(tn);
                tr.find(".pts").html(points);
                tr.find(".p").html(p);
                tr.find(".gs").html(gs);
                tr.find(".ga").html(ga);
                tr.find(".gd").html(gd);
                tr.find(".crest").attr("src",crest);
                tbody.append(tr);
            }
        }

    }
})();
