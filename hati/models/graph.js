_ = require('lodash');
osm = require('../controllers/openStreetMap.js');
fs = require('fs');
Q = require('q');

function Graph() {
  var vertices = [];

  this.addVertex = function(v) {
    if(!_.some(vertices, {from: v})) {
      vertices.push({from: v, to: []});
    }

    return _.find(vertices, {from: v});
  };

  this.addEdge = function(v1, v2, weight) {
    if(!_.includes(this.addVertex(v1).to, v2)) {
      _.find(vertices, {from: v1}).to.push({vertex: this.addVertex(v2).from, weight: weight});
    }
    //undirected
    if(!_.includes(this.addVertex(v2).to, v1)) {
      _.find(vertices, {from: v2}).to.push({vertex: this.addVertex(v1).from, weight: weight});
    }
  };

  function getMin(Q, dist) {
    var min = Infinity;
    var ret = null;

    _.forEach(Q, function(vertex) {
      if(dist.get(vertex) < min) {
        min = dist.get(vertex);
        ret = vertex;
      }
    });

    return ret;
  }

  this.getShortestPath = function(v1, v2) {
    var Q = [];
    var dist = new Map();
    var prev = new Map();
    _.forEach(vertices, function(vertex) {
      dist.set(vertex, Infinity);
      prev.set(vertex, null);
      Q.push(vertex);
    });

    dist.set(_.find(vertices, {from: v1}), 0);


    while(Q.length > 0) {
      var u = getMin(Q, dist);
      if(u === _.find(vertices, {from: v2})) {
        var path = [];
        while(u) {
          path.push(u.from);
          u = prev.get(u);
        }
        return path.reverse();
      }
      _.remove(Q, u);

      if(u && u.to) {
        _.forEach(u.to, function(to) {
          var alt = dist.get(u) + to.weight;
          if(alt < dist.get(_.find(vertices, {from: to.vertex}))) {
            dist.set(_.find(vertices, {from: to.vertex}), alt);
            prev.set(_.find(vertices, {from: to.vertex}), u);
          }
        });
      }
    }

    return null;
  };

  this.findClosestVertex = function(lat, lon) {
    var ret = vertices[0];
    var min = osm.getDistance(lat, lon, ret.from.lat, ret.from.lon);
    _.forEach(vertices, function(vertex) {
      var tmp = osm.getDistance(lat, lon, vertex.from.lat, vertex.from.lon);
      if(tmp < min) {
        ret = vertex;
        min = tmp;
      }
    });
    return ret.from;
  };

  this.connectCloseVertices = function() {
    _.forEach(vertices, function(vertex1) {
      _.forEach(vertices, function(vertex2) {
        if(vertex1 !== vertex2) {
          var lat1 = vertex1.from.lat;
          var lon1 = vertex1.from.lon;
          var lat2 = vertex2.from.lat;
          var lon2 = vertex2.from.lon;
          var distance = osm.getDistance(lat1, lon1, lat2, lon2);
          if(distance < 0.005) {
            if(!_.includes(vertex1.to, vertex2.from)) {
              vertex1.to.push({vertex: vertex2.from, weight: distance});
            }
          }
        }
      });
      _.remove(vertices, {from: vertex1.from});
      vertices.push(vertex1);
    });
  };

  this.serialize = function(filename) {
    fs.writeFileSync(filename, JSON.stringify(vertices));
  };

  this.deserialize = function(filename) {
    vertices = JSON.parse(fs.readFileSync(filename));
  };

  this.print = function() {
    console.log(JSON.stringify(vertices, null, 4));
  };
}

module.exports = Graph;
