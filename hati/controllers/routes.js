var express = require('express');
var router = express.Router();
var _ = require('lodash');
var outdooractive = require('./outdooractive');
var openStreetMap = require('./openStreetMap');
var openWeatherMap = require('./openWeatherMap');

function getIndex(req, res) {
  res.render('index', {});
}
router.get('/', getIndex);

function getSearch(req, res) {
  res.render('search');
}
router.get('/search', getSearch);

function getSearchResults(req, res) {
  outdooractive.getToursAroundInnsbruck().then(function(tours) {
    if(req.query.title !== 'undefined' && req.query.title !== '') {
      tours = _.filter(tours, function(tour) {
        return _.includes(tour.title.toLowerCase(), req.query.title.toLowerCase());
      });
    }
    tours = _.sortBy(tours, 'title');
    res.render('searchresults', {tours: tours});
  });
}
router.get('/searchresults', getSearchResults);

function getNavigation(req, res) {
  res.render('navigation', {});
}
router.get('/navigation', getNavigation);

function getTour(req, res) {
  if(req.query.id) {
    outdooractive.getContentObject(req.query.id).then(function(tour) {
      req.session.tourId = req.query.id;
      res.render('tour', {tour: tour});
    });
  } else if(req.session.tourId) {
    outdooractive.getContentObject(req.session.tourId).then(function(tour) {
      res.render('tour', {tour: tour});
    });
  } else {
    res.render('tour', {});
  }
}
router.get('/tour', getTour);

function StringToArray(myString) {
  var myRegexp = /(\d+\.\d+),(\d+\.\d+),\d+\s*/g;
  var match = myRegexp.exec(myString);
  var points = [];
  while (match !== null) {
    points.push([parseFloat(match[1]), parseFloat(match[2])]);
    match = myRegexp.exec(myString);
  }
  return points;
}

function getPoints(req, res) {
  if(req.session.tourId) {
    outdooractive.getContentObject(req.session.tourId).then(function(tour) {
      res.json(JSON.stringify(StringToArray(tour.geometry)));
    });

  } else {
    res.json([]);
  }
}
router.get('/points', getPoints);

function getRoute(req, res) {
  if(req.session.tourId) {
    outdooractive.getContentObject(req.session.tourId).then(function(tour) {
    var  outdoorPoints = StringToArray(tour.geometry);
    var startCoord = req.query.coordinates;
    openStreetMap.getRoute(startCoord, outdoorPoints[0]).then(function(route) {
      res.json(JSON.stringify(route.coordinates));
    });
  });
  } else {
    res.json([]);
  }
}
router.get('/route', getRoute);

function getWeather(req, res) {
  if (req.query.lat && req.query.lon) {
    openWeatherMap.getWeatherForecastByCoordinates(req.query.lat, req.query.lon, function(error, response, body) {
      if(error) {
        console.log(error);
      } else {
        res.render('weather', {forecast: JSON.parse(body)});
      }
    });
  }
  else {
    openWeatherMap.getWeatherForecastByCoordinates(47.262661, 11.39454, function(error, response, body) {
    	if(error) {
    		console.log(error);
    	} else {
    		res.render('weather', {forecast: JSON.parse(body)});
    	}
    });
  }
}
router.get('/weather', getWeather);

module.exports = router;
