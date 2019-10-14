var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Machine Learning Data Gathering Project',
    description: 'Please help us gather data for our machine learning and optimization project :)',
    id: 1 + '?tmdbId=389',  // Id of first movie
  });
});

module.exports = router;