var API_KEY = "l6uqF7sCQPq99XoWHRKpST6mj2kZr5jK";
var weatherClassification = "";

function getGIF() {
    // Get GIF related to location weather
    var queryGIFKeyword = weatherClassification.gifSuggestion.trim().toLowerCase();
    var searchQuery = queryGIFKeyword.trim(); // + "+weather"; // + queryMood.trim();

    console.log(searchQuery);

    // Putting query together with info collected from user input and location weather informed by the weather API
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" + searchQuery + "&limit=1&offset=0&rating=g&lang=en";

    console.log(queryURL);
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({url: queryURL, method: "GET"}).then(function (response) {
        // console.log(JSON.stringify(response));
        // Check if a gif was returned at all
        if (response.data.length > 0) { // Retrieving the URL for the gif
            var gifURL = response.data[0].images.downsized.url;
            appendGIF(gifURL);
        } else { // If no gif was found for the specified criteria, then just show a default gif
            var gifURL = "./assets/img/cat-hug.gif";
            appendGIF(gifURL);
        }
    });
}

function appendGIF(gifURL) { // Clear the div
    $("#suggested-gif").empty();
    // Creating an element to hold the gif
    var image = $("<img src=" + gifURL + ">");
    // Appending the image
    $("#suggested-gif").append(image);
}

// getGIF();
function checkWeather(weatherCode) {
    var weatherClass = {
        weatherDescription: "",
        gifSuggestion: ""
    };

    // WMO Weather interpretation codes (WW): https://open-meteo.com/en/docs#latitude=0&longitude=0&current_weather=true
    console.log(weatherCode);
    weatherCode = 65;
    // Code - Description

    switch (weatherCode) {
        // 0 - Clear sky
        case 0: 
            weatherClass.weatherDescription = "Clear sky";
            weatherClass.gifSuggestion = "cute+cat+sun"; //OK
            document.getElementById("wrapper-bg").style.backgroundImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
            break;
        // 1, 2, 3 - Mainly clear, partly cloudy, and overcast
        case 1: 
            weatherClass.weatherDescription = "Mainly clear";
            weatherClass.gifSuggestion = "puppy+aww"; //OK
            document.getElementById("wrapper-bg").style.backgroundImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
            break;
        case 2: 
            weatherClass.weatherDescription = "Partly cloudy";
            weatherClass.gifSuggestion = "sweater+weather"; //OK
            document.getElementById("wrapper-bg").style.backgroundImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
            break;
        case 3: 
            weatherClass.weatherDescription = "Overcast";
            weatherClass.gifSuggestion = "sweater+owl"; //OK
            document.getElementById("wrapper-bg").style.backgroundImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
            break;
        // 45, 48 - Fog and depositing rime fog
        case 45: case 48: 
            weatherClass.weatherDescription = "Fog";
            weatherClass.gifSuggestion = "headlight+cat"; //OK
            document.getElementById("wrapper-bg").style.backgroundImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
            break;
        // 51, 53, 55 - Drizzle: Light, moderate, and dense intensity
        case 51: case 53: case 55: 
            weatherClass.weatherDescription = "Drizzle";
            weatherClass.gifSuggestion = "drizzle+roker"; //OK
            document.getElementById("wrapper-bg").style.backgroundImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/drizzle.gif')";
            break;
        // 56, 57 - Freezing Drizzle: Light and dense intensity
        case 56: case 57:
            weatherClass.weatherDescription = "Freezing drizzle";
            weatherClass.gifSuggestion = "frozen-bubble";
            document.getElementById("wrapper-bg").style.backgroundImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/drizzle.gif')";
            break;
        // 61, 63, 65 - Rain: Slight, moderate and heavy intensity
        case 61: case 63:
            weatherClass.weatherDescription = "Rain";
            weatherClass.gifSuggestion = "raincoat"; //OK
            document.getElementById("wrapper-bg").style.backgroundImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
            break;
        case 65:
            weatherClass.weatherDescription = "Heavy rain";
            weatherClass.gifSuggestion = "raining-adventure-time"; //OK
            document.getElementById("wrapper-bg").style.backgroundImage = "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
            break;
        // 66, 67 - Freezing Rain: Light and heavy intensity
        case 66: case 67: 
            weatherClass.weatherDescription = "Freezing rain";
            weatherClass.gifSuggestion = "puppy";
            break;
        // 71, 73, 75 - Snow fall: Slight, moderate, and heavy intensity
        case 71:
            weatherClass.weatherDescription = "Partly cloudy";
            weatherClass.gifSuggestion = "puppy";
            break;
        case 73: 
            weatherClass.weatherDescription = "Partly cloudy";
            weatherClass.gifSuggestion = "puppy";
            break;
        case 75: 
            weatherClass.weatherDescription = "Overcast";
            weatherClass.gifSuggestion = "lightup";
            break;
        // 77 - Snow grains
        case 77: 
            weatherClass.weatherDescription = "Overcast";
            weatherClass.gifSuggestion = "lightup";
            break;
        // 80, 81, 82 - Rain showers: Slight, moderate, and violent
        case 75: 
            weatherClass.weatherDescription = "Overcast";
            weatherClass.gifSuggestion = "lightup";
            break;
        // 85, 86 - Snow showers slight and heavy
        // 95 - Thunderstorm: Slight or moderate
        // 96, 99 - Thunderstorm with slight and heavy hail
        default:
            weatherClass.weatherDescription = "Unknown weather code:" + weatherCode;
            weatherClass.gifSuggestion = "confused+John+Travolta";
            break;
    }
    weatherClassification = weatherClass;
    return weatherClassification.weatherDescription;
}
