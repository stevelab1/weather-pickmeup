// STEPHEN's Code
// Assign HTML Elements to variables
var searchBtn = document.querySelector("#search-button");
var userInput = document.querySelector("#user-search-input");
var recentSearch = document.querySelector("#recent-search");

// Get recent searches from local storage
var cityArrStored = JSON.parse(localStorage.getItem("cities")) || [];

// Last city stored OR London
var city = cityArrStored[cityArrStored.length - 1] || "London";

// Search city's weather, geo lat and longitude based on user input
// Save the recent search
function search() {
  // Process user input for city
  var cityInput = userInput.value.trim().toLowerCase();
  city = toTitleCase(cityInput);

  searchCity(city); // searchCity() called with city parameter
  getCityGeo(city); // ibid for city's geo latitudes & longitudes
  saveRecentSearch(city); // save cleaned up city input to local storage & display under the searchBtn
}

// Add search() as the event listener for both the click event of the searchBtn element and the keyup event of the userInput element
searchBtn.addEventListener("click", search);
userInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    search();
  }
});

// Search city function
function searchCity(city) {
  // Get city geodata — latitude & longitude
  var cityGeoCodeURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
  console.log(cityGeoCodeURL);
  fetch(cityGeoCodeURL)
    .then((response) => response.json())
    .then((data) => {
      var lat = data.results[0].latitude;
      //console.log(lat);
      var lon = data.results[0].longitude;
      // Get weather data for city
      var queryURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,snow_depth,cloudcover,visibility,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m,temperature_80m,temperature_120m,temperature_180m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_hours&current_weather=true&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`;

      console.log(queryURL);
      fetch(queryURL)
        .then((response) => response.json())
        .then((data) => {
          var currentTemp = Math.round(data.hourly.temperature_120m[0]);
          var currentHumidity = data.hourly.relativehumidity_2m[0];
          var weatherCode = data.current_weather.weathercode;
          // console.log(currentHumidity);

          var currentWindSpeed = data.hourly.windspeed_10m[0];
          // Display current weather on index.html
          function displayCurrentWeather() {
            $("#city-name-display").text(city);
            $("#temperature").text(currentTemp);
            $("#humidity").text(currentHumidity);
            $("#wind-speed").text(currentWindSpeed);

            $("#temperature_2m").text(data.hourly.temperature_2m[0]);

            $("#relativehumidity_2m").text(data.hourly.relativehumidity_2m[0]);

            $("#apparent_temperature").text(
              data.hourly.apparent_temperature[0]
            );

            $("#precipitation").text(data.hourly.precipitation[0]);

            $("#snow_depth").text(data.hourly.snow_depth[0]);

            $("#cloudcover").text(data.hourly.cloudcover[0]);

            $("#visibility").text(data.hourly.visibility[0]);

            $("#windspeed_10m").text(data.hourly.windspeed_10m[0]);
            $("#windspeed_80m").text(data.hourly.windspeed_80m[0]);
            $("#windspeed_120m").text(data.hourly.windspeed_120m[0]);
            $("#windspeed_180m").text(data.hourly.windspeed_180m[0]);

            $("#winddirection_10m").text(data.hourly.winddirection_10m[0]);
            $("#winddirection_80m").text(data.hourly.winddirection_80m[0]);
            $("#winddirection_120m").text(data.hourly.winddirection_120m[0]);
            $("#winddirection_180m").text(data.hourly.winddirection_180m[0]);

            $("#windgusts_10m").text(data.hourly.windgusts_10m[0]);

            $("#temperature_80m").text(data.hourly.temperature_80m[0]);
            $("#temperature_120m").text(data.hourly.temperature_120m[0]);
            $("#temperature_180m").text(data.hourly.temperature_180m[0]);

            $("#temperature_2m_max").text(data.daily.temperature_2m_max[0]);
            $("#temperature_2m_min").text(data.daily.temperature_2m_min[0]);

            $("#sunrise").text((data.daily.sunrise[0]).slice(11));
            $("#sunset").text((data.daily.sunset[0]).slice(11));

            $("#precipitation_hours").text(data.daily.precipitation_hours[0]);

            //Check weather classification
            $("#weather-classification").text(checkWeather(weatherCode));
          }
          displayCurrentWeather();
          getGIF();
        });
    });
}

// Get city geodata — latitude & longitude
function getCityGeo(city) {
  var cityGeoCodeURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

  fetch(cityGeoCodeURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data.results[0].latitude;
      var lon = data.results[0].longitude;
    });
}

// Save searched inputs. Display under search form
function saveRecentSearch(city) {
  var cityTitleCase = toTitleCase(city);
  // User input check
  if (city === "") {
    alert("Please enter a location");
    return;
  }

  if (!cityArrStored.includes(cityTitleCase)) {
    cityArrStored.push(cityTitleCase);
    if (cityArrStored.length > 8) {
      cityArrStored.shift();
    }
  }

  localStorage.setItem("cities", JSON.stringify(cityArrStored));
  updateRecentSearch();
}

// Update recent search list
function updateRecentSearch() {
  recentSearch.innerHTML = "";
  cityArrStored.forEach(function (city) {
    var btn = document.createElement("button");
    btn.textContent = city;
    btn.classList.add("city-names");
    btn.addEventListener("click", function () {
      searchCity(city);
    });
    recentSearch.appendChild(btn);
  });
}

updateRecentSearch();

// Title case function for city name display
function toTitleCase(str) {
  return str.replace(/\b\w/g, function (txt) {
    return txt.toUpperCase();
  });
}
// ====== SHOW CUTE GIF FOR SELECTED DROPDOWN MENU ITEM ===== //

// for html: Feeling Down?
var dropdown = document.querySelector(".dropdown-menu");
var dropdownItems = dropdown.querySelectorAll(".dropdown-item");
var gifContainer = document.querySelector("#suggested-gif");
// Add an event listener to each dropdown item
dropdownItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    // Remove any existing GIFs from the gifContainer
    gifContainer.innerHTML = "";
    // Get the text of the dropdown item
    var moodText = event.target.textContent;

    // Use the Giphy API to search for a GIF based on the mood text
    var giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=rLk0z3YIH26Drsmd76tsP86a88T6amG2&q=eyebleach%20${moodText}&limit=20`;

    fetch(giphyUrl)
      .then((response) => response.json())
      .then((data) => {
        // Get the URL of the GIF
        console.log(data.data);
        var i = [Math.floor(Math.random() * 20)];
        var gifUrl = data.data[i].images.downsized_large.url;
        appendGIF(gifUrl);
      });
  });
});

// Button to clear local storage and reload page
const clearHistory = document.getElementById("clear-history-btn");
clearHistory.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
