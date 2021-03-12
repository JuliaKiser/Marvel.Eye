$(document).ready(function() {
    $("#marvel-form").hide();
    $(".select-features").click(function() {
      $("#marvel-form").toggle();
    });

var apiKey = '0ef9234995d516e83ebba70728cb9bb2';
var pKey = 'ad29053b8d8b8603128abba1779970d734ec4cb8'
var currentDate = new Date();

function landingGiphy() {
    console.log("Inside giphy");
   //Pulls in data from giphy API
   var temp = localStorage.getItem("superHeroName");
    var key = 'ZI2FysP1xmhjFzMb9b5dRuERp9p158FQ';
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + temp + '&api_key=' + key;
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response) {
        console.log(response)

        //Adds image to landing page--replaces quote
        $("#thumbnail").append("<img src='" + response.data[0].images.original.url + "'/>")
        //$(".side-x").html(superHeroGiphy);

    })
}

landingGiphy();


$("#marvel-form").on("submit", function(event) {
    event.preventDefault();
    var inputVal = $("#heroName").val()
    console.log("hit", inputVal);
    var ts = new Date().getTime()
    var url = `http://gateway.marvel.com/v1/public/characters?name=${inputVal}&apikey=${apiKey}`
    
    $.getJSON(url, {
        ts: ts,
        hash: CryptoJS.MD5(ts + pKey + apiKey).toString()
    }).done(function(response) {
        console.log(response);

        //Gets superhero name from api
        var name = $("<div class='subtitle'>Marvel Superhero</div><p>Name: " + response.data.results[0].name + "</p>");
        $("#name").html(name);

        //Gets superhero description from api
        var description = $("<p>Description: " + response.data.results[0].description + "</p>");
        $("#description").html(description);

        //Attempt to pull up a thumbnail picture when search button is clicked.
        var thumbnail = $("<img src='" + response.data.results[0].thumbnail.path + "/>");
        console.log(thumbnail)
        $("#thumbnail").html(thumbnail);

    }).fail(function(err) {
        console.log(err);
    })

})

});

