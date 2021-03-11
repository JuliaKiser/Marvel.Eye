// document.addEventListener("DOMContentLoaded", displayMarvelInfo)
// var apiKey = '0ef9234995d516e83ebba70728cb9bb2';
// var pKey = 'ad29053b8d8b8603128abba1779970d734ec4cb8'

// function displayMarvelInfo(event){
//     var number = event.timestamp
//     var req = XMLHttpRequest();
//     var website = 'http://gateway.marvel.com/v1/public/characters?name='
//     var name =document.getElementById('heroName').value;
//     var web = website + name + "ts=" + number + '&apikey=' + apiKey + '&hash=' + pKey;

//     document.getElementById('submit').addEventListener('click', function (event) {
//     document.getElementById('heroName').textContent = "";
//     document.getElementById('description').textContent = "";
//     });
//     req.open('GET', web, true);

//     req.setRequestHeader('Content-Type', 'application/json');
//     req.addEventListener('load',function(){
//         if(req.status >= 200 && req.status < 400){
//             var result = JSON.parse(req.responseText);
//             document.getElementById('name').textContent = result.name;
//             document.getElementById('description').textContent = result.description;
//         }

//         event.preventDefault();
//     });
//     req.send(null);
// }
    

// 

// trying to get a function to display a picture when option is selected
// function setHero(){
//     var img =document.getElementById("Wonder Woman");
//     img.src =this.value;
//     return false;
// }
// document.getElementById("characters").replace(".image-placeholder");

// $(document).ready(function() {
//     $('#characters').on('change', function() {
//         if ([ 'Wonder Woman', 'Captain America' ].indexOf(this.value) > -1)
//         {
//             $("./Images/wonder-woman.jpg").show()
//         }
//         else 
//         {
//             $("./Images/wonder-woman.jpg").hide();
//         }
//     })
//     .change();
// });

// https://www.youtube.com/yt/dev/api-resources.html
// AIzaSyDOYsiDFdX1sy4JHyCuUeOf8oTDcvG4Jfk
// https://developer.marvel.com/
// Marvel Public Key - 0ef9234995d516e83ebba70728cb9bb2
// developer.marvel.com
// document.addEventListener("DOMContentLoaded", bindButtons)


$(document).ready(function() {
    $("#marvel-form").hide();
    $(".select-features").click(function() {
      $("#marvel-form").toggle();
    });
  });

var apiKey = '0ef9234995d516e83ebba70728cb9bb2';
var pKey = 'ad29053b8d8b8603128abba1779970d734ec4cb8'
var currentDate = new Date();


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