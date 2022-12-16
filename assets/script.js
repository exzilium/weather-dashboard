// Current day for initial page load and current weather conditions
let now = dayjs().format("M/D/YYYY");
console.log(now);

// City list local storage
let cityList = [];

// CLICK - Search for City event listener to get user value
$("#searchForm").submit(function () {
  event.preventDefault();
  const userInput = $("#searchFormInput").val();
  console.log(userInput);
  getWeather(userInput);
  storeCity(userInput);
  clearForm();
});

// Get weather function to:
// Fetch geocoding to get lat/lon from city name
// Then fetch current and five day weather conditions using lat/lon
function getWeather(searchInput) {
  // Fetch geocoding lat/lon data
  const geoCodingURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    searchInput +
    "&limit=1&appid=1818fcd056aa18519062741f9933b26b";
  fetch(geoCodingURL)
    .then((response) => response.json())
    .then(function (data) {
      // lat and lon for Current Weather API
      const lat = data[0].lat;
      const lon = data[0].lon;

      // TO DO - CHECK IF WE EVEN USE THESE, REMOVE IF NOT
      const cityName = data[0].name;
      const cityState = data[0].state;
      const cityCountry = data[0].country;
      console.log(
        "City: " +
          cityName +
          " State: " +
          cityState +
          " Country: " +
          cityCountry +
          " lat/lon: " +
          lat +
          "/" +
          lon
      );

      // Fetch Current Weather
      const currentWeatherURL =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=1818fcd056aa18519062741f9933b26b&units=imperial";
      fetch(currentWeatherURL)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);

          // Jquery to update HTML for current weather
          currentWeather(data);
        });

      // Fetch Five Day Weather
      const fiveDayWeatherURL =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=1818fcd056aa18519062741f9933b26b&units=imperial";
      fetch(fiveDayWeatherURL)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);

          // Jquery to update HTML for five day forecast
          fiveDay(data);
        });
    });
}

// Current weather conditions function
function currentWeather(data) {
  // Variables to set text
  const currentCity = data.name;
  const currentTemp = data.main.temp;
  const currentWind = data.wind.speed;
  const currentHumid = data.main.humidity;
  const currentIconCode = data.weather[0].icon;
  const currentIconURL =
    "http://openweathermap.org/img/wn/" + currentIconCode + "@2x.png";

  // Get and set city name, date, and icon
  $("#currentCity").text(currentCity);
  $("#currentDate").text(now);
  $("#currentIcon").attr("src", currentIconURL);
  $("#currentTemp").text(currentTemp + "°F");
  $("#currentWind").text(currentWind + "mph");
  $("#currentHumid").text(currentHumid + "%");
}

// Five Day Forecast function
function fiveDay(data) {
  // reset html
  $("#five-cont").html("");

  console.log(data);
  // 5 day forecast hard coded into index to pick 5 values from forecast data
  const fiveDayIndex = 5;
  for (i = 0; i < fiveDayIndex; i++) {
    // The Openweather 5 Day forecast gives 5 days of forecast data in 3 hour increments...
    // Choosing afternoon time to display most user-relevant weather conditions
    const afternoonIndex = i * 8 + 2;

    // variables to put into cards
    const fiveDate = data.list[afternoonIndex].dt_txt;
    const fiveIconCode = data.list[afternoonIndex].weather[0].icon;
    const fiveTemp = data.list[afternoonIndex].main.temp;
    const fiveWind = data.list[afternoonIndex].wind.speed;
    const fiveHumid = data.list[afternoonIndex].main.humidity;
    const fiveIconURL =
      "http://openweathermap.org/img/wn/" + fiveIconCode + ".png";

    console.log(data.list[afternoonIndex]);

    // create elements
    const newCard = `<div class="card border-info mb-3" style="max-width: 18rem">
      <div class="card-body">
        <h5 class="card-title">${fiveDate}</h5>
        <img src="${fiveIconURL}" alt="Weather icon">
        <p class="card-text">Temp: ${fiveTemp} °F</p>
        <p class="card-text">Wind: ${fiveWind}mph</p>
        <p class="card-text">Humidity: ${fiveHumid}%</p>
      </div>
    </div>`;
    // append to html
    $("#five-cont").append(newCard);
  }
}

// Function to clear any form text after entry
function clearForm() {
  // Search for a city input
  $("#searchFormInput").val("");
}

// Local storage setItem

function storeCity(userInput) {
  let cityList = cityList.unshift(userInput);
 JSON.stringify(localStorage.setItem("city", cityList));
  displayCity();
}

// Local storage getItem and display

function displayCity() {
  let cityList = JSON.parse(localStorage.getItem("city"));
  console.log(cityList);
  // for each create a button in the searched items list
}

// Initialize displayCity on page load
displayCity();
