var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/master', function(req, res, next) {
  res.render('index', { title: 'Musikarium | phina.js', particlesCount: 1000, dotCount: 0 });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Musikarium | phina.js', particlesCount: 200, dotCount: 0 });
});

module.exports = router;
