// Shannon - Script for geolocation button
var latitude = '';
var longitude = '';

  // Get a reference to the button and the city name container
  const geoButton = document.getElementById('fetch-location-button');
  const cityNameContainer = document.getElementById('city-name');

  // Add an event listener to the button that will execute the code inside the function when the button is clicked
  geoButton.addEventListener('click', () => {
    // Check if the browser supports the geolocation API
    if ('geolocation' in navigator) {
        // Get the user's location
        navigator.geolocation.getCurrentPosition((position) => {
          // Log the user's latitude and longitude to the console
          
          console.log(`Latitude: ${position.coords.latitude}`);
          latitude = position.coords.latitude
          console.log(`Longitude: ${position.coords.longitude}`);
          longitude = position.coords.longitude;
          // OPEN-METEO API queryURL
          var queryURL = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_hours&current_weather=true&timezone=auto'
      console.log(queryURL);
        });
      } 
    });

    

// STEPHEN's Code
const API_KEY = YOUR_API_KEY; // register for a free key at openweathermap.com

// Assign HTML Elements to variables
var searchBtn = document.querySelector("#search-button");
var userInput = document.querySelector("#user-search-input");
var recentSearch = document.querySelector("#recent-search");

// Get recent searches from local storage
var cityArrStored = JSON.parse(localStorage.getItem("cities")) || [];

// Last city stored OR London
var city =
  cityArrStored[cityArrStored.length > 0 ? cityArrStored.length - 1 : null] ||
  "London";

// Search city's weather, geo lat and longitude based on user input
// Save the recent search
function search() {
  // Process user input for city
  var cityInput = userInput.value.trim().toLowerCase();
  city = toTitleCase(cityInput);

  searchCity(city, API_KEY); // searchCity() called with city and API_KEY parameters
  getCityGeo(city, API_KEY); // ibid for city's geo latitudes & longitudes
  saveRecentSearch(city); // save cleaned up city input to local storage & display under the searchBtn
}

// Add search() as the event listener for both the click event of the searchBtn element and the keyup event of the userInput element
searchBtn.addEventListener("click", search);
userInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    search();
  }
});

function searchCity(city, API_KEY) {
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // var cityName = data.name;
      var currentTemp = Math.round(data.main.temp);
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
}

// Get city geodata — latitude & longitude
function getCityGeo(city, API_KEY) {
  var cityGeoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

  fetch(cityGeoCodeURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat.toFixed(2);
      var lon = data[0].lon.toFixed(2);
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

    buildSearchButtons();
  }
  // Save to local storage
  localStorage.setItem("cities", JSON.stringify(cityArrStored));
}

function toTitleCase(city) {
  var cityArr = city.toLowerCase().split(" ");

  for (var i = 0; i < cityArr.length; i++) {
    cityArr[i] = cityArr[i].charAt(0).toUpperCase() + cityArr[i].slice(1);
  }
  return cityArr.join(" ");
}

function buildSearchButtons() {
  recentSearch.innerHTML = "";
  for (var i = 0; i < cityArrStored.length; i++) {
    var buttonEl = document.createElement("button");
    buttonEl.textContent = cityArrStored[i];
    buttonEl.setAttribute("class", "searched-city-btn btn btn-secondary m-1");
    recentSearch.appendChild(buttonEl);
    // Make clickable
    buttonEl.addEventListener("click", function (e) {
      e.stopPropagation;
      var buttonText = e.target.textContent;
      searchCity(buttonText, API_KEY);
      getCityGeo(buttonText, API_KEY);
      saveRecentSearch(buttonText);
    });
  }
}

// Display current date & time (jQuery, Moment JS)
function displayTime() {
  $("#current-date").text(moment().format("dddd, MMMM Do, YYYY"));
  $("#current-time").text(moment().format("h:mm:ss A"));
}
setInterval(displayTime, 1000);

buildSearchButtons();

// Display last searched city
searchCity(city, API_KEY);
getCityGeo(city, API_KEY);

