function refreshWeather(response) {

let temperatureElement = document.getElementById("weather-temperature");
temperatureElement.innerHTML = Math.round(response.data.temperature.current) + "°C";
let conditionElement = document.getElementById("weather-condition");
conditionElement.innerHTML = response.data.condition.description;
let iconElement = document.getElementById("icon");

iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`  
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
function displayForecast(response) {
  let forecastElement = document.getElementById("forecast");
  forecastElement.innerHTML = ""; 

  let hourlyForecast = response.data.daily[0].hourly;

  hourlyForecast.slice(0, 6).forEach(function (hour) {
    let time = formatHour(hour.time); // helper function
    let icon = hour.condition.icon_url;
    let temperature = Math.round(hour.temperature);

    forecastElement.innerHTML += `
      <div class="forecast-hour">
        <div class="forecast-time">${time}</div>
        <img src="${icon}" alt="" class="forecast-icon">
        <div class="forecast-temp">${temperature}°C</div>
      </div>
    `;
  });
}

function formatHour(timestamp) {
  let date = new Date(timestamp * 1000); // API returns seconds
  let hours = date.getHours();
  return `${hours}:00`;
}
