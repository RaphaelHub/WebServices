var request = require('request');
var osm = require('../controllers/openStreetMap.js');
var Graph = require('../models/graph.js');
var parser= require('xml2json');
var _ = require('lodash');
var Q = require('q');
var _relations = [71787,359908,71785,89518,359910,4201061,359911,359910,3977518,382568,4286872,4286873,3979143,2589450,2589451,3978031,379544,2589452,113811,379533,3998983,4286874,379545,3975811];

function fillGraph(){
	var deferred = Q.defer();
	var promises=[];
	var graph = new Graph();
	osm.getRelations(_relations).then(function(relations){
		for (var i = 0; i < relations.length; i++) {
			promises.push(osm.getRelNodes(relations[i]));
		}
		for (var i = 0; i < promises.length; i++) {
			promises[i].then(function(nodes){
				for (var j=0; j<nodes.length; j++) {
					graph.addVertex({id:nodes[j].osm.node.id,lat:nodes[j].osm.node.lat,lon:nodes[j].osm.node.lon});
					if (j !== 0){
						var lat1=nodes[j-1].osm.node.lat;
						var lat2=nodes[j].osm.node.lat;
						var lon1=nodes[j-1].osm.node.lon;
						var lon2=nodes[j].osm.node.lon;
						var vertex1={id:nodes[j-1].osm.node.id,lat:nodes[j-1].osm.node.lat,lon:nodes[j-1].osm.node.lon};
						var vertex2={id:nodes[j].osm.node.id,lat:nodes[j].osm.node.lat,lon:nodes[j].osm.node.lon};
						graph.addEdge(vertex1,vertex2, osm.getDistance(lat1, lon1, lat2, lon2));
					}
				}
			});
		}
		Q.all(promises).done(function() {
			deferred.resolve(graph);
		});
	});
	return deferred.promise;
}

fillGraph().then(function(graph){
		graph.print(); //gibt nur manchmal eine Ausgabe??
});
