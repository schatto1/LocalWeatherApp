const debug = false;
var currentTempCelsius = true;
var currentTemp = 0;
var tempMax = 0;
var tempMin = 0;
var currentLocation = "Unknown";
var weatherText = "Unknown"

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var currentLatitude = position.coords.latitude;
    var currentLongitude = position.coords.longitude;

    getWeather(currentLatitude, currentLongitude);
  });
}

function check(statement) {
  if (debug == true) {
    console.log(statement);
  }
}

function getWeather(currentLat, currentLong) {
  var requestURL = 'https://fcc-weather-api.glitch.me/api/current?lon='+ currentLong + '&lat=' + currentLat;
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var currentWeather = request.response;

    currentLocation = currentWeather.name + ", " + currentWeather.sys.country;
    weatherText = currentWeather.weather[0].main;
    var weatherIcon = currentWeather.weather[0].icon;
    currentTemp = Math.round(currentWeather.main.temp * 10) / 10;
    tempMax = currentWeather.main.temp_max;
    tempMin = currentWeather.main.temp_min;

    //Change background image depending on weather
    switch (weatherText) {
      case "Clear":
        var bgImage = "https://images.unsplash.com/photo-1516443732782-08e6a3a90321?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f893db9691550a40652da0dcb62dbc11&auto=format&fit=crop&w=1535&q=80";
        break;
      case "Clouds":
        var bgImage = "https://images.unsplash.com/photo-1488226941561-6d7a806ae42a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5f95cc79495c602f06dd3ba6b8219ed0&auto=format&fit=crop&w=1350&q=80";
        break;
      case "Rain":
        var bgImage = "https://images.unsplash.com/uploads/141303982983610cf583b/8d142a41?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f56258171b41c3577a6c06fc91b6c654&auto=format&fit=crop&w=1334&q=80";
        break;
      case "Snow":
        var bgImage = "https://images.unsplash.com/photo-1513115044-a6f1731b8175?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=47d0d2a2772768c0a73ba4a87ab5b015&auto=format&fit=crop&w=1534&q=80";
        break;
      default:
        var bgimage = "";
    }
    $("body").css({"background": "url(" + bgImage + ") no-repeat top center fixed"});

    
    // Show current location on webpage
    $(".locationSection").html(currentLocation);

    // Show current weather and icon in webpage
    $(".weatherSection").html(weatherText);
    $(".weatherImage").attr('src', weatherIcon);

    // Show temperatures on webpage
    $(".tempSection").html(currentTemp);
    $(".weatherMode").html("&#8451;")
    $(".minTemp").html(tempMin);
    $(".maxTemp").html(tempMax);

    // Allow user to tweet weather
    $("#tweetWeather").attr('href', 'https://twitter.com/intent/tweet?hashtags=weather,freeCodeCamp&related=freeCodeCamp&text=The current weather in ' + currentLocation + ' is ' + weatherText + ', at ' + currentTemp + 'C');

    check(currentWeather);
    check(currentWeather.main.temp);
  }
}

function convertTemp(currentTemp) {
  if (currentTempCelsius) {
    // Convert temperature to Fahrenheit and return
    return Math.round((currentTemp * (9 / 5) + 32)*10) / 10;
  } else {
    // Convert temperature to Celsius and return
    return Math.round(((currentTemp - 32) * (5 / 9))*10) / 10;
  }
}

function switchTempMode() {
  // Convert temperature values
  currentTemp = convertTemp(currentTemp);
  tempMax = convertTemp(tempMax);
  tempMin = convertTemp(tempMin);

  // Change temperature on display
  $(".tempSection").html(currentTemp);
  $(".minTemp").html(tempMin);
  $(".maxTemp").html(tempMax);

  // Choose which symbol to use
  if (currentTempCelsius) {
    // Converted to Fahrenheit, so use F symbol
    $(".weatherMode").html("&#8457;");
    var weatherModeString = "F";
  } else {
    $(".weatherMode").html("&#8451;");
    var weatherModeString = "C";
  }

  //Make sure system knows conversion occured
  currentTempCelsius = !currentTempCelsius;

  $(".tempAnimation").fadeIn('slow');
  $("#tweetWeather").attr('href', 'https://twitter.com/intent/tweet?hashtags=weather,freeCodeCamp&related=freeCodeCamp&text=The current weather in ' + currentLocation + ' is ' + weatherText + ', at ' + currentTemp + weatherModeString);
}

$(document).ready(function() {
  $("#changeMode").on("click", function() {
    $(".tempAnimation").fadeOut('slow', function() {
      switchTempMode();
    });
  });
});