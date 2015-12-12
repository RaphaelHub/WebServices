var request = require('requestretry');
var _ = require('lodash');
var Q = require('q');
var parser = require('xml2json');

var getRoute = function(startCoord, endCoord) {
	var start = startCoord.toString().split(',');
	var end = endCoord.toString().split(',');
	var deferred = Q.defer();
	request({
		url: 'http://www.yournavigation.org/api/1.0/gosmore.php',
		method: 'GET',
    qs: {format: 'geojson', flat: start[1], flon: start[0],
      tlat: end[1], tlon: end[0], v: 'foot', fast: '1', layer:'mapnik'},
	}, function(error, response, body) {
		if (error) {
			deferred.reject(error);
	  } else {
			var route = JSON.parse(body);
			deferred.resolve(route);
		}
	});
	return deferred.promise;
};

function getObject(type,id) { //macht api Anfragen
	var deferred = Q.defer();
	request({
		url: 'http://api.openstreetmap.org/api/0.6/'+type+'/'+id,
		qs: {},
		method: 'GET',
	}, function(error, response, body) {
		if (error) {
			return getObject(type, id);
	  } else {
			deferred.resolve(JSON.parse(parser.toJson(body)));
		}
	});
	return deferred.promise;
}

var getRelation = function(id) {
	return getObject('relation', id);
};

var getRelations = function(ids) {
	var promises = [];
	for (var i = 0; i < ids.length; i++) {
		promises.push(getRelation(ids[i]));
	}
	return Q.all(promises);
};

var getNode = function(id) {
	return getObject('node', id);
};

var getNodes = function(ids) {
	var promises = [];
	for (var i = 0; i < ids.length; i++) {
		promises.push(getNode(ids[i]));
	}
	return Q.all(promises);
};

var getRelatedRelations = function(id) { //gibt alle Relationen einer Buslinie zurück.
	return getRelation(id).then(function(relation) {
		var relations=[];
		if(relation && relation.osm && relation.osm.relation && relation.osm.relation.member) {
			if (_.some(relation.osm.relation.member,{type: 'relation'})) {
				var tmp =_.filter(relation.osm.relation.member, {type: 'relation'});
				_.forEach(tmp, function(elem) {
					relations.push(elem.ref);
				});
			}
		}
		return relations;
	});
};

var getRelatedNodes=function(relationId){ //gibt alle Bushaltestellen einer Relation zurück.
	return getRelation(relationId).then(function(relation) {
		var ids = [];
		if(relation && relation.osm && relation.osm.relation && relation.osm.relation.member) {
			var tmp = _.filter(relation.osm.relation.member, {type: 'node', role:'stop'});
			_.forEach(tmp, function(elem) {
				ids.push(elem.ref);
			});
		}
		return getNodes(ids);
	});
};

var getDistance = function(lat1, lon1, lat2, lon2){
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	dist = dist * 1.609344;
	return dist;
};

module.exports = {
	getRoute: getRoute,
	getRelation: getRelation,
	getRelations: getRelations,
	getNodes: getNodes,
	getNode: getNode,
	getRelatedRelations: getRelatedRelations,
	getRelatedNodes: getRelatedNodes,
	getDistance: getDistance
};
