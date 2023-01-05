var API_KEY = "l6uqF7sCQPq99XoWHRKpST6mj2kZr5jK";
var weatherClassification = "";

function getGIF() {
    // Get GIF related to location weather

    // City informed by user
    var queryLocation = userInput.value.trim().toUpperCase();
    var queryWeather = weatherClassification.trim().toLowerCase();

    // var searchQuery = queryLocation + "+" + queryWeather.trim() + "+weather"; // + queryMood.trim();
    var searchQuery = queryWeather.trim() + "+weather"; // + queryMood.trim();

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
    // Code - Description
    switch (weatherCode) { 
        // 0 - Clear sky
        case 0: weatherClass.weatherDescription = "Clear sky";
            weatherClass.gifSuggestion = "sunny";
            break;
        // 1, 2, 3 - Mainly clear, partly cloudy, and overcast
        case 1: weatherClass.weatherDescription = "Mainly clear";
            weatherClass.gifSuggestion = "nice+day";
            break;
        case 2: weatherClass.weatherDescription = "Partly cloudy";
            weatherClass.gifSuggestion = "puppy";
            break;
        case 3: weatherClass.weatherDescription = "Overcast";
            weatherClass.gifSuggestion = "lightup";
            break;
        // 45, 48 - Fog and depositing rime fog
        // 51, 53, 55 - Drizzle: Light, moderate, and dense intensity
        // 56, 57 - Freezing Drizzle: Light and dense intensity
        // 61, 63, 65 - Rain: Slight, moderate and heavy intensity
        // 66, 67 - Freezing Rain: Light and heavy intensity
        // 71, 73, 75 - Snow fall: Slight, moderate, and heavy intensity
        // 77 - Snow grains
        // 80, 81, 82 - Rain showers: Slight, moderate, and violent
        // 85, 86 - Snow showers slight and heavy
        // 95 - Thunderstorm: Slight or moderate
        // 96, 99 - Thunderstorm with slight and heavy hail
        default:
            console.log("Unknown weather code:" + weatherCode);
    }
    weatherClassification = weatherClass.weatherDescription;
    return weatherClass;
}
