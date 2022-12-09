// Date

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursay",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${minutes}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

// Current Temperature

function displayWeather(response) {
  celciusTemperature = response.data.temperature.current;

  document.querySelector("#current-temperature").innerHTML =
    Math.round(celciusTemperature);
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.city},`;
  document.querySelector("#country").innerHTML =
    response.data.country;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector(`#wind-speed`).innerHTML =
    Math.round(response.data.wind.speed);
  document.querySelector(`#humidity`).innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#feels-like").innerHTML =
    Math.round(response.data.temperature.feels_like);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(
    response.data.time * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `icons/${response.data.condition.icon}.svg`
  );
  iconElement.setAttribute(
    "alt",
    response.data.condition.description
  );
}

function search(city) {
  let apiKey = `d36aa0424f0b7a4te0a504eba4fo6786`;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#city-input");
  search(searchedCity.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

// Search current location

function getLocation(position) {
  let apiEndpoint =
    "https://api.shecodes.io/weather/v1/current?";
  let lat = position.coordinates.latitude;
  let lon = position.coordinates.longitude;
  let apiKey = `d36aa0424f0b7a4te0a504eba4fo6786`;
  let units = "metric";

  let apiUrl = `${apiEndpoint}lat=${lat}&lon=-${lon}&key=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let locationButton = document.querySelector(
  "#current-location-button"
);
locationButton.addEventListener("click", getPosition);

// Convert to Fahrenheit/Celcius

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature =
    (celciusTemperature * 9) / 5 + 32;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(fahrenheitTemperature);
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celciusTemperature);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector(
  "#fahrenheit-link"
);
fahrenheitLink.addEventListener(
  "click",
  displayFahrenheitTemperature
);
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener(
  "click",
  displayCelciusTemperature
);

// Default Search (So the app isn't blank on load)

search("Aberdeen");
