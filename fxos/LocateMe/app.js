if (navigator.mozApps) {
  var request = navigator.mozApps.getSelf();
  request.onsuccess = function() {
    if (!this.result) {
      request = navigator.mozApps.install(location.protocol + "//" + location.host + location.pathname + "manifest.webapp");
      request.onerror = function() {
        console.log("Install failed: " + this.error.name);
      };
    }
  };
} 
$(document).ready(function(){
		  $("#btnLocateMe").click(function(){
			findMyCurrentLocation();
		  });
});

function findMyCurrentLocation(){
	var geoService = navigator.geolocation;
	if (geoService) {
		navigator.geolocation.getCurrentPosition(showCurrentLocation,errorHandler);
	} else {
		$("#searchResults").html("Your Browser does not support GeoLocation.");
	}
}

function showCurrentLocation(position){
	$("#searchResults").html("Your location details --> Current Latitude : " + position.coords.latitude + " , Longitude : " + position.coords.longitude);
}

function errorHandler(error){
	  $("#searchResults").html("Error while retrieving current position. Error code: " + error.code + ",Message: " + error.message);
}
