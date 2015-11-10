var request = require('request');
var _ = require('lodash');


function getRoute(startLat, startLon, endLat, endLon, callback) {
	request({
		url: 'http://www.yournavigation.org/api/1.0/gosmore.php',
		method: 'GET',
    qs: {format: 'kml', flat: startLat, flon: startLon,
      tlat: endLat, tlon: endLon, v: 'foot', fast: '1', layer:'mapnik', instructions: '1'},
	}, callback);
}

getRoute('52.215676','5.963946','52.2573','6.1799',function(error, response, body) {
	if(error) {
		console.log(error);
  } else {
    console.log(body);
	}
});
