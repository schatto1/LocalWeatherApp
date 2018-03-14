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
    var currentTemp = currentWeather.main.temp;
    var tempMax = currentWeather.main.temp_max;
    var tempMin = currentWeather.main.temp_min;

    
    // Show current location on webpage
    $(".locationSection").html(currentLocation);

    // Show current weather and icon in webpage
    $(".weatherSection").html(weatherText);
    $(".weatherImage").attr('src', weatherIcon);

    // Show temperatures on webpage
    $(".tempSection").html(currentTemp);
    $(".minTemp").html(tempMin);
    $(".maxTemp").html(tempMax);

    console.log(currentWeather);
  }
}