function refreshWeather(response) {
let temperatureElement = document.getElementById("weather-temperature");
temperatureElement.innerHTML = Math.round(response.data.temperature.current) + "°C";
}
function searchCity(city) {
    let apiKey = "a2de7ef8070coa3bdc8506t84be4831b";
     let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);

}
function handleSearchSubmit(event) {
    event.preventDefault(); 
    let cityInput = document.getElementById("city-input");
    let cityElement = document.getElementById("city");
    cityElement.innerHTML = cityInput.value;
    searchCity(cityInput.value);
}
let searchFormElement = document.getElementById("search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);