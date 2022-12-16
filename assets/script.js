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
    });
}

// Function to clear any form text after entry
function clearForm() {
  // Search for a city input
  $("#searchFormInput").val("");
}
