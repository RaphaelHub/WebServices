var osm = require('../controllers/openStreetMap.js');
var Graph = require('../models/graph.js');
var _ = require('lodash');
var Q = require('q');
var _relations = [71787,359908,71785,89518,359910,4201061,359911,359910,3977518,382568,4286872,4286873,3979143,2589450,2589451,3978031,379544,2589452,113811,379533,3998983,4286874,379545,3975811];

var cachedGraph;

var generateGraph = function() {
	/*return Q.all(_.map(_relations, osm.getRelatedRelations)).then(function(relations) {
		relations = _.filter(relations.join().split(','), function(elem) {return elem.length > 0;});
		return Q.all(_.map(relations, osm.getRelatedNodes)).then(function(_nodes) {
			var graph = new Graph();
			_.forEach(_nodes, function(nodes) {
				for(var i = 0; i < nodes.length; i++) {
					graph.addVertex(nodes[i]);
					if (i !== 0) {
						var lat1=nodes[i-1].lat;
						var lat2=nodes[i].lat;
						var lon1=nodes[i-1].lon;
						var lon2=nodes[i].lon;
						graph.addEdge(nodes[i-1],nodes[i], osm.getDistance(lat1, lon1, lat2, lon2));
					}
				}
			});
			graph.connectCloseVertices();
			cachedGraph = graph;
			return graph;
		});
	});*/
	var graph = new Graph();
	graph.deserialize('./models/graph.json');
	cachedGraph = graph;
	var deferred = Q.defer();
	deferred.resolve(graph);
	return deferred.promise;
};

var getShortestPathFromTo = function(lat1, lon1, lat2, lon2) {
	function doSomething(g) {
		var vertex1 = g.findClosestVertex(lat1, lon1);
		//console.log(vertex1);
		var vertex2 = g.findClosestVertex(lat2, lon2);
		//console.log(vertex2);
		return g.getShortestPath(vertex1, vertex2);
	}
	if(cachedGraph) {
		var deferred = Q.defer();
		deferred.resolve(doSomething(cachedGraph));
		return deferred.promise;
	}
	return generateGraph().then(doSomething);
};

var getCoordinatesFromTo = function(lat1, lon1, lat2, lon2) {
	return getShortestPathFromTo(lat1, lon1, lat2, lon2).then(function(path) {
		var points = [];
		_.forEach(path, function(vertex) {
			points.push([parseFloat(vertex.lat), parseFloat(vertex.lon)]);
		});
		return points;
	});
};

/*getShortestPathFromTo(47.2637152, 11.4001445, 47.2652738, 11.3462899).then(function(result) {
	console.log(JSON.stringify(result, null, 4));
});*/

module.exports = {
	generateGraph: generateGraph,
	getShortestPathFromTo: getShortestPathFromTo,
	getCoordinatesFromTo: getCoordinatesFromTo
};
