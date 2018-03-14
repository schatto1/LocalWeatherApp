if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var currentLatitude = position.coords.latitude;
    var currentLongitude = position.coords.longitude;

    getWeather(currentLatitude, currentLongitude);
  });
}

function getWeather(currentLat, currentLong) {
  var requestURL = 'https://fcc-weather-api.glitch.me/api/current?lon='+ currentLong + '&lat=' + currentLat;
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var currentWeather = request.response;

    var currentLocation = currentWeather.name + ", " + currentWeather.sys.country;
    var weatherText = currentWeather.weather[0].main;
    var weatherIcon = currentWeather.weather[0].icon;
    var currentTemp = Math.round(currentWeather.main.temp * 10) / 10 + ' &#8451;';
    var tempMax = currentWeather.main.temp_max;
    var tempMin = currentWeather.main.temp_min;

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
    $(".minTemp").html(tempMin);
    $(".maxTemp").html(tempMax);

    // Allow user to tweet weather
    $("#tweetWeather").attr('href', 'https://twitter.com/intent/tweet?hashtags=weather,freeCodeCamp&related=freeCodeCamp&text=The current weather in ' + currentLocation + ' is ' + weatherText + ', at ' + currentTemp + 'C');
  }
}