var express = require('express');
var router = express.Router();
var _ = require('lodash');
var outdooractive = require('./outdooractive');
var openStreetMap = require('./openStreetMap');

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
  while (match != null) {
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
    var outdoorPoints = [];
    outdooractive.getContentObject(req.session.tourId).then(function(tour) {
      outdoorPoints = StringToArray(tour.geometry);
    var myPoints = req.query.title.split(',');
    var targetPoint = outdoorPoints[0].toString().split(',');
    openStreetMap.getRoute(myPoints[0].toString(), myPoints[1].toString(), targetPoint[0].toString(), targetPoint[1].toString()).then(function(route) {
      res.json(JSON.stringify(route.coordinates));
    });
  });
  } else {
    res.json([]);
  }
}
router.get('/route', getRoute);

module.exports = router;
