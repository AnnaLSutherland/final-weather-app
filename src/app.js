function displayTemperature(response) {
  console.log(response.data);
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
}

let key = `d36aa0424f0b7a4te0a504eba4fo6786`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Aberdeen&key=${key}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
