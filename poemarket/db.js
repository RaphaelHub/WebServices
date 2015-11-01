#!/bin/env node
var _ = require('lodash');
var mongoose = require('mongoose');
var dbhost = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
var dbport = process.env.OPENSHIFT_MONGODB_DB_PORT;
//mongoose.connect('mongodb://admin:PUq2DpG_vceP@'+dbhost+':'+dbport+'/poemarket');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var currencySchema = mongoose.Schema({
  name: String
});
var leagueSchema = mongoose.Schema({
  name: String
});
var shopSchema = mongoose.Schema({
  ign: String,
  league: String,
  offers: [{
    selling: String,
    buying: String,
    ratio: String
  }],
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    expires: 24*60*60,
    default: Date.now
  }
});
shopSchema.index({league: 1, 'views': -1});
var errorSchema = mongoose.Schema({
  id: Number,
  msg: String
});
var Currency = mongoose.model('Currency', currencySchema);
var League = mongoose.model('League', currencySchema);
var Shop = mongoose.model('Shop', shopSchema);
var Error = mongoose.model('Error', errorSchema);
var currencies = [
  'Scroll of Wisdom',
  'Portal Scroll',
  'Armourer\'s Scrap',
  'Blacksmith\'s Whetstone',
  'Glassblower\'s Bauble',
  'Cartographer\'s Chisel',
  'Gemcutter\'s Prism',
  'Jeweller\'s Orb',
  'Chromatic Orb',
  'Orb of Fusing',
  'Orb of Transmutation',
  'Orb of Chance',
  'Orb of Alchemy',
  'Regal Orb',
  'Orb of Augmentation',
  'Exalted Orb',
  'Orb of Alteration',
  'Chaos Orb',
  'Blessed Orb',
  'Divine Orb',
  'Orb of Scouring',
  'Mirror of Kalandra',
  'Orb of Regret',
  'Vaal Orb',
  'Eternal Orb'
];
var leagues = [
  'Standard',
  'Hardcore',
  'Warbands',
  'Tempest'
];
var errors = [
  'Specified league does not exist...',
  'Specified shop does not exist...',
  'There can only be one shop per IGN...',
  'Form validation failed...'
];
db.once('open', function(callback) {
  Currency.find(function(err, items) {
    if(err) return console.error(err);
    currencies.forEach(function(c) {
      if(!_.find(items, {name: c})) new Currency({name: c}).save();
    });
  });
  League.find(function(err, items) {
    if(err) return console.error(err);
    leagues.forEach(function(l) {
      if(!_.find(items, {name: l})) new League({name: l}).save();
    });
  });
  Error.find(function(err, items) {
    if(err) return console.error(err);
    errors.forEach(function(e) {
      if(!_.find(items, {msg: e})) new Error({id: errors.indexOf(e), msg: e}).save();
    });
  });
});
exports.Currency = Currency;
exports.League = League;
exports.Shop = Shop;
exports.Error = Error;
