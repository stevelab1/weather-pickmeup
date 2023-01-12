var API_KEY = "l6uqF7sCQPq99XoWHRKpST6mj2kZr5jK";
var weatherClassification = "";

function getGIF() {
    // Get GIF related to location weather
    var queryGIFKeyword = weatherClassification.gifSuggestion.trim().toLowerCase();
    var searchQuery = queryGIFKeyword.trim();

    // Putting query together with info collected from user input and location weather informed by the weather API
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" + searchQuery + "&limit=1&offset=0&rating=g&lang=en";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({url: queryURL, method: "GET"}).then(function (response) {
        // Check if a gif was returned at all
        if (response.data.length > 0) { // Retrieving the URL for the gif
            var gifURL = response.data[0].images.downsized_large.url;
            appendGIF(gifURL);
        } else { // If no gif was found for the specified criteria, then just show a default gif
            var gifURL = "./assets/img/cat-hug.gif";
            appendGIF(gifURL);
        }
    });
}

function appendGIF(gifURL) { // Clear the div
    // Check the URL
    console.log(gifURL);
    $("#suggested-gif").empty();
    // Creating an element to hold the gif
    var image = $("<img id='gifID' src=" + gifURL + " >");
    // Appending the image
    $("#suggested-gif").append(image);

    //Fix image size so that regardless of gif size on origin they're all displayed consistently
    var theImg = document.getElementById('gifID');
    theImg.style.alignSelf = 'center';

    theImg.style.display = "cover";
    theImg.style.width = "20rem";
    theImg.style.height = "15.8rem";
}

function checkWeather(weatherCode) {
    var weatherClass = {
        weatherDescription: "",
        gifSuggestion: ""
    };

    var bgImage = "";

   // WMO Weather interpretation codes (WW): https://open-meteo.com/en/docs#latitude=0&longitude=0&current_weather=true
   // Code - Description
   switch (weatherCode) {
        // 0 - Clear sky
        case 0: 
            weatherClass.weatherDescription = "Clear sky";
            weatherClass.gifSuggestion = "cute+cat+sun"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
            break;
        // 1, 2, 3 - Mainly clear, partly cloudy, and overcast
        case 1: 
            weatherClass.weatherDescription = "Mainly clear";
            weatherClass.gifSuggestion = "puppy+aww"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
            break;
        case 2: 
            weatherClass.weatherDescription = "Partly cloudy";
            weatherClass.gifSuggestion = "sweater+weather"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
            break;
        case 3: 
            weatherClass.weatherDescription = "Overcast";
            weatherClass.gifSuggestion = "sweater+owl"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
            break;
        // 45, 48 - Fog and depositing rime fog
        case 45: case 48: 
            weatherClass.weatherDescription = "Fog";
            weatherClass.gifSuggestion = "headlight+cat"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
            break;
        // 51, 53, 55 - Drizzle: Light, moderate, and dense intensity
        case 51: case 53: case 55: 
            weatherClass.weatherDescription = "Drizzle";
            weatherClass.gifSuggestion = "drizzle+roker"; //OK
            bgImage = "url('./assets/img/drizzle.gif')";
            break;
        // 56, 57 - Freezing Drizzle: Light and dense intensity
        case 56: case 57:
            weatherClass.weatherDescription = "Freezing drizzle";
            weatherClass.gifSuggestion = "frozen-bubble"; //OK
            bgImage = "url('./assets/img/drizzle.gif')";
            break;
        // 61, 63, 65 - Rain: Slight, moderate and heavy intensity
        case 61: case 63:
            weatherClass.weatherDescription = "Rain";
            weatherClass.gifSuggestion = "raincoat"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
            break;
        case 65:
            weatherClass.weatherDescription = "Heavy rain";
            weatherClass.gifSuggestion = "raining-adventure-time"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
            break;
        // 66, 67 - Freezing Rain: Light and heavy intensity
        case 66: case 67: 
            weatherClass.weatherDescription = "Freezing rain";
            weatherClass.gifSuggestion = "hot+cocoa"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
            break;
        // 71, 73, 75 - Snow fall: Slight, moderate, and heavy intensity
        case 71: case 73: case 75: 
            weatherClass.weatherDescription = "Snowing";
            weatherClass.gifSuggestion = "winter+coffee+dayao"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
            break;
        // 77 - Snow grains
        case 77: 
            weatherClass.weatherDescription = "Snow grains";
            weatherClass.gifSuggestion = "rolling+tian"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
            break;
        // 80, 81, 82 - Rain showers: Slight, moderate, and violent
        case 80: case 81: case 82: 
            weatherClass.weatherDescription = "Rain showers";
            weatherClass.gifSuggestion = "summer+sun+shower"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
            break;
        // 85, 86 - Snow showers slight and heavy
        case 85: case 86: 
            weatherClass.weatherDescription = "Snow showers";
            weatherClass.gifSuggestion = "snowman+pudgy"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
            break;
        // 95 - Thunderstorm: Slight or moderate
        case 95: 
            weatherClass.weatherDescription = "Thunderstorm";
            weatherClass.gifSuggestion = "Stormy-Weather-family-guy"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
            break;
        // 96, 99 - Thunderstorm with slight and heavy hail
        case 96: case 99: 
            weatherClass.weatherDescription = "Thunderstorm with hail";
            weatherClass.gifSuggestion = "winter+shelter"; //OK
            bgImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
            break;        
        // default (none of the above)
        default:
            weatherClass.weatherDescription = "Unknown weather code: " + weatherCode;
            weatherClass.gifSuggestion = "confused+John+Travolta"; //OK
            bgImage = "url('./assets/img/weather-general.gif')";
            break;
    }
    document.getElementById("bg-image").style.backgroundImage = bgImage;
    document.getElementById("bg-title-gif").style.backgroundImage = bgImage;
    weatherClassification = weatherClass;
    return weatherClassification.weatherDescription;
}
