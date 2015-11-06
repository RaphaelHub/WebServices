var express = require('express');
var router = express.Router();

function getIndex(req, res) {
  res.render('index', {});
}
router.get('/', getIndex);

function getMap(req, res) {
  res.render('map', {});
}
router.get('/map', getMap);

module.exports = router;
