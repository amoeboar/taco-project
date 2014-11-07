<<<<<<< HEAD

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

=======
<script>
var map;
var pos;
var infowindow;
var markers = [];
function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 13,
    center: new google.maps.LatLng(37.77,-122.4)
  });
};
function setLocation() {
>>>>>>> a17c44fde5d6bc6348c71750e1cdd9781fe11730
  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    
    pos = new google.maps.LatLng(position.coords.latitude, 
      position.coords.longitude);
<<<<<<< HEAD

=======
>>>>>>> a17c44fde5d6bc6348c71750e1cdd9781fe11730
    var foundme = new google.maps.InfoWindow({
      map: map,
      position: pos,
      content: 'You are here!'
    });
<<<<<<< HEAD

=======
>>>>>>> a17c44fde5d6bc6348c71750e1cdd9781fe11730
      map.setCenter(pos);
      map.setZoom(16);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
<<<<<<< HEAD
};

=======
}
>>>>>>> a17c44fde5d6bc6348c71750e1cdd9781fe11730
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
<<<<<<< HEAD
};

=======
}
>>>>>>> a17c44fde5d6bc6348c71750e1cdd9781fe11730
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
<<<<<<< HEAD
};

=======
}
>>>>>>> a17c44fde5d6bc6348c71750e1cdd9781fe11730
// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
};
<<<<<<< HEAD

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
=======
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
};
function findFood(pos) {
  var request = {
    location: pos,
    radius: 500,
    types: ['food']
>>>>>>> a17c44fde5d6bc6348c71750e1cdd9781fe11730
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
};
<<<<<<< HEAD

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

=======
function findMovie(pos) {
  var request = {
    location: pos,
    radius: 750,
    types: ['movie_theater','theatre']
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
};
function findStore(pos) {
  var request = {
    location: pos,
    radius: 500,
    types: ['bicycle_store','book_store','department_store','shopping_mall','jewelry_store','clothing_store']
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
};
function findGallery(pos) {
  var request = {
    location: pos,
    radius: 500,
    types: ['art_gallery','museum']
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
};
function findAmuse(pos) {
  var request = {
    location: pos,
    radius: 1000,
    types: ['bowling_alley','amusement_park','zoo','stadium']
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
};
function findClub(pos) {
  var request = {
    location: pos,
    radius: 500,
    types: ['night_club']
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
};
function findPark(pos) {
  var request = {
    location: pos,
    radius: 750,
    types: ['park']
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
};
>>>>>>> a17c44fde5d6bc6348c71750e1cdd9781fe11730
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
<<<<<<< HEAD

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
=======
google.maps.event.addDomListener(window, 'load', initialize);
$(document).ready(function () {
  $("#locate").click(function () {
    setLocation();
  });
  $("#food").click(function () {
    clearMarkers();
    findFood(pos);
  });
  $("#theatre").click(function () {
    clearMarkers();
    findMovie(pos);
  });
  $("#store").click(function () {
    clearMarkers();
    findStore(pos);
  });
  $("#gallery").click(function () {
    clearMarkers();
    findGallery(pos);
  });
  $("#amuse").click(function () {
    clearMarkers();
    findAmuse(pos);
  });
  $("#club").click(function () {
    clearMarkers();
    findClub(pos);
  });
  $("#park").click(function () {
    clearMarkers();
    findPark(pos);
  });
});
</script>
>>>>>>> a17c44fde5d6bc6348c71750e1cdd9781fe11730
