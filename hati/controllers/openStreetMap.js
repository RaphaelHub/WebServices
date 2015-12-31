var request = require('request');
var _ = require('lodash');
var Q = require('q');
var parser = require('xml2json');

var getRoute = function(startCoord, endCoord, typeOfTransport) {
	var start = startCoord.toString().split(',');
	var end = endCoord.toString().split(',');
	typeOfTransport = typeOfTransport || 'foot'; // could be set to motorcar but we use foot per default
	//console.log(start);
	//console.log(end);
	var deferred = Q.defer();
	request({
		url: 'http://www.yournavigation.org/api/1.0/gosmore.php',
		method: 'GET',
    qs: {format: 'geojson', flat: start[0], flon: start[1],
      tlat: end[0], tlon: end[1], v: typeOfTransport, fast: '1', layer:'mapnik'},
	}, function(error, response, body) {
		if (error) {
			deferred.reject(error);
	  } else {
			var coordinates = JSON.parse(body).coordinates;
			var result = [];
			_.forEach(coordinates, function(coordinate) {
				result.push(coordinate.reverse());
			});
			deferred.resolve(result);
		}
	});
	return deferred.promise;
};

var getRelation = function(id) {
	var deferred = Q.defer();
	request({
		url: 'http://api.openstreetmap.org/api/0.6/relation/'+id,
		qs: {},
		method: 'GET',
	}, function(error, response, body) {
		if (error) {
			deferred.reject(error);
	  } else {
			var _relation = JSON.parse(parser.toJson(body));
			var relation = {};
			if(_relation && _relation.osm && _relation.osm.relation) {
					relation = _relation.osm.relation;
			}
			deferred.resolve(relation);
		}
	});
	return deferred.promise;
};

var getRelations = function(ids) {
	var deferred = Q.defer();
	request({
		url: 'http://api.openstreetmap.org/api/0.6/relations',
		qs: {
			relations: ids.join()
		},
		method: 'GET',
	}, function(error, response, body) {
		if (error) {
			deferred.reject(error);
		} else {
			var _relations = JSON.parse(parser.toJson(body));
			var relations = [];
			_.forEach(_relations, function(_relation) {
				_.forEach(_relation.relation, function(relation) {
					relations.push(relation);
				});
			});
			deferred.resolve(relations);
		}
	});
	return deferred.promise;
};

var getNode = function(id) {
	var deferred = Q.defer();
	request({
		url: 'http://api.openstreetmap.org/api/0.6/node/'+id,
		qs: {},
		method: 'GET',
	}, function(error, response, body) {
		if (error) {
			deferred.reject(error);
	  } else {
			var _node = JSON.parse(parser.toJson(body));
			var node = {};
			if(_node && _node.osm && _node.osm.node) {
					node = _node.osm.node;
			}
			deferred.resolve(node);
		}
	});
	return deferred.promise;
};

var getNodes = function(ids) {
	var deferred = Q.defer();
	request({
		url: 'http://api.openstreetmap.org/api/0.6/nodes',
		qs: {
			nodes: ids.join()
		},
		method: 'GET',
	}, function(error, response, body) {
		if (error) {
			deferred.reject(error);
		} else {
			var _nodes = JSON.parse(parser.toJson(body));
			var nodes = [];
			_.forEach(_nodes, function(_node) {
				_.forEach(_node.node, function(node) {
					nodes.push(node);
				});
			});
			deferred.resolve(nodes);
		}
	});
	return deferred.promise;
};

var getRelatedRelations = function(id) { //gibt alle Relationen einer Buslinie zurück.
	return getRelation(id).then(function(relation) {
		var ids=[];
		if(relation && relation.member) {
			if (_.some(relation.member,{type: 'relation'})) {
				var tmp =_.filter(relation.member, {type: 'relation'});
				_.forEach(tmp, function(elem) {
					ids.push(elem.ref);
				});
			}
		}
		return ids;
	});
};

var getRelatedNodes=function(id){ //gibt alle Bushaltestellen einer Relation zurück.
	return getRelation(id).then(function(relation) {
		var ids = [];
		if(relation && relation.member) {
			var tmp = _.filter(relation.member, {type: 'node', role:'stop'});
			_.forEach(tmp, function(elem) {
				ids.push(elem.ref);
			});
		}
		return getNodes(ids);
	});
};

var getRelationsFromNode = function(id) {
	var deferred = Q.defer();
	request({
		url: 'http://api.openstreetmap.org/api/0.6/node/' + id + '/relations',
		qs: {},
		method: 'GET',
	}, function(error, response, body) {
		if (error) {
			deferred.reject(error);
	  } else {
			var _relation = JSON.parse(parser.toJson(body));
			var relation = {};
			if(_relation && _relation.osm && _relation.osm.relation) {
					relation = _relation.osm.relation;
			}
			deferred.resolve(relation);
		}
	});
	return deferred.promise;
};

var getBuslinesFromNode = function(id) {
	return getRelationsFromNode(id).then(function(relations) {
		var buslines = [];
		_.forEach(relations, function(relation) {
			var busline = _.find(relation.tag, {k: 'ref'});
			if(busline) buslines.push(busline.v);
		});
		return buslines;
	});
};

var getDistance = function(lat1, lon1, lat2, lon2){
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
  var dLon = (lon2 - lon1) * Math.PI / 180;
  var a =
     0.5 - Math.cos(dLat)/2 +
     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
     (1 - Math.cos(dLon))/2;

  return R * 2 * Math.asin(Math.sqrt(a));
};

module.exports = {
	getRoute: getRoute,
	getRelation: getRelation,
	getRelations: getRelations,
	getNodes: getNodes,
	getNode: getNode,
	getRelatedRelations: getRelatedRelations,
	getRelatedNodes: getRelatedNodes,
	getRelationsFromNode: getRelationsFromNode,
	getBuslinesFromNode: getBuslinesFromNode,
	getDistance: getDistance
};
