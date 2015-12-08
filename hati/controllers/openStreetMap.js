var request = require('request');
var _ = require('lodash');
var Q = require('q');

exports.getRoute = function(startCoord, endCoord) {
	var start = startCoord.toString().split(',');
	var end = endCoord.toString().split(',');
	var deferred = Q.defer();
	request({
		url: 'http://www.yournavigation.org/api/1.0/gosmore.php',
		method: 'GET',
    qs: {format: 'geojson', flat: start[1], flon: start[0],
      tlat: end[1], tlon: end[0], v: 'foot', fast: '1', layer:'mapnik'},
	}, function(error, response, body) {
		if(error) {
			deferred.reject(error);
	  } else {
			var route = JSON.parse(body);
			  deferred.resolve(route);
		}
	});
	return deferred.promise;
}
