if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    $("#latitude").html("latitude: " + position.coords.latitude);
    $("#longitude").html("longitude: " + position.coords.longitude);
  });
}