var osm = require('../controllers/openStreetMap.js');
var Graph = require('../models/graph.js');
var _ = require('lodash');
var Q = require('q');
var _relations = [71787,359908,71785,89518,359910,4201061,359911,359910,3977518,382568,4286872,4286873,3979143,2589450,2589451,3978031,379544,2589452,113811,379533,3998983,4286874,379545,3975811];

Q.all(_.map(_relations, osm.getRelatedRelations)).then(function(relations) {
	relations = _.filter(relations.join().split(','), function(elem) {return elem.length > 0;});
	Q.all(_.map(relations, osm.getRelatedNodes)).then(function(_nodes) {
		var graph = new Graph();
		_.forEach(_nodes, function(nodes) {
			for(var i = 0; i < nodes.length; i++) {
				graph.addVertex({id:nodes[i].id,lat:nodes[i].lat,lon:nodes[i].lon});
				if (i !== 0) {
					var lat1=nodes[i-1].lat;
					var lat2=nodes[i].lat;
					var lon1=nodes[i-1].lon;
					var lon2=nodes[i].lon;
					var vertex1={id:nodes[i-1].id,lat:nodes[i-1].lat,lon:nodes[i-1].lon};
					var vertex2={id:nodes[i].id,lat:nodes[i].lat,lon:nodes[i].lon};
					graph.addEdge(vertex1,vertex2, osm.getDistance(lat1, lon1, lat2, lon2));
				}
			}
		});
		graph.print();
	});
});
