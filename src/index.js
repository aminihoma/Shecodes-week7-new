//⏰Feature #1
let now = new Date();
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
let pastTime = document.querySelector("#time");
pastTime.innerHTML = `${currentDay}, ${currentTime},`;

//🕵️‍♀️Feature #2

function showTemperature(response) {
  let cityName = response.data.name;
  let cityTemperature = Math.round(response.data.main.temp);
  console.log(response);
  console.log(`description is ${response.data.weather[0].description}`);
  console.log(`windspeed is ${response.data.wind.speed}`);
  console.log(`humidity is ${response.data.main.humidity}%`);
  console.log(`city ${cityName}`);
  console.log(`temperature ${cityTemperature}`);
  let constantCity = document.querySelector("#city");
  constantCity.innerHTML = cityName;
  let constantdegree = document.querySelector("#degree");
  constantdegree.innerHTML = cityTemperature;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  //let units = "metric";
  //let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
  //axios.get(apiUrl).then(showTemperature);
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
showCity("germany");

//🙀Bonus Feature
//let celsiusLink = document.querySelector("#celsius-degree");
//let fahrenheitLink = document.querySelector("#fahrenheit-degree");

//function converttoFahrenheit() {
//let constantdegree = document.querySelector("#degree");
//constantdegree.innerHTML = 73;

//let convertedDegree = Math.round(constantdegree.innerHTML * 1.8 + 32);
//constantdegree.innerHTML = convertedDegree;
//}
//function showCelsius() {
//let constantdegree = document.querySelector("#degree");
//constantdegree.innerHTML = 23;

//let convertedDegree = Math.round((constantdegree.innerHTML - 32) / 1.8);
//constantdegree.innerHTML = convertedDegree;
//}

//fahrenheitLink.addEventListener("click", converttoFahrenheit);
//celsiusLink.addEventListener("click", showCelsius);
