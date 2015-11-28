var request = require('request');
var _ = require('lodash');
var Q = require('q');

exports.getRoute = function(startLat, startLon, endLat, endLon) {
	var deferred = Q.defer();
	request({
		url: 'http://www.yournavigation.org/api/1.0/gosmore.php',
		method: 'GET',
    qs: {format: 'geojson', flat: startLat, flon: startLon,
      tlat: endLat, tlon: endLon, v: 'foot', fast: '1', layer:'mapnik'},
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
