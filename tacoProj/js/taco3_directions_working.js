var map;
var pos;
var infowindow;
var markers = [];
var latarray = [];
var directionsDisplay;
var directionsService;
var map;

function setLocation() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  map = new google.maps.Map(document.getElementById('map-canvas'));

  directionsDisplay.setMap(map);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    
    pos = new google.maps.LatLng(position.coords.latitude, 
      position.coords.longitude);

    var foundme = new google.maps.InfoWindow({
      map: map,
      position: pos,
      content: 'You are here!'
    });

      map.setCenter(pos);
      map.setZoom(16);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
};

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
};

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  markers.push(marker);
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
};

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
};

function find(type, radius, pos) {
  clearMarkers();
  var request = {
    location: pos,
    radius: radius,
    types: [type]
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
};

function calcRoute(markers, pos) {
  clearMarkers();

  for (var i = 0; i < markers.length; i++) {
    latarray.push({
        location: new google.maps.LatLng(markers[i].position.k, markers[i].position.B),
        stopover: true
      });
    }
  var waypts = latarray.slice(0, latarray.length < 8 ? latarray.length : 8);

  // var start = pos;
  // var end = latarray[latarray.length-1];
  var start = new google.maps.LatLng(pos.k, pos.B);
  var end = new google.maps.LatLng(37.7749295,-122.4194);
  var request = {
      origin:start,
      destination:end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.WALKING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      console.log("Routing did not work.");
    }
  });
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Oh man, we lost you.';
  } else {
    var content = 'Your browser doesn\'t support geolocation.';
  }
  // Get lost in SF
  var options = {
    map: map,
    position: new google.maps.LatLng(37.8,-122.4),
    content: content
  };
  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
};

google.maps.event.addDomListener(window, 'load', setLocation);

$(document).ready(function () {
  $("#food").click(function () {
    find("food", 500, pos);
  });
  $("#theatre").click(function () {
    find("movie_theater", 10000, pos);
    // other type: 'theatre' 
    // NEED TO FIX
  });
  $("#store").click(function () {
    find("store", 500, pos);
    // other types: 'bicycle_store','book_store',
    //'department_store','shopping_mall','jewelry_store',
    // 'clothing_store' 
    // NEED TO FIX
  });
  $("#gallery").click(function () {
    find("art_gallery", 500, pos);
    // other type: 'museum'
    // NEED TO FIX 
  });
  $("#amuse").click(function () {
    find("bowling_alley", 5000, pos);
    // other types: 'amusement_park','zoo','stadium'
    // NEED TO FIX
  });
  $("#club").click(function () {
    find("night_club", 500, pos);
  });
  $("#park").click(function () {
    find("park", 500, pos);
  });
  $("#path").click(function () {
    calcRoute(markers, pos);
  });
});
