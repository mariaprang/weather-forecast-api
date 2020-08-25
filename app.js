let key = "95d9937015b54b2518d0aac091c12b71";

class WeatherInfo {
  constructor(date, city, icon, description, temp, feelslike, humidity, wind) {
    this.city = city;
    this.icon = icon;
    this.date = date;
    this.description = description;
    this.temp = temp;
    this.wind = wind;
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
      console.log(jsonObject);
      let dateToday = Date().substring(0, Date().indexOf("2020") + 4);
      var weatherArray = jsonObject.weather[0];
      var mainInfo = jsonObject.main;
      var windInfo = jsonObject.wind.speed;
      var feelsLike = jsonObject.main.feels_like;

      var weatherObject = new WeatherInfo(
        dateToday,
        jsonObject.name,
        weatherArray.icon,
        weatherArray.description,
        mainInfo.temp,
        feelsLike,
        mainInfo.humidity,
        windInfo
      );
      console.log(weatherObject);
      return displayInfo(weatherObject);
    }
  };
  request.send();
  return window.ext_str;
}

function displayInfo(info) {
  showAll();
  var wrapper = document.getElementById("main-info");
  var weatherIcon = document.getElementById("weather-icon");
  weatherIcon.src = info.getImageSrc();

  var dateToday = document.getElementById("date");
  dateToday.innerHTML = info.date;

  var temp = document.getElementById("temp-row");
  temp.innerHTML = info.temp;

  // var feelsLike = document.getElementById("feels-like-row");
  // feelsLike.innerHTML = "Feels like: " + info.feelsLike;

  var cityName = document.getElementById("city-name");
  cityName.innerHTML = info.city;

  document.getElementById("description-text").innerHTML = info.description;
  document.getElementById("humidity-text").innerHTML = info.humidity;
  document.getElementById("wind-text").innerHTML = info.wind;
  if (info.feelslike != undefined) {
    document.getElementById("feels-text").innerHTML =
      "Feels like: " + info.feelslike;
  } else {
    document.getElementById("feels-like-wrap").style.display = "none";
  }
}

function showAll() {
  document.getElementById("main-info").style.border = "2px solid white";
  document.getElementById("description-text").style.display = "flex";
  document.getElementById("feels-like-wrap").style.display = "flex";
  document.getElementById("humidity-wrap").style.display = "flex";
  document.getElementById("wind-wrap").style.display = "flex";
}
