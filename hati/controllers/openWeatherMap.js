var request = require('request');
var _ = require('lodash');

var apiKey = '03a13edf29e5939786e03db83c973c47';

function getCurrentWeatherDataByCityName(city, callback) {
	request({
		url: 'http://api.openweathermap.org/data/2.5/weather', //URL to hit
    qs: {q: city, units: 'metric', appid: apiKey}, //Query string data
    method: 'GET', //Specify the method
  }, callback);
}

exports.getWeatherForecastByCoordinates = function(lat, lon, callback) {
	request({
		url: 'http://api.openweathermap.org/data/2.5/forecast', //URL to hit
    qs: {lat: lat, lon: lon, units: 'metric', appid: apiKey}, //Query string data
    method: 'GET', //Specify the method
  }, callback);
};

/*
getCurrentWeatherDataByCityName('Innsbruck', function(error, response, body) {
	if(error) {
		console.log(error);
	} else {
		var weather = JSON.parse(body);
		console.log(weather.name);
		console.log(weather.coord);
		console.log(weather.weather);
		console.log(weather.main);
		console.log(weather.wind);
	}
});

getWeatherForecastByCoordinates(47.262661, 11.39454, function(error, response, body) {
	if(error) {
		console.log(error);
	} else {
		var forecast = JSON.parse(body);
		console.log(forecast.city)
		console.log(forecast.list[0]);
	}
});*/
