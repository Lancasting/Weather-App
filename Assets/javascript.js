init();
function init() {
  loadCities();
}

function loadCities () {
  cityList = JSON.parse(localStorage.getItem("city-search")) || [];
  
  $(".history").append(cityList);
}



$(document).submit(function () {
  event.preventDefault();
  let searchCity = $("#city").val();
  $(".history").on('click', "li", function() {
    mainWeather($(this).text());
    })
  $("button").click(function () {
    $(".weather-results").empty();
  });
  
   // citylist
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=c3bf6fbdffae94cb7b006f03464d0b1d";
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
    let dayIcon = response.weather[0].icon;
    let cityName = response.name;
    saveCity(cityName);
    let uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=a7aba1d83fecabd92ceeae64cf8f67a1&lat=" + lat + "&lon=" + lon;
    
    let weatherResults = $(".weather-results");

    let title = $("<h2>").addClass(".card-title").text(cityName + Date().toString() + dayIcon);
    weatherResults.append(title);
    let savedCity = cityName;
    let temp = $("<h6>").addClass(".card-subtitle temp-results").text("Temperature: " + dayTemp.toString().trim() + " Degrees");
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
      let uvIndex = $("<h6>").addClass(".card-subtitle index-results").text("UV Index: " + dayUvIndex);
      weatherResults.append(uvIndex);
      setUVcolor(dayUvIndex);
    });
  });
  
  function forecast(lat, lon) {
  let forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=a7aba1d83fecabd92ceeae64cf8f67a1";
  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function (forecastResponse) {
      for (let i = 1; i < 6; i++) {
        console.log(forecastResponse);
 
          let fiveTemp = $("<p>").addClass(".card-subtitle").text(forecastResponse.daily[i].temp.day);
          var body = $('<div>').addClass("card-body five-day")
          var img = $("<img>").attr("src",)
          var title = $('<h5>').addClass('card-title').text( "Temp: " + forecastResponse.daily[i].dt_txt).toString();
          let fiveHumidity = $("<h6>").addClass(".card-subtitle").text("Humidity: " + forecastResponse.daily[i].humidity.toString() + "%");
          $(".forecast").append(body.append(title, img, fiveTemp, fiveHumidity));
      }
  });
}

  function saveCity(cityName) {
    localStorage.setItem("city-search", JSON.stringify(cityName))
    if(cityList === null) {
      cityList = [];
  }
  }

  function setUVcolor(uvIndexNumber) {
    uvIndexNumber = parseInt(uvIndexNumber);
    if (uvIndexNumber >= 2) {
      $(".index-results").attr("class", "low");
    }
    else if (uvIndexNumber < 2 && uvIndexNumber >= 7) {
      $(".index-results").attr("class", "moderate");
    }
    else if (uvIndexNumber < 7) {
      $(".index-results").attr("class", "high");
    }
  }
});