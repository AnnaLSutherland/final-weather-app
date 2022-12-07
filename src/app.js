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
}

let key = `d36aa0424f0b7a4te0a504eba4fo6786`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Aberdeen&key=${key}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
