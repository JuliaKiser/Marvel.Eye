
var superHeroName = ["thor"];

function landingGiphy() {
   //Pulls in data from giphy API
    var key = 'ZI2FysP1xmhjFzMb9b5dRuERp9p158FQ';
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + superHeroName + '&api_key=' + key;
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response) {
        console.log(response)

        //Adds image to landing page--replaces quote
        var superHeroGiphy = $("<img src='" + response.data[0].images.original.url + "' style='padding-left: 100px; padding-top:100px;'/>")
        $(".side-x").replaceWith(superHeroGiphy);

    })
}
landingGiphy();



