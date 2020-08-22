let key = "95d9937015b54b2518d0aac091c12b71";

class WeatherInfo {
  constructor(city, icon, description, temp, feelslike, humidity) {
    this.city = city;
    this.icon = icon;
    this.description = description;
    this.temp = temp;
    this.feelslike = feelslike;
    this.humidity = humidity;
  }

  getImageSrc() {
    return "http://openweathermap.org/img/wn/" + this.icon + "@2x.png";
  }
}

function getCityEnteredByUser() {
  var city = document.getElementById("city-field").value;
  document.getElementById("city-field").value = "";
  return city;
}

function getCityInfo() {
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    getCityEnteredByUser() +
    "&units=metric&appid=" +
    key;
  sendWeatherInfoRequest(url);
}

function sendWeatherInfoRequest(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = function () {
    var jsonObject = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      // let infoArray = jsonObject.weather[0].description+", "
      // + jsonObject.main.temp+", but feels like: "+jsonObject.main.feels_like;
      var weatherArray = jsonObject.weather[0];
      var mainInfo = jsonObject.main;
      var weatherObject = new WeatherInfo(
        jsonObject.name,
        weatherArray.icon,
        weatherArray.description,
        mainInfo.temp,
        mainInfo.feelslike,
        mainInfo.humidity
      );
      return displayInfo(weatherObject);
    }
  };
  request.send();
  return window.ext_str;
}

function displayInfo(info) {
  var wrapper = document.getElementById("main-info");
  var weatherIcon = document.getElementById("weather-icon");
  weatherIcon.src = info.getImageSrc();

  var temp = document.getElementById("temp-row");
  temp.innerHTML = "Temperature: " + info.temp;

  var feelsLike = document.getElementById("feels-like-row");
  feelsLike.innerHTML = "Feels like: " + info.feelsLike;
}
