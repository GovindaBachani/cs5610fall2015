(function(){
    $(init);

    function init(){
        $("#searchMovie").click(searchMovie);
        var movieTitle = $("#title");
        var table = $("#results");
        var tbody = $("#container");
        var template = $("#template");

        function searchMovie(){
            var title = movieTitle.val();

            var url = "http://www.myapifilms.com/imdb?title="+title+"&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=3&forceYear=0&lang=en-us&actors=N&biography=0&trailer=1&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&adultSearch=0";

            console.log(url);

            $.ajax({
                url: url,
                dataType: "jsonp",
                success : renderMoviesWithTemplate
            })
        }

        function renderMoviesWithTemplate(movies){
            console.log(movies);
            tbody.empty();
            for(var m in movies) {
                var movie = movies[m];
                console.log(movie);
                var title = movie.title;
                var plot = movie.simplePlot;
                var urlPoster = movie.urlPoster;
                console.log(urlPoster);
                var imdbURL = movie.urlIMDB;
                var tr = template.clone();

                tr.find(".link").attr("href", imdbURL).html(title);
                tr.find(".plot").html(plot);
                tr.find(".imag").attr("src",urlPoster);
                tbody.append(tr);
            }


        }

        function renderMovies(movies){
            alert("HI");
            console.log(movies);
            tbody.empty();

            for(var m in movies){
                var movie = movies[m];
                console.log(movie);
                var title = movie.title;
                var plot = movie.simplePlot;
                var urlPoster = movie.urlPoster;
                var imdbURL = movie.urlIMDB;

                var tr = $("<tr>" );
                var titleTd = $("<a>").attr("href",imdbURL).html(title);
                var titleLink = $("<td>").append(titleTd);

                var titlePlot = $("<td>").append(plot);

                var titleImage = $("<img>").attr("src",urlPoster);

                var image  = $("<td>").append(titleImage);
                tr.append(titleTd);

                tr.append(titlePlot);

                tr.append(image)

                tbody.append(tr);
            }
        }
    }
})();