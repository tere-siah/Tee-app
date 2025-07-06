function refreshWeather(response) {

let temperatureElement = document.getElementById("weather-temperature");
temperatureElement.innerHTML = Math.round(response.data.temperature.current) + "°C";
let conditionElement = document.getElementById("weather-condition");
conditionElement.innerHTML = response.data.condition.description;
let iconElement = document.getElementById("icon");
iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`  

getForecast(response.data.city);
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
function getForecast(city) {
    let apiKey = "a2de7ef8070coa3bdc8506t84be4831b";
     let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

}
function displayForecast(response) {
let forecastHtml = ""; 

  response.data.daily.forEach(function (day) {
    forecastHtml = 
    forecastHtml + 
    ` <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
         <div class="weather-forecast-icon">🌥</div>
         <div class="weather-forecast-temperatures"><strong>${Math.round(day.temperature.maximum)}</strong> ${Math.round(day.temperature.minimum)}</div>
       </div>
    `;
  });

  let forecastElement = document.getElementById("forecast");
forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.getElementById("search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

displayForecast();
