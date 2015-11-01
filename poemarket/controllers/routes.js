var express = require('express');
var db = require('../db');
var Q = require('q');
var _ = require('lodash');
var Pagination = require('./pagination');
var router = express.Router();

function getIndex(req, res) {
  db.League.find().sort({_id: 1}).exec(function(err, leagues) {
    if(err) return console.error(err);
    var promises = [];
    var top3 = {};
    for(var i = 0; i < leagues.length; i++) {
      promises.push(function(league) {
        return db.Shop.find({'league': league.name}).sort('-views').limit(3).exec(function(err, shops) {
          top3[league.name] = shops;
        });
      }(leagues[i]));
    };
    Q.all(promises).then(function() {
      var session = req.session;
      session['$back'] = '/';
      res.render('index', {breadcrumbs: req.breadcrumbs(), 'leagues': leagues, 'top3': top3});
    });
  });
}
router.get('/', getIndex);

function getBack(req, res) {
  var session = req.session;
  res.redirect(session['$back'] || '/');
}
router.get('/back', getBack);

function getSearch(req, res) {
  db.League.find({}).sort({_id: 1}).exec(function(err, leagues) {
    if(err) return console.error(err);
    db.Currency.find({}).sort('name').exec(function(err, currencies) {
      currencies = [].concat({name: 'Any'}, currencies);
      if(err) return console.error(err);
      if(req.query.league) {
        var query = {};
        if(req.query.fromCurrency !== 'Any') query['offers.selling'] = req.query.fromCurrency;
        if(req.query.toCurrency !== 'Any') query['offers.buying'] = req.query.toCurrency;
        db.Shop.find({league: req.query.league}).where(query).exec(function(err, shops) {
          if(err) return console.error(err);
          for(var i = 0; i < shops.length; i++) {
            shops[i].offers = _.filter(shops[i].offers, function(offer) {
              return (req.query.fromCurrency === 'Any' || (offer.selling === req.query.fromCurrency)) && (req.query.toCurrency === 'Any' || (offer.buying === req.query.toCurrency));
            });
          }
          shops = _.filter(shops, function(shop) {
            return shop.offers.length > 0;
          });
          shops = _.sortBy(shops, function(shop) {
            return -shop.offers[0].ratio.split(':')[0]/shop.offers[0].ratio.split(':')[1];
          });
          var pagination = new Pagination(req.query.currentPageIndex || 1, 10, shops.length, {league: req.query.league, fromCurrency: req.query.fromCurrency, toCurrency: req.query.toCurrency});
          res.render('search', {
            'leagues': leagues,
            'currencies': currencies,
            'shops': shops.slice(pagination.startIndex, pagination.startIndex+pagination.elementsPerPage),
            leagueDefault: req.query.league || leagues[0].name,
            fromCurrencyDefault: req.query.fromCurrency || currencies[0].name,
            toCurrencyDefault: req.query.toCurrency || currencies[0].name,
            'pagination': pagination
          });
        });
      } else {
        res.render('search', {
          'leagues': leagues,
          'currencies': currencies,
          leagueDefault: leagues[0].name,
          fromCurrencyDefault: currencies[0].name,
          toCurrencyDefault: currencies[0].name
        });
      }
    });
  });
}
router.get('/search', getSearch);

function getCreateShop(req, res) {
  db.League.find({}).sort({_id: 1}).exec(function(err, leagues) {
    if(err) return console.error(err);
    db.Currency.find({}).sort('name').exec(function(err, currencies) {
      if(err) return console.error(err);
      res.render('createshop', {'leagues': leagues, 'currencies': currencies});
    });
  });
}
router.get('/createshop', getCreateShop);

