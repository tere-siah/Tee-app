function refreshWeather(response) {

let temperatureElement = document.getElementById("weather-temperature");
temperatureElement.innerHTML = Math.round(response.data.temperature.current) + "°C";
let conditionElement = document.getElementById("weather-condition");
conditionElement.innerHTML = response.data.condition.description;
let iconElement = document.getElementById("icon");
let iconUrl = response.data.condition.icon_url.replace("http://", "https://");
iconElement.innerHTML = `<img src="${iconUrl}" class="weather-app-icon" />`;
let humidityElement = document.getElementById("weather-humidity");
 humidityElement.innerHTML = `Humidity: <strong>${response.data.temperature.humidity}%</strong>`;
let windSpeedElement = document.getElementById("weather-wind-speed");
 windSpeedElement.innerHTML = `Wind Speed: <strong>${Math.round(response.data.wind.speed)} km/h</strong>`;
let timeElement = document.getElementById("time");
let date = new Date(response.data.time * 1000);
timeElement.innerHTML = formatDate(date);
   
}
function searchCity(city) {
    let apiKey = "a2de7ef8070coa3bdc8506t84be4831b";
     let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
    getForecast(city);
}
function handleSearchSubmit(event) {
    event.preventDefault(); 
    let cityInput = document.getElementById("city-input");
    let cityElement = document.getElementById("city");
    cityElement.innerHTML = cityInput.value;
    searchCity(cityInput.value);
}
function formatDay(event) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let date = new Date(event * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
if (minutes < 10) {
minutes = `0${minutes}`;}
  return days[date.getDay()];
}
function getForecast(city) {
    let apiKey = "a2de7ef8070coa3bdc8506t84be4831b";
     let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

}
function displayForecast(response) {
let forecastHtml = ""; 

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
    forecastHtml = 
    forecastHtml + 
    ` <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
         <div class="weather-forecast-icon">
         <img src="${day.condition.icon_url.replace("http://", "https://")}"/>
         </div>
         <div class="weather-forecast-temperatures"><strong>${Math.round(day.temperature.maximum)}</strong> ${Math.round(day.temperature.minimum)}</div>
       </div>
    `;
    }
  });

  let forecastElement = document.getElementById("forecast");
forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.getElementById("search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Nairobi");

