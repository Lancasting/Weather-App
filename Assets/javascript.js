$(document).submit(function () {
var searchCity = $("#city").val();
  event.preventDefault();
  console.log(searchCity);
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=c3bf6fbdffae94cb7b006f03464d0b1d";
   // var forecast = "api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=a7aba1d83fecabd92ceeae64cf8f67a1";
// Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  })

});