function postCreateShop(req, res) {
  if(!/^[a-zA-Z_]+$/.test(req.body.ign)) {
    res.redirect('/error?id=3');
    return;
  }
  db.Shop.findOne({ign: req.body.ign}, function(err, shop) {
    if(shop === null) {
      db.League.find({}).exec(function(err, leagues) {
        if(err) return console.error(err);
        db.Currency.find({}).exec(function(err, currencies) {
          if(err) return console.error(err);
          if(!_.find(leagues, {name: req.body.league})) {
            res.redirect('/error?id=3');
            return;
          }
          var tmp = {
            ign: req.body.ign,
            league: req.body.league,
            offers: []
          };
          if(req.body.tradefrom.constructor === Array) { // more than one offer
            for(var i = 0; i < req.body.tradefrom.length; i++) {
              var fail = !/^[0-9]+:[0-9]+$/.test(req.body.ratio[i]) || !_.find(currencies, {name: req.body.tradefrom[i]}) || !_.find(currencies, {name: req.body.tradeto[i]});
              if(fail) {
                res.redirect('/error?id=3');
                return;
              }
              tmp.offers.push({selling: req.body.tradefrom[i], buying: req.body.tradeto[i], ratio: req.body.ratio[i]});
            }
          } else { // only one offer
            var fail = !/^[0-9]+:[0-9]+$/.test(req.body.ratio) || !_.find(currencies, {name: req.body.tradefrom}) || !_.find(currencies, {name: req.body.tradeto});
            if(fail) {
              res.redirect('/error?id=3');
              return;
            }
            tmp.offers.push({selling: req.body.tradefrom, buying: req.body.tradeto, ratio: req.body.ratio});
          }
          new db.Shop(tmp).save();
          res.redirect('/'+req.body.league+'/'+req.body.ign);
        });
      });
    } else {
      res.redirect('/error?id=2');
    }
  });
}
router.post('/createshop', postCreateShop);

function getImportShop(req, res) {
  res.render('importshop');
}
router.get('/importshop', getImportShop);

function postImportShop(req, res) {
  try {
    var shop = JSON.parse(req.body.shopjson);
    req.body.ign = shop.ign;
    req.body.league = shop.league;
    req.body.tradefrom = [];
    req.body.tradeto = [];
    req.body.ratio = [];
    var count = 0;
    for(tradefrom in shop.offers) {
      for(tradeto in shop.offers[tradefrom]) {
        req.body.tradefrom[count] = tradefrom;
        req.body.tradeto[count] = tradeto;
        req.body.ratio[count] = shop.offers[tradefrom][tradeto];
        count++;
      }
    }
    postCreateShop(req, res);
  } catch(err) {
    res.redirect('/error?id=3');
  }
}
router.post('/importshop', postImportShop);

function getDragAndDrop(req, res) {
  res.render('draganddrop');
}
//router.get('/draganddrop', getDragAndDrop);

function getError(req, res) {
  db.Error.findOne({id: parseInt(req.query.id)}, function(err, error) {
    if(err) return console.error(err);
    res.render('error', {msg: error.msg});
  });
}
router.get('/error', getError);

function getLeague(req, res) {
  db.League.findOne({name: req.params.league}, function(err, league) {
    if(err) return console.error(err);
    if(league === null) {
      res.redirect('/error?id=0');
    } else {
      db.Shop.count({'league': req.params.league}, function(err, c) {
        var currentPageIndex = req.query.currentPageIndex || 1;
        var pagination = new Pagination(currentPageIndex, 10, c);
        db.Shop.find({'league': req.params.league}).sort('-views').skip(pagination.startIndex).limit(pagination.elementsPerPage).exec(function(err, shops) {
          req.breadcrumbs(req.params.league, '/'+req.params.league+'?currentPageIndex='+pagination.currentPageIndex);
          var session = req.session;
          session['$back'] = '/'+req.params.league+'?currentPageIndex='+pagination.currentPageIndex;
          res.render('league', {breadcrumbs: req.breadcrumbs(), 'league': league, 'shops': shops, 'pagination': pagination});
        });
      });
    }
  });
}
router.get('/:league', getLeague);

function getIgn(req, res) {
  db.Shop.findOne({ign: req.params.ign}, function(err, shop) {
    if(err) return console.error(err);
    if(shop === null) {
      res.redirect('/error?id=1');
    } else {
      var session = req.session;
      if(session[shop.ign]) {}
      else {
        shop.views++;
        shop.save();
        session[shop.ign]=true;
      }
      session['$back'] = '/'+req.params.league+'/'+req.params.ign;
      req.breadcrumbs(req.params.league, '/'+req.params.league);
      req.breadcrumbs(req.params.ign, '/'+req.params.league+'/'+req.params.ign);
      res.render('shop', {breadcrumbs: req.breadcrumbs(), shop: shop});
    }
  });
}
router.get('/:league/:ign', getIgn);

module.exports = router;
