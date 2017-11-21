// get current device location
var tempScale = document.querySelector('#temperatureScale');
var pressScale = document.querySelector('#pressureScale');
var url = 'https://fcc-weather-api.glitch.me/api/current?';
var request = new XMLHttpRequest();
var outerResponse;
var weatherData = document.querySelector('#weatherData');
var locationPara = document.createElement('p');
var tempPara = document.createElement('p');
var pressPara = document.createElement('p');
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
  tempPara.textContent = 'Temperature: ';
  pressPara.textContent = 'Pressure: ';
  if (tempScale.value === 'Celsius') {
    tempPara.textContent += response.main.temp + ' °C';
  } else {
    tempPara.textContent += ((response.main.temp * 9) / 5 + 32).toFixed() + ' °F';
  }
  if (pressScale.value === 'mm HG') {
    pressPara.textContent += (response.main.pressure * 0.75006375541921).toFixed() + ' mm HG';
  } else {
    pressPara.textContent += response.main.pressure + ' mb';
  }
  weatherIco.setAttribute('src', response.weather[0].icon);
  weatherData.appendChild(locationPara);
  weatherData.appendChild(tempPara);
  weatherData.appendChild(pressPara);
  weatherData.appendChild(weatherIco);
  tempScale.addEventListener('change', function () {
    showWeather(response);
  });
  pressScale.addEventListener('change', function () {
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


