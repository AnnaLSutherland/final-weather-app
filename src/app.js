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
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours > 12) {
    return `${day}, ${hours - 12}:${minutes} pm`;
  } else {
    if (hours >= 1 && hours < 12) {
      return `${day}, ${hours}:${minutes} am`;
    } else {
      return `${day}, 12:${minutes} am`;
    }
  }
}

// Forecast Date and Temperature

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
  ];
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
        `<div class="col-2 forecast-col">
      <div class="forecast-date">${formatForecastDate(
        forecastDay.time
      )}</div>
      <img src="icons/${
        forecastDay.condition.icon
      }.svg" alt="#" width="60px" />
      <div class="forecast-temp">
        <span class="forecast-temp-max">${Math.round(
          forecastDay.temperature.maximum
        )}°C</span>
        <span class="forecast-temp-min">${Math.round(
          forecastDay.temperature.minimum
        )}°C</span>
      </div>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = `d36aa0424f0b7a4te0a504eba4fo6786`;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
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
  getForecast(response.data.city);
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

// Convert to Fahrenheit/Celcius

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature =
    (celciusTemperature * 9) / 5 + 32;

  document.querySelector("#current-temperature").innerHTML =
    Math.round(fahrenheitTemperature);
  document.querySelector("#feels-like").innerHTML =
    Math.round(fahrenheitTemperature);

  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelciusTemperature(event) {
  event.preventDefault();

  document.querySelector("#current-temperature").innerHTML =
    Math.round(celciusTemperature);
  document.querySelector("#feels-like").innerHTML =
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
