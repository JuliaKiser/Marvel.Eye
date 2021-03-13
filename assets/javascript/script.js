
var superHeroName = "";

function landingGiphy() {
    console.log("Inside giphy");
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
        $(".side-x").html(superHeroGiphy);

    })
}

//when character is clicked, passes name to superHero var and calls landingGiphy();
$('#characters').on('change', function(e) {

    var dropdownValue = e.target.value;
    console.log(e.target.value)
    superHeroName=(dropdownValue);
    localStorage.setItem("superHeroName", superHeroName);

    landingGiphy();
})

$("#form").submit(function(e){
    e.preventDefault()
    location.href="./character-results.html?hero=" + superHeroName

})


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
    var url = `https://gateway.marvel.com/v1/public/characters?name=${inputVal}&apikey=${apiKey}`
    
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

var characterList = [
    {
        title: "Thanos",
        url: ("https://www.youtube.com/watch?v=TcMBFSGVi1c")
    },
    {
        title: "Captain America",
        url: ("https://www.youtube.com/watch?v=6y3oHJnfnjU")
    },
    {
        title: "Doctor Strange",
        url: ("https://www.youtube.com/watch?v=HSzx-zryEgM")
    },
    {
        title: "Black Panther",
        url: ("https://www.youtube.com/watch?v=xjDjIWPwcPU")
    },
    {
        title: "Hulk",
        url: ("https://www.youtube.com/watch?v=H3vQbMSVlDw")
    },
    {
        title: "Thor",
        url: ("https://www.youtube.com/watch?v=vJUDu40Z_RY")
    },
];
// added a pass value to search button/remove if dont need
function passValue() {
    var selectCharacter = document.getElementById("characters").value;
    localStorage.setItem("superHeroName", selectCharacter);
    return true;
  
}

$(".select-trailer").on("click", function(event) {
    event.preventDefault();
    var name = localStorage.getItem("superHeroName");
    console.log(name)
    if (name === "Thanos") {
        window.open(characterList[0].url, "_blank");
    } else if (name === "Captain America") {
        window.open(characterList[1].url, "_blank");
    }
    else if (name === "Doctor Strange") {
        window.open(characterList[2].url, "_blank");
    }
    else if (name === "Black Panther") {
        window.open(characterList[3].url, "_blank");
    }
    else if (name === "Hulk") {
        window.open(characterList[4].url, "_blank");
    }
    else if (name === "Thor") {
        window.open(characterList[5].url, "_blank");
    }
    else {

    }

});
