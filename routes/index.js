var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Machine Learning Data Gathering Project',
        description: `Please help us gather data for our machine learning and optimization project :)
        We only ask you to simply press a button that represents your personal opinion regarding the movie.
        If you haven't seen it - please skip to the next one.`,
        id: 1 + '?tmdbId=389' // Id of first movie
    });
});

module.exports = router;
