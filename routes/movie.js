var express = require('express');
var router = express.Router();

/* GET movie page. */
router.get('/:id', function(req, res, next) {
    if (req.params.id >= 1 && req.params.id <=200) {
        res.render('movie', {
            originalTitle: 'Mad Max Fury Road',
            polishTitle: 'Mad Max Kolekcja',
            year: ' (' + '2015' + ')',
            director: 'Antoni Baroni vel Wilhelm von Kapustka',
            genres: ['Action', 'Thriller', 'Post-Apo']
          });
    } else {
        let err = new Error('INVALID MOVIE ID');
        err.status = 404;
        throw err
    }
  
});

module.exports = router;