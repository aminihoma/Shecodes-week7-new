//⏰Feature #1
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  let minute = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = now.getDay();
  if (now.getMinutes() < 10) {
    minute = "0" + now.getMinutes();
  }
  if (now.getHours() < 10) {
    hour = "0" + now.getHours();
  }

  let currentDay = `${days[day]}`;
  let currentTime = `${hour}:${minute}`;
  return `${currentDay}, ${currentTime},`;
}

function capitalizeFirstletter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function getForecast(coordinates) {
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let units = "metric";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  let cityName = response.data.name;
  let cityTemperature = Math.round(response.data.main.temp);
  let constantCity = document.querySelector("#city");
  constantCity.innerHTML = cityName;
  let constantdegree = document.querySelector("#degree");
  constantdegree.innerHTML = cityTemperature;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = capitalizeFirstletter(
    response.data.weather[0].description
  );

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusdegree = cityTemperature;
  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  showCity(city);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getlocation() {
  let searchForm = document.querySelector("#search-form");
  searchForm.reset();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getlocation);

function showCity(defaultcity) {
  let units = "metric";
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultcity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let celsiusdegree = null;
showCity("Tehran");

let celsiusLink = document.querySelector("#celsius-degree");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-degree");
fahrenheitLink.addEventListener("click", converttoFahrenheit);

function converttoFahrenheit() {
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let constantdegree = document.querySelector("#degree");
  let convertedDegree = Math.round(celsiusdegree * 1.8 + 32);
  constantdegree.innerHTML = convertedDegree;
}
function showCelsius() {
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let constantdegree = document.querySelector("#degree");
  constantdegree.innerHTML = celsiusdegree;
}
function formatDay(timestamp) {
  date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="40"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}
console.log("Finish...");
