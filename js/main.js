// get current device location
var metrics = document.querySelector('select');
var url = 'https://fcc-weather-api.glitch.me/api/current?';
var request = new XMLHttpRequest();
var outerResponse;
var weatherData = document.querySelector('#weatherData');
var locationPara = document.createElement('p');
var tempPara = document.createElement('p');
var weatherIco = document.createElement('img');
var metricsSelection;

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0 //???
};

function showWeather(response) {
  console.log(response);
  outerResponse = response;
  locationPara.textContent = 'Your location is: ' + response.name + ', ' + response.sys.country;
  if (metrics.value === "Celsius") {
    tempPara.textContent = response.main.temp + ' °C';
  } else {
    tempPara.textContent = ((response.main.temp * 9) / 5 + 32).toFixed(2) + ' °F';
  }
  weatherIco.setAttribute('src', response.weather[0].icon);
  weatherData.appendChild(locationPara);
  weatherData.appendChild(tempPara);
  weatherData.appendChild(weatherIco);
  metrics.addEventListener('change', function () {
    showWeather(response);
  });
}

function getWeather(url) {
  request.open('GET', url);
  request.responseType = 'json';
  request.addEventListener('load', function () {showWeather(request.response); });
  request.send();
}

function success(position) {
  url += 'lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
  getWeather(url);
}

function error(e) {
  alert('Error, cant get current location: ' + e.code + ' ' + e.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);


