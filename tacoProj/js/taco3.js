var map;
var pos;
var poly;
var infowindow;
var flightPath;
var markers = [];

function setLocation() {
  
  map = new google.maps.Map(document.getElementById('map-canvas'));

  var polyOptions = {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  };

  poly = new google.maps.Polyline(polyOptions);
  poly.setMap(map);

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

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
};

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
  if (flightPath != null) {
    flightPath.setMap(null);
    markers = [];
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

function makePath(markers) {
  var latarray = [];

  for (var i = 0; i < markers.length; i++) {
    latarray.push(markers[i].position);
  }
  flightPath = new google.maps.Polyline({
    path: latarray,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
};

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
    makePath(markers);
  });
});
