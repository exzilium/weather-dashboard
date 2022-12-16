let now = dayjs().format("M/D/YYYY");
console.log(now);

// Search for City event listener to get user value
$("#searchForm").submit(function () {
  event.preventDefault();
  const userInput = $("#searchFormInput").val();
  console.log(userInput);
  geoCoding(userInput);
  clearForm();
});

// Geocoding to get lat/long from city name
function geoCoding(searchInput) {
  const geoCodingURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    searchInput +
    "&limit=1&appid=1818fcd056aa18519062741f9933b26b";

  fetch(geoCodingURL)
    .then((response) => response.json())
    .then(function (data) {
      // lat and lon for Current Weather API
      // TO DO - You can make this into one geoCoding Obj with each thing as a property
      const lat = data[0].lat;
      const lon = data[0].lon;
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
      // Variable for Current Weather API URL

      const currentWeatherURL =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=1818fcd056aa18519062741f9933b26b";
      // Fetch for Current Weather
      fetch(currentWeatherURL)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
          // TO DO create and pass necessary variables into jquery create/set/append
        });
    });
}

// Function to clear any form text after entry
function clearForm() {
  // Search for a city input
  $("#searchFormInput").val("");
}
