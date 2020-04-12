$(document).submit(function () {
  var searchCity = $("#city").val();
  event.preventDefault();
  init();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=c3bf6fbdffae94cb7b006f03464d0b1d";
  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=a7aba1d83fecabd92ceeae64cf8f67a1";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var temp = (response.main.temp - 273.15) * 9 / 5 + 32;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    var icon = response.weather[0].icon;
    var cityName = response.name;
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=a7aba1d83fecabd92ceeae64cf8f67a1&lat=" + lat + "&lon=" + lon;


    var weatherResults = $(".weather-results");
    var title = $("<h2>").addClass(".card-title").text(cityName + Date().toString()+ icon)
    weatherResults.append(title);
    var temp = $("<h6>").addClass(".card-subtitle temp-results").text("Temperature: " + temp.toString().trim() + " Degrees");
    weatherResults.append(temp);
    var humidity = $("<h6>").addClass(".card-subtitle humidity-results").text("Humidity: " + humidity.toString() + "%");
    weatherResults.append(humidity);
    var windSpeed = $("<h6>").addClass("card-subtitle windspeed-results").text("Wind Speed: " + windSpeed.toString() + " MPH");
    weatherResults.append(windSpeed);


    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function (response) {
      var uvIndex = response.value;
      var uvIndex = $("<h6>").addClass(".card-subtitle index-results").text("UV Index: " + uvIndex.toString());
      weatherResults.append(uvIndex);
      setUVcolor();


      function setUVcolor() {
        var uvIndexNumber = uvIndex.parseInt()
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
  });

  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function (forecast) {
    function create5Day(); {
      $("5-day").empty();
      var weatherDays = forecast.daily;
      for(var i; i < 6; i++) {
        $()
      }
    }


   


    console.log(forecast);
  })



















  function init() {
    innerHTML = "";
  }

});