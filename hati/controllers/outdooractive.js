var request = require('request');
var _ = require('lodash');
var Q = require('q');

var apiKey = 'yourtest-outdoora-ctiveapi';
var projectKey = 'api-dev-oa';
var alpenvereinaktivKey = 'alpenvereinaktiv';

function getCategoryTree() {
  request({
    url: 'http://www.outdooractive.com/api/project/' + projectKey + '/category/tree', //URL to hit
    qs: {key: apiKey}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });
}

function getCategoryTreeTour() {
  request({
    url: 'http://www.outdooractive.com/api/project/' + projectKey + '/category/tree/tour', //URL to hit
    qs: {key: apiKey}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });
}

function getCategoryTreePoi() {
  request({
    url: 'http://www.outdooractive.com/api/project/' + projectKey + '/category/tree/poi', //URL to hit
    qs: {key: apiKey}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });
}

function getCategoryTreeTourPruned() {
  request({
    url: 'http://www.outdooractive.com/api/project/' + projectKey + '/category/tree/tour/pruned', //URL to hit
    qs: {key: apiKey}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });
}

function getCategoryTreePoiPruned() {
  request({
    url: 'http://www.outdooractive.com/api/project/' + projectKey + '/category/tree/poi/pruned', //URL to hit
    qs: {key: apiKey}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });
}

function getRegionTree() {
  request({
    url: 'http://www.outdooractive.com/api/project/' + projectKey + '/region/tree', //URL to hit
    qs: {key: apiKey}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });
}

function getTours() {
  request({
    url: 'http://www.outdooractive.com/api/project/' + projectKey + '/tours', //URL to hit
    qs: {key: apiKey}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });
}

function getPois() {
  request({
    url: 'http://www.outdooractive.com/api/project/' + projectKey + '/pois', //URL to hit
    qs: {key: apiKey}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });
}

//http://www.outdooractive.com/api/project/alpenvereinaktiv/oois/6603520?key=yourtest-outdoora-ctiveapi&display=minimal
function getMinimalContentObject(id, callback) {
  request({
    url: 'http://www.outdooractive.com/api/project/' + alpenvereinaktivKey + '/oois/' + id, //URL to hit
    qs: {key: apiKey, display: 'minimal'}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, callback);
}

function getMinimalContentObjects(ids, callback) {
  var str;
  _.forEach(ids, function(elem) {
    str += elem + ',';
  });
  str = str.slice(0, -1); // remove last comma
  request({
    url: 'http://www.outdooractive.com/api/project/' + alpenvereinaktivKey + '/oois/' + str, // URL to hit
    qs: {key: apiKey, display: 'minimal'}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, callback);
}

exports.getContentObject = function(id) {
  var deferred = Q.defer();
  request({
    url: 'http://www.outdooractive.com/api/project/' + alpenvereinaktivKey + '/oois/' + id, //URL to hit
    qs: {key: apiKey}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(error) {
      deferred.reject(error);
    } else {
      var body = JSON.parse(body);
      deferred.resolve(body.tour[0]);
    }
  });
  return deferred.promise;
};

function getContentObjects(ids, callback) {
  var str;
  _.forEach(ids, function(elem) {
    str += elem + ',';
  });
  str = str.slice(0, -1); // remove last comma
  request({
    url: 'http://www.outdooractive.com/api/project/' + alpenvereinaktivKey + '/oois/' + str, // URL to hit
    qs: {key: apiKey}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, callback);
}

function getContentObjectList(id) {
  request({
    url: 'http://www.outdooractive.com/api/project/' + alpenvereinaktivKey + '/oois/' + id, //URL to hit
    qs: {key: apiKey, diplay: 'list'}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });
}

function getExternalIdOfContentObject(id) {
  request({
    url: 'http://www.outdooractive.com/api/lookup/' + id, //URL to hit
    qs: {key: apiKey}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });
}

// Parameter	          | Example	             | Default	    | Description
// ------------------------------------------------------------------------------------------------------------------------------------------------------------
// dif_d, dif_m, dif_e	| dif_d : false	       | true	        | show tours which are ‘difficult’ (dif_d=true), ‘intermediate’ (dif_m=true), ‘easy’ (dif_e=true)
// asc_s, asc_e	        | asc_s : 500	         | empty string | filter tours by ascending meters: asc_s <= tour.asc <= asc_e
// tim_s, tim_e	        | tim_e : 60	         | empty string | filter tours by duration in minutes: tim_s <= tour.time <= tim_e
// len_s, len_e	        | len_e : 5000	       | empty string | filter tours by length in meters: len_s <= tour.length <= len_e
// q	                  | q : ‘Church’	       | empty string | full text search
// area	                | area : ‘1027459’	   | empty string | filter by region
// category	            | category : ‘1566479’ | empty string | filter by category

function getFilteredTours() {
  request({
    url: 'http://www.outdooractive.com/api/project/' + alpenvereinaktivKey + '/filter/tour', //URL to hit
    qs: {key: apiKey, area: '1022329', category: '1566480'}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });
}

function getNearbyTours() {
  request({
    url: 'http://www.outdooractive.com/api/project/' + projectKey + '/nearby/tour', //URL to hit
    qs: {key: apiKey, location: '11.39,47.26', sortby: 'distance', radius: '5000'}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });
}

//Languages
//The request language of all text APIs are set by parameters:
//lang: e.g. “de”, “en”, “fr”, etc. Sets the request language.
//fallback: possible values are true (default) and false, return the text of the default language if an attribute’s text is not avaible in the requested language
//Example Request:
//http://www.outdooractive.com/api/project/api-dev-oa/oois/1550935?key=yourtest-outdoora-ctiveapi&lang=it&fallback=false

exports.getToursAroundInnsbruck = function (dif_d, dif_m, dif_e, asc_s, asc_e, tim_s, tim_e, len_s, len_e) {
  var qs = {
    key: apiKey,
    area: '1022329',
    category: '1566480',
    dif_d: dif_d || 'true',
    dif_m: dif_m || 'true',
    dif_e: dif_e || 'true',
    asc_s: asc_s || '',
    asc_e: asc_e || '',
    tim_s: tim_s || '',
    tim_e: tim_e || '360',
    len_s: len_s || '',
    len_e: len_e || '15000'
  };
  var deferred = Q.defer();
  request({
    url: 'http://www.outdooractive.com/api/project/' + alpenvereinaktivKey + '/filter/tour', //URL to hit
    qs: qs,
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Accept': 'application/json'
    }
  }, function(error, response, body) {
    if(error) {
      console.log(error);
    } else {
      var tours = JSON.parse(body);
      var ids = [];
      _.forEach(tours.data, function(data) {
        ids.push(data.id);
      });
      getMinimalContentObjects(ids, function(error, response, body) {
          if(error) {
            deferred.reject(error);
          } else {
            var body = JSON.parse(body);
            deferred.resolve(body.tour);
          }
      });
    }
  });
  return deferred.promise;
};
