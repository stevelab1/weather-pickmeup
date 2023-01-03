var API_KEY = "l6uqF7sCQPq99XoWHRKpST6mj2kZr5jK";

// Get GIF related to location
var queryLocation = "London";
var queryMood = "happy";

var searchQuery = trim(queryLocation) + trim(queryMood);

var goodWeather = [];
var badWeather = [];

//l6uqF7sCQPq99XoWHRKpST6mj2kZr5jK&q=London
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" + searchQuery + "&limit=1&offset=0&rating=g&lang=en";

fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var gif = data.url;
      var currentHumidity = data.main.humidity;
      var currentWindSpeed = data.wind.speed;
      var currentWeatherIcon = data.weather[0].icon;

      // Display current weather and icons on index.html
      function displayCurrentWeather() {
        $("#city-name-display").text(city);
        $("#temperature").text(currentTemp);
        $("#humidity").text(currentHumidity);
        $("#wind-speed").text(currentWindSpeed);
        var iconTemplate = ``;
        document.getElementById("weather-icon").innerHTML = "";
        iconTemplate = `<img src="https://openweathermap.org/img/wn/${currentWeatherIcon}.png" alt="weather-icon" id="current-weather-icon">`;
        document.getElementById("weather-icon").innerHTML += iconTemplate;
      }
      displayCurrentWeather();
    });