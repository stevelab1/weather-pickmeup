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
      console.log(lat);
      var lon = data.results[0].longitude;
      // Get weather data for city
      var queryURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_120m,relativehumidity_2m,windspeed_10m&windspeed_unit=mph`;

console.log(queryURL);
      fetch(queryURL)
        .then((response) => response.json())
        .then((data) => {
          var currentTemp = Math.round(data.hourly.temperature_120m[0]);
          var currentHumidity = data.hourly.relativehumidity_2m[0];
          console.log(currentHumidity);

          var currentWindSpeed = data.hourly.windspeed_10m[0];
          // Display current weather on index.html
          function displayCurrentWeather() {
            $("#city-name-display").text(city);
            $("#temperature").text(currentTemp);
            $("#humidity").text(currentHumidity);
            $("#wind-speed").text(currentWindSpeed);
          }
          displayCurrentWeather();
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
  