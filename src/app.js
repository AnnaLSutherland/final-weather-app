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

function displayTemperature(response) {
  document.querySelector("#current-temperature").innerHTML =
    Math.round(response.data.temperature.current);
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

  axios.get(apiUrl).then(displayTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#city-input");
  search(searchedCity.value);
}

search("Aberdeen");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);
