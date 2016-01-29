#!/bin/env node
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./controllers/routes');
var session = require('express-session');
var app = express();
var busRoutes = require('./controllers/busRoutes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  resave: false,
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
var port = process.env.PORT || 8080;
var ip = process.env.IP || '127.0.0.1';

console.log('Generating graph...');
busRoutes.generateGraph().then(function(g) {
  console.log('Graph generated!');
  //g.print();
  //g.serialize('./models/graph.json');
  console.log('Server running on ' + ip + ':' + port);
  app.listen(port);
});
