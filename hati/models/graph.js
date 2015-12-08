_ = require('lodash');

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
          path.push(u);
          u = prev.get(u);
        }
        return path.reverse();
      }
      _.remove(Q, u);

      _.forEach(u.to, function(to) {
        var alt = dist.get(u) + to.weight;
        if(alt < dist.get(_.find(vertices, {from: to.vertex}))) {
          dist.set(_.find(vertices, {from: to.vertex}), alt);
          prev.set(_.find(vertices, {from: to.vertex}), u);
        }
      });
    }

    return null;
  };

  this.print = function() {
    console.log(JSON.stringify(vertices, null, 4));
  };
}

module.exports = Graph;
