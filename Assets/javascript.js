$(document).submit(function () {
var searchCity = $("#city").val();
  event.preventDefault();
  init();
  console.log(searchCity);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=c3bf6fbdffae94cb7b006f03464d0b1d";
    var forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=a7aba1d83fecabd92ceeae64cf8f67a1";

// Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    var icon = response.weather[0].icon;
    var cityName = response.name;
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=a7aba1d83fecabd92ceeae64cf8f67a1&lat=" + lat + "&lon=" + lon;

    var weatherResults = $(".weather-results");
    var title = $("<h2>").addClass(".card-title").text(cityName + Date().toString())
    weatherResults.append(title);
    weatherResults.append(temp);
    weatherResults.append(humidity);
    weatherResults.append(windSpeed);





    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var uvIndex = response.value;





      // code results
    })
  })

  $.ajax({
    url: forecast,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  })


function init() {
  innerHTML="";
}












});