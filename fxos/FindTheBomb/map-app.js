window.scrollTo(0,1);
function Bomb(latitude, longitude){
    this.latitude = latitude;
    this.longitude = longitude;
    this.isPlanted = false;
}
Bomb.prototype.where = function(){
    coordinates = [];
    coordinates.push(this.latitude);
    coordinates.push(this.longitude);
    return coordinates;
}
var Bomba; // undefined

$(document).ready(function(){
                  $("#btnLocateMe").click(function(){
                        findMyCurrentLocation(0);
                  });
                  $("#btnCoordinates").click(function(){
                        findMyCurrentLocation(1);
                  });
                  $("#btnPlantBombHere").click(function(){
                        findMyCurrentLocation(2);
                  });
                  $("#btnAmIClose").click(function(){
                        findMyCurrentLocation(3);
                  });
                  $("#btnPlantBomb").click(function(){
                        findMyCurrentLocation(4);
                  });
});

function findMyCurrentLocation(value){
        var geoService = navigator.geolocation;
        if (geoService) {
            if (value == 0) {
                navigator.geolocation.getCurrentPosition(showMap,errorHandler,{enableHighAccuracy:true});
            } else if (value == 1) {
                navigator.geolocation.getCurrentPosition(showCoordinates,errorHandler,{enableHighAccuracy:true});
            } else if (value == 2) {
                navigator.geolocation.getCurrentPosition(plantBombHere,errorHandler,{enableHighAccuracy:true});
            } else if (value == 3) {
                navigator.geolocation.getCurrentPosition(amIclose,errorHandler,{enableHighAccuracy:true});
            } else if (value == 4) {
                navigator.geolocation.getCurrentPosition(plantBomb,errorHandler,{enableHighAccuracy:true});
            }

        } else if (!(geoService)) {
                alert("Your Browser does not support GeoLocation.");
        }
}

function showMap(position){
        //Create the latlng object based on the GPS Position retrieved
        var latlng = new google.maps.LatLng (position.coords.latitude, position.coords.longitude);

        //Set Google Map options
        var options = {
            zoom : 15,
            center : latlng,
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };

  var $content = $("#map-page div:jqmData(role=content)");

  //Set the height of the div containing the Map to rest of the screen
  $content.height(screen.height - 50);

  //Display the Map
  var map = new google.maps.Map ($content[0], options);

  //Change to the map-page
  $.mobile.changePage ($("#map-page"));

  //Create the Marker and Drop It
  var marker = [];
  marker.push(new google.maps.Marker ({ map : map,
                            animation : google.maps.Animation.DROP,
                            position : latlng,
                            title : 'Sua posição atual'
                          }));
}

function plantBomb(position){
    if (Bomba == undefined) {
        //Create the latlng object based on the GPS Position retrieved
        var latlng = new google.maps.LatLng (position.coords.latitude, position.coords.longitude);

        //Set Google Map options
        var options = {
            zoom : 15,
            center : latlng,
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
  var $content = $("#map-page div:jqmData(role=content)");

  //Set the height of the div containing the Map to rest of the screen
  $content.height(screen.height - 50);

  //Display the Map
  var map = new google.maps.Map ($content[0], options);

  //Change to the map-page
  $.mobile.changePage ($("#map-page"));

  //Create the Marker and Drop It
  var marker = [];
  marker.push(new google.maps.Marker ({ map : map,
                            animation : google.maps.Animation.DROP,
                            position : latlng,
                            title : 'Sua posição atual'
                          }));
  alert("Selecione o local da bomba.");

    google.maps.event.addListener(map, 'click', function(event) {
        marker.push(new google.maps.Marker({
            map : map,
            animation : google.maps.Animation.DROP,
            position : event.latLng,
            draggable:true,
            icon: './images/bomb.png'
        }));
        //Bomba = new Bomb(-5.842149, -35.200568);
        Bomba = new Bomb(marker[1].position.lat(), marker[1].position.lng());
        $("#warning").html("The bomb was planted at " + marker[1].position.lat() + ":" + marker[1].position.lng());
    });

    } else {
        $("#latitude").html("");
        $("#longitude").html("");
        $("#warning").html("The bomb is already planted.");
    }
}

function showCoordinates(position) {
    $("#latitude").html("Latitude: " + position.coords.latitude);
    $("#longitude").html("Longitude: " + position.coords.longitude);
    $("#warning").html("");

}
function plantBombHere(position) {
    if (Bomba == undefined) {
        Bomba = new Bomb(position.coords.latitude, position.coords.longitude);
        $("#warning").html("The bomb was planted at " + position.coords.latitude + ":" + position.coords.longitude);
    } else {
        $("#latitude").html("");
        $("#longitude").html("");
//        coordenadas = Bomba.where();
//        $("#warning").html("The bomb is already planted at " + coordenadas[0] + ":" + coordenadas[1]);
        $("#warning").html("The bomb is already planted.");
    }
}
function amIclose(position) {
    if (Bomba == undefined) {
        $("#warning").html("Nenhuma bomba foi plantada!");
    } else {
        coordenadas = Bomba.where();
        float:distancia = calculateDistance(coordenadas[0], coordenadas[1], position.coords.latitude, position.coords.longitude);
        distancia = Number((distancia).toFixed(1));
        if (distancia < 200 && distancia > 50) {
            $("#warning").html("Está esquentando.. Distancia: " + distancia + " metros");
        } else if (distancia < 50) {
            $("#warning").html("Você achou a bomba!");
            toCreateDiv();
        } else {
            $("#warning").html("Distancia: " + distancia + " metros");
        }
    }
}

function toCreateDiv() {
    var x = document.createElement('div');
    x.setAttribute('id','div1');
    x.innerHTML="Isso aí!";
    document.getElementById('attachDIV').appendChild(x);
    document.getElementById('div1').innerHTML='<form action="victory.html"><input type="submit" value="Desarmar!"></form>';
}


function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2-lat1).toRad();
    var dLon = (lon2-lon1).toRad();
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d*1000;
}
Number.prototype.toRad = function() { return this * Math.PI / 180; }

function errorHandler(error){
          alert("Error while retrieving current position. Error code: " + error.code + ",Message: " + error.message);
}
