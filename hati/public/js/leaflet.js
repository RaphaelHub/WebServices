var accessToken = 'pk.eyJ1IjoiYmVybmhhcmRmcml0eiIsImEiOiJjaWl0OTBjaDMwMGExdzlrc3FqaTBkdXZjIn0.jm5I3E659TeH67zEmnc_BA';
var id = 'bernhardfritz.oiicp9j3';
var innsbruck = [47.267222222222, 11.392777777778];

var hikingColor = 'black';
var walkingColor = 'blue';
var busColor = 'red';

var map = L.map('map').setView(innsbruck, 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: id,
    accessToken: accessToken
}).addTo(map);

function drawPolyline(points, color) {
  var latlngs = [];
  for(var i = 0; i < points.length; i++) {
    latlngs.push(new L.LatLng(points[i][0], points[i][1]));
  }
  var polyline = L.polyline(latlngs, {color: color}).addTo(map);
}

function drawPoints(points, color) {
  for(var i = 0; i < points.length; i++) {
    /*var point = L.circle(points[i], 50, {color: color}).addTo(map).on('click', function(e) {
      var latlng = this.getLatLng();
      var text = '';
      $.ajax({
        url: '/reverseGeocoding?lat='+latlng.lat+'&lon='+latlng.lng,
        success: function(data) {
          //console.log(data);
          var entity = JSON.parse(data);
          console.log(entity);
          if(entity && entity.address) {
            if(entity.address.bus_stop) {
              text = '<p>' + entity.address.bus_stop + '</p>';
            } else if(entity.address.road) {
              text = '<p>' + entity.address.road + '</p>';
            }
          }
        },
        async: false
      });
      this.bindPopup(text).openPopup();
    });*/ // old implementation using reverseGeocoding overhead
    var point = L.circle([points[i][0], points[i][1]], 50, {color: color}).addTo(map);
    point.bindPopup(points[i][2]);
  }
}

navigator.geolocation.getCurrentPosition(function(position) {
  var startMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
  startMarker.bindPopup('<p>Start location</p');
  //console.log(position);
  var tourPoints = [];
  var busPoints = [];
  $.get('/points', function(data) {
    tourPoints = JSON.parse(data);
    //console.log(tourPoints);
    var endMarker = L.marker(tourPoints[Math.floor(tourPoints.length/2)]).addTo(map);
    endMarker.bindPopup('<p>Destination</p');
    drawPolyline(tourPoints, hikingColor);
    $.get('/busPoints?from=' + [position.coords.latitude, position.coords.longitude].join() + '&to='+ tourPoints[0].join(), function(data) {
      busPoints = JSON.parse(data);
      //console.log(busPoints);
      var fromPos = JSON.parse(JSON.stringify(busPoints[0]));
      for(var i = 1; i < busPoints.length; i++) {
        var toPos = JSON.parse(JSON.stringify(busPoints[i]));
        $.get('/route?from=' + fromPos.join() + '&to=' + toPos.join() + '&typeOfTransport=motorcar', (function(index) {
          return function(data) {
            var points = JSON.parse(data);
            //console.log(points);
            drawPolyline(points, busColor);
            drawPoints(busPoints.slice(index-1,index+1), busColor);
            console.log(busPoints.slice(index-1,index+1));
            console.log(busPoints);
          };
        })(i)); // self-invoking function. calls itself one time and returns the callback function for $.get. index can be accessed. i would be busPoints.length-1 at the time of execution.
        fromPos = toPos;
      }
      //drawPoints(busPoints, busColor);
      $.get('/route?from=' + [position.coords.latitude, position.coords.longitude].join() + '&to=' + busPoints[0].join(), function(data) {
        var points = JSON.parse(data);
        //console.log(points);
        drawPolyline(points, walkingColor);
      });
      $.get('/route?from=' + busPoints[busPoints.length-1].join() + '&to=' + tourPoints[0].join(), function(data) {
        var points = JSON.parse(data);
        //console.log(points);
        drawPolyline(points, walkingColor);
      });
    });
  });
});
