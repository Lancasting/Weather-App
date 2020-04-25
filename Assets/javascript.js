let cityList = JSON.parse(localStorage.getItem("city-search"));
init();
function init() {
  loadCities();
}
function loadCities () {
  cityList = JSON.parse(localStorage.getItem("city-search"));
  $(".history").empty();
  if(cityList !== null) {
    for (let i = 0; i < cityList.length; i++) {
      let newCity = $("<li>").addClass("list-group-item btn btn-secondary").text(cityList[i]);
      // create button and add text city search to it then append
      // make sure that it's clickable
      $(".history").append(newCity);
      }
    }
}
if (cityList){
mainWeather(cityList[cityList.length - 1]);
}
$(".main-search").click(function () {
  event.preventDefault();
  let searchCity = $("#city").val();
  mainWeather(searchCity);
  $(".weather-results").empty();
  $(".forecast").empty();
});

$(".history").on('click', "li", function() {
  $(".weather-results").empty();
  $(".forecast").empty();
  mainWeather($(this).text());
  })

  function mainWeather(searchCity) {
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=9958a2ee61c39e3cb30389f464da2b0c";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    let lat = response.coord.lat;
    let lon = response.coord.lon;
    forecast(lat, lon);
    let dayTemp = (response.main.temp - 273.15) * 9 / 5 + 32;
    let dayHumidity = response.main.humidity;
    let dayWindSpeed = response.wind.speed;
    let dayIcon = $("<img>").attr("src","http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
    let cityName = response.name;
    saveCity(cityName);
    let uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=a7aba1d83fecabd92ceeae64cf8f67a1&lat=" + lat + "&lon=" + lon;
    
    let weatherResults = $(".weather-results");
    let d = new Date();
    let date = d.toLocaleDateString()


    let title = $("<h2>").addClass(".card-title").text(cityName + " " + date);
    weatherResults.append(title, dayIcon);
    let temp = $("<h6>").addClass(".card-subtitle temp-results").text("Temperature: " + dayTemp.toFixed(2).toString() + " Degrees");
    weatherResults.append(temp);
    let humidity = $("<h6>").addClass(".card-subtitle humidity-results").text("Humidity: " + dayHumidity.toString() + "%");
    weatherResults.append(humidity);
    let windSpeed = $("<h6>").addClass("card-subtitle windspeed-results").text("Wind Speed: " + dayWindSpeed.toString() + " MPH");
    weatherResults.append(windSpeed);
 
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function (UVresponse) {
      let dayUvIndex = UVresponse.value;
      let uvIndex = $("<h6>").addClass(".card-subtitle index-results").text("UV Index: ");
      let uvPara =  $("<p2>").text(dayUvIndex);
      uvIndex.append(uvPara);
      weatherResults.append(uvIndex);
      setUVcolor(dayUvIndex);
    });
  });
  }
  function forecast(lat, lon) {
  let forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=a7aba1d83fecabd92ceeae64cf8f67a1";
  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function (forecastResponse) {
      for (let i = 1; i < 6; i++) {
          let theDate = new Date(forecastResponse.daily[i].dt * 1000);
          theDate = moment(theDate).format("MM/DD/YYYY");
          let fTemp = (forecastResponse.daily[i].temp.day- 273.15) * 9 / 5 + 32;
          let body = $('<div>').addClass("card-body five-day")

          let fiveTemp = $("<p>").addClass(".card-subtitle").text("Temperature: " + fTemp.toFixed(2).toString() + " Degrees");
          let img = $("<img>").attr("src","http://openweathermap.org/img/wn/" + forecastResponse.daily[i].weather[0].icon + ".png");
          let fiveHumidity = $("<p>").addClass(".card-subtitle").text("Humidity: " + forecastResponse.daily[i].humidity.toString() + "%");
          $(".forecast").append(body.append(theDate, img, fiveTemp, fiveHumidity));
      }
  });
}

  function saveCity(cityName) {
  let cityList = [];
   let cityHistory = (JSON.parse(localStorage.getItem("city-search")));

   if (cityHistory !== null) {
    for (let i=0; i < cityHistory.length; i++) {
      cityList.push(cityHistory[i]);
    }
  }
    if (!cityList.includes(cityName)){
    cityList.push(cityName);
    }
    localStorage.setItem("city-search", JSON.stringify(cityList));
    loadCities();
  }

  function setUVcolor(uvPara) {
    let uvIndexNumber = parseInt(uvPara);
    if (uvIndexNumber <= 2) {
      $("p2").attr("class", "low");
    }
    else if (uvIndexNumber > 2 && uvIndexNumber <= 6) {
      $("p2").attr("class", "moderate");
    }
    else if (uvIndexNumber >= 7) {
      $("p2").attr("class", "high");
    }
  }
