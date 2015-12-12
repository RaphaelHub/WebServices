var request = require('request');
var map = require('../controllers/openStreetMap.js');
var Graph = require('../models/graph.js');
var parser= require('xml2json');
var _ = require('lodash');
var Q = require('q');


function fillGraph(){
	var deferred = Q.defer();
	var promises=[];
	var graph = new Graph();
	map.getRelations([71787,359908,71785,89518,359910,4201061,359911,359910,3977518,382568,4286872,4286873,3979143,2589450,2589451,3978031,379544,2589452,113811,379533,3998983,4286874,379545,3975811]).then(function(relations){
		for(var i=0; i<relations.length;i++){
			promises.push(map.getRelNodes(relations[i]));
		}
		for(var i=0; i<promises.length; i++){
			promises[i].then(function(nodes){
				for (var j=0; j<nodes.length; j++){
					graph.addVertex(nodes[j]);
					if(j!=0){
						var lat1=nodes[j-1].osm.node.lat;
						var lat2=nodes[j].osm.node.lat;
						var lon1=nodes[j-1].osm.node.lon;
						var lon2=nodes[j].osm.node.lon;
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
						graph.addEdge(nodes[j-1],nodes[j], dist);
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
		console.log("1");
		graph.print(); //gibt nur manchmal eine Ausgabe??
		console.log("2");
})
