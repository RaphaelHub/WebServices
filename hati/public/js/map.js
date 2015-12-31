var innsbruck = ol.proj.fromLonLat([11.392777777778, 47.267222222222]);
var view = new ol.View({
  center: innsbruck,
  zoom: 12
});

var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'map',
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  view: view
});

var geolocation = new ol.Geolocation({
  projection: view.getProjection()
});
geolocation.setTracking(true);

// handle geolocation error.
geolocation.on('error', function(error) {
  var info = document.getElementById('info');
  info.innerHTML = error.message;
  info.style.display = '';
});

var accuracyFeature = new ol.Feature();
geolocation.on('change:accuracyGeometry', function() {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#3399CC'
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 2
    })
  })
}));

geolocation.on('change:position', function() {
  var coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ?
      new ol.geom.Point(coordinates) : null);
  // TODO: Look at https://openlayersbook.github.io/ch09-taking-control-of-controls/example-06.html
  // and figure out how to implement a button which allows the user to center his view on the current location
  // map.getView().setCenter(coordinates);
});


var featuresOverlay = new ol.layer.Vector({
  map: map,
  source: new ol.source.Vector({
    features: [accuracyFeature, positionFeature]
  })
});

function drawLines(points, lineColor) {
  for (var i = 0; i < points.length; i++) {
      points[i] = ol.proj.transform(points[i].reverse(), 'EPSG:4326', 'EPSG:3857');
    }

    var featureLine = new ol.Feature({
      geometry: new ol.geom.LineString(points)
    });

    var vectorLine = new ol.source.Vector({});
    vectorLine.addFeature(featureLine);

    var vectorLineLayer = new ol.layer.Vector({
      source: vectorLine,
      style: new ol.style.Style({
          fill: new ol.style.Fill({ color: lineColor, weight: 4 }),
          stroke: new ol.style.Stroke({ color: lineColor, width: 2 })
      })
    });
    map.addLayer(vectorLineLayer);
}

//colors of the lines in the map
var hikingColor = '#063e06';
var walkingColor = '#001cea'; //#561cea
var busColor = '#ff1010';

geolocation.once('change:position', function() {
  	var position = ol.proj.transform(geolocation.getPosition(), 'EPSG:3857', 'EPSG:4326');
    position = position.reverse();
    //console.log(position);
    var tourPoints = [];
    var busPoints = [];
    $.get('/points', function(data) {
      tourPoints = JSON.parse(data);
      //console.log(tourPoints);
      drawLines(JSON.parse(JSON.stringify(tourPoints)), hikingColor);
      $.get('/busPoints?from=' + position.join() + '&to='+ tourPoints[0].join(), function(data) {
        busPoints = JSON.parse(data);
        //console.log(busPoints);
        var fromPos = JSON.parse(JSON.stringify(busPoints[0]));
        for(var i = 1; i < busPoints.length; i++) {
          var toPos = JSON.parse(JSON.stringify(busPoints[i]));
          $.get('/route?from=' + fromPos.join() + '&to=' + toPos.join() + '&typeOfTransport=motorcar', function(data) {
            var points = JSON.parse(data);
            //console.log(points);
            drawLines(points, busColor);
          });
          fromPos = toPos;
        }
        $.get('/route?from=' + position.join() + '&to=' + busPoints[0].join(), function(data) {
          var points = JSON.parse(data);
          //console.log(points);
          drawLines(points, walkingColor);
        });
        $.get('/route?from=' + busPoints[busPoints.length-1].join() + '&to=' + tourPoints[0].join(), function(data) {
          var points = JSON.parse(data);
          //console.log(points);
          drawLines(points, walkingColor);
        });
      });
    });
});
