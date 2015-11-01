#!/bin/env node
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var breadcrumbs = require('express-breadcrumbs');
var routes = require('./controllers/routes');
var session = require('express-session');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(breadcrumbs.init());
app.use(breadcrumbs.setHome());
app.use('/', breadcrumbs.setHome({
  name: 'poemarket',
  url: '/'
}));
app.use(session({
  secret: 'secret',
  cookie: {maxAge: 60*60*1000},
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
app.listen(port, ip);
