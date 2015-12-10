var request = require('request');
var Graph = require('../models/graph.js');
var parser= require('xml2json');
var _ = require('lodash');
var Q = require('q');


function getJSON(type,id) { //macht api Anfragen
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

function getRelations() { //gibt alle Relationen einer Buslinie zurück.
	var deferred = Q.defer();
	var ids=[71787,359908,71785,89518,359910,4201061,359911,359910,3977518,382568,4286872,4286873,3979143,2589450,2589451,3978031,379544,2589452,113811,379533,3998983,4286874,379545,3975811];
	var relations=[];
	var promises=[];
	for(var i=0; i<ids.length; i++){
		promises.push(getJSON('relation',ids[i]));
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
	Q.all(promises).done(function() {
				deferred.resolve(relations);
					//console.log("Hello from the other side");
	});
	return deferred.promise;
}

function getNodes(relId){ //gibt alle Bushaltestellen einer Relation zurück.
	var deferred = Q.defer();
	var promises=[];
	getJSON('relation',relId).then(function(rel){
		var temp =_.filter(rel.osm.relation.member, {type: 'node', role:'stop'});
		for(var i=0; i<temp.length; i++){
			promises.push(getJSON('node', temp[i].ref));
		}
		Q.all(promises).then(function(nodes) {
			deferred.resolve(nodes);
		});
	});
	return deferred.promise;
}

function fillGraph(){
	var deferred = Q.defer();
	var promises=[];
	var graph = new Graph();
	getRelations().then(function(relations){
		for(var i=0; i<relations.length;i++){
			promises.push(getNodes(relations[i]));
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
		graph.print();
})
