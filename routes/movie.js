var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('movie', {
    originalTitle: 'Mad Max Fury Road',
    polishTitle: 'Mad Max Kolekcja',
    year: ' (' + '2015' + ')',
    director: 'Antoni Dupokrzakov vel Wilhelm von Kapustka',
    genres: 'Action, Thriller, Post-Apo'
  });
});

module.exports = router;