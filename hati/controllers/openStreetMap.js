var request = require('request');
var _ = require('lodash');
var Q = require('q');
var parser= require('xml2json');

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

function getObject(type,id) { //macht api Anfragen
	var deferred = Q.defer();
	request({
		url: 'http://api.openstreetmap.org/api/0.6/'+type+'/'+id,
		qs: {},
		method: 'GET',
	}, function(error, response, body) {
		if(error) {
			deferred.reject(error);
	  } else {
			  deferred.resolve(JSON.parse(parser.toJson(body)));
		}
	});
	return deferred.promise;
}


exports.getRelNodes=function(relId){ //gibt alle Bushaltestellen einer Relation zurück.
	var deferred = Q.defer();
	var promises=[];
	getRelation(relId).then(function(rel){
		var temp =_.filter(rel.osm.relation.member, {type: 'node', role:'stop'});
		for(var i=0; i<temp.length; i++){
			promises.push(getNode(temp[i].ref));
		}
		Q.all(promises).then(function(nodes) {
			deferred.resolve(nodes);
		});
	});
	return deferred.promise;
}

exports.getRelations=function(ids) { //gibt alle Relationen einer Buslinie zurück.
	var deferred = Q.defer();
	var relations=[];
	var promises=[];
	for(var i=0; i<ids.length; i++){
		promises.push(getRelation(ids[i]));
	}
	for(var i=0; i<promises.length; i++){
		promises[i].then(function(bus){
			if(_.some(bus.osm.relation.member,{type: 'relation'})){
				var temp =_.filter(bus.osm.relation.member, {type: 'relation'});
				_.forEach(temp, function(elem){
					relations.push(elem.ref);
				});
				//console.log(_.find(bus.osm.relation.tag, {k: 'name'}).v +"  id:"+ bus.osm.relation.id);
			}
		});
	}
	Q.all(promises).then(function() {
				deferred.resolve(relations);
					//console.log("Hello from the other side");
	});
	return deferred.promise;
}

function getNodes(ids){
	var deferred = Q.defer();
	var promises=[];
	for(var i=0; i<ids.length; i++){
		promises.push(getNode(ids[i]));
	}
	Q.all(promises).then(function(nodes) {
		deferred.resolve(nodes);
	});
return deferred.promise;
}


function getNode(id){
		return getObject('node', id);
}

function getRelation(id){
		return getObject('relation', id);
}


function distance(lat1,lat2,lon1,lon2){
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	dist = dist * 1.609344
	return dist;
}
