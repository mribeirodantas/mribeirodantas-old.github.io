$(document).ready(function(){
                  $("#btnPlantBomb").click(function(){
                        plantBomb();
                  });
                  $("#btnHowClose").click(function(){
                        howClose();
                  });
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

function plantBomb(){
    var geoService = navigator.geolocation;
    if (geoService) {
        navigator.geolocation.getCurrentPosition(showWhereIsTheBomb,errorHandler);
    } else {
        $("#searchResults").html("Your Browser does not support GeoLocation.");
    }
}

function howClose(){

}

function showCurrentLocation(position){
        $("#searchResults").html("Your location details --> Current Latitude : " + position.coords.latitude + " , Longitude : " + position.coords.longitude);
}

function showWhereIsTheBomb(position){
        $("#searchResults").html("The bomb is planted at Lati: " + positoin.coords.latitude + " , Long: " + position.coords.longitude);
}

function errorHandler(error){
          $("#searchResults").html("Error while retrieving current position. Error code: " + error.code + ",Message: " + error.message);
}
