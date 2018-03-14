if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var currentLatitude = position.coords.latitude;
    var currentLongitude = position.coords.longitude;

    $("#latitude").html("latitude: " + currentLatitude);
    $("#longitude").html("longitude: " + currentLongitude);

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
    var weatherIcon = currentWeather.weather[0].icon;

    
    // Show current location on webpage
    $(".locationSection").html(currentLocation);

    // Show current weather icon in webpage
    $(".weatherSection").attr('src', weatherIcon);


    console.log(currentWeather);
  }
}