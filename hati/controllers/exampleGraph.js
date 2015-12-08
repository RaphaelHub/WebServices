var Graph = require('../models/graph.js');

var g = new Graph();
g.addVertex(1);
g.addVertex(2);
g.addVertex(3);
g.addVertex(4);
g.addVertex(5);
g.addVertex(6);
g.addEdge(1, 2, 7);
g.addEdge(1, 3, 9);
g.addEdge(1, 6, 14);
g.addEdge(2, 3, 10);
g.addEdge(2, 4, 15);
g.addEdge(3, 4, 11);
g.addEdge(3, 6, 2);
g.addEdge(6, 5, 9);
g.addEdge(4, 5, 6);

//g.print();
console.log(JSON.stringify(g.getShortestPath(1,5), null, 4));
