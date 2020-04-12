$(document).submit(function () {
  let searchCity = $("#city").val();
  event.preventDefault();
  init();
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=c3bf6fbdffae94cb7b006f03464d0b1d";


  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    let lat = response.coord.lat;
    let lon = response.coord.lon;
    let dayTemp = (response.main.temp - 273.15) * 9 / 5 + 32;
    let dayHumidity = response.main.humidity;
    let dayWindSpeed = response.wind.speed;
    let dayIcon = response.weather[0].icon;
    let cityName = response.name;
    let uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=a7aba1d83fecabd92ceeae64cf8f67a1&lat=" + lat + "&lon=" + lon;
    let forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=a7aba1d83fecabd92ceeae64cf8f67a1";
    let weatherResults = $(".weather-results");

    let title = $("<h2>").addClass(".card-title").text(cityName + Date().toString() + dayIcon);
    weatherResults.append(title);
    let temp = $("<h6>").addClass(".card-subtitle temp-results").text("Temperature: " + dayTemp.toString().trim() + " Degrees");
    weatherResults.append(temp);
    let humidity = $("<h6>").addClass(".card-subtitle humidity-results").text("Humidity: " + dayHumidity.toString() + "%");
    weatherResults.append(humidity);
    let windSpeed = $("<h6>").addClass("card-subtitle windspeed-results").text("Wind Speed: " + dayWindSpeed.toString() + " MPH");
    weatherResults.append(windSpeed);

    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function (response) {
      let dayUvIndex = response.value;
      let uvIndex = $("<h6>").addClass(".card-subtitle index-results").text("UV Index: " + dayUvIndex);
      weatherResults.append(uvIndex);
      setUVcolor(dayUvIndex);

      $.ajax({
        url: forecastURL,
        method: "GET"
      }).then(function (forecast) {
        getForecast(forecast);
      });
    });
  });
  
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

  //Purpose is to create one card with the day passed down
  function forecastCards(forecast) {
    console.log(forecast);
   // let theDate = new Date(day.dt * 1000);
  //  theDate = moment(theDate).format("MM/DD/YYYY");
   // console.log(theDate)
    let dailyTemp = forecast.temp.day;
    let dailyHumidity = forecast.current.humidity;

    //Create container el for this day (FIRST DIV)
     let newCard = $("<card>").addClass("card-body");
      newCard.append("forecast");
        //append to the main div 
        //add class if needed

    //Create the header sdisplaying the day
    //  let fiveDate = $("<h3>").addClass("card-title").text(theDate).toString();
     // newContainer.append(fiveDate);
      //give it text
      //give it a class
      //append to the first div(CREATED DIV)

    //Create the img tag for the icon
      //Give it a source using the obj day
      //give it a class
      //apend to first first div(CREATED DIV)

    //create the tag for hhumidy
    let fiveHumidity = $("<h6>").addClass(".card-subtitle").text("Humidity: " + dailyHumidity.toString() + "%");
    newCared.append(fiveHumidity);
      //give it text
      //give it a class
      //append to the first div(CREATED DIV)
    let fiveTemp = $("h6").addClass(".card-subtitle").text(dailyTemp);
    newCard.append(fiveTemp);
    //tag for temp
      //give it text
      //give it a class
      //append to the first div(CREATED DIV)




      ///USE THIS TO HELP
    // fiveDay.append(fiveHumidity);
    
    // fiveDay.append(theDate).toString();
    // let iconFive = 
    // let dailyIcon = "http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png";
    // fiveDay.append(dailyIcon);
    // let dailyHumidity = day.humidity;
    
    // let fiveDay = $(".forecast");

  }

  function getForecast(forecast) {

    $("forecast").empty();
    let weatherDays = forecast.daily;
    let dailyTemp = forecast.current.temp;

    for (let i = 1; i < 6; i++) {
      forecastCards(weatherDays[i]);//grab one day and you're creating a card with that day
      //weatherDays[i].weather[0].icon
    }
  }
  function init() {
    innerHTML = "";
  }

});