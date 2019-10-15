var express = require('express');
var router = express.Router();
const axios = require('axios');
var MovieList = require('../models/MovieList');
var Movie = require('../models/Movie');

var movies = new MovieList();

const minRange = 1;
const maxRange = 200;

/* GET movie page. */
router.get('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);

    if (id >= minRange && id <= maxRange) {
        // 1. Get id from CSV
        const tmdbId = movies.data[id - 1].TMDBId;

        // 2. New Movie object
        let movie = new Movie();

        // 3. Get data
        await movie.getMovieTmdb(tmdbId);

        // 3. Prepare data
        const oriTitle = movie.data.original_title;
        const title = movie.data.title;
        const year = movie.data.release_date.slice(0, 4);
        const tagline = movie.data.tagline.length != 0 ? movie.data.tagline : 'N/A';
        const genres = transformGenres(movie.data.genres);
        const imageUrl = movie.provideImageUrl(movie.data.poster_path);
        const nextId = id + 1;
        const nextTmdbId = movies.data[id] != null ? movies.data[id].TMDBId : '';

        // 4. Render movie
        res.render('movie', {
            originalTitle: oriTitle,
            polishTitle: title,
            year: ' (' + year + ')',
            tagline: tagline,
            genres: genres,
            imageUrl: imageUrl,
            nextId: nextId <= maxRange ? (nextId + '?tmdbId=' + nextTmdbId) : 'end'
        });
    } else if (req.params.id == 'end') {
        res.render('end', {
            title: 'Machine Learning Data Gathering Project',
            description: `Thank you for your answers!`
        });
    } else {
        let err = new Error('INVALID MOVIE ID');
        err.status = 404;
        next(err);
    }
});

/* POST rate movie request */
router.post('/:id', async (req, res, next) => {    
    const body = {
        rating: req.body.rating,
        id: req.params.id,
        tmdbId: req.query.tmdbId,
        sessionId: req.sessionID,
    };
    console.log(body);
    
    
    // await axios.post('/movie/2', body);
    // res.redirect(`/movie/3`);
});


module.exports = router;

const transformGenres = genres => {
    let output = [];
    genres.forEach(element => {
        output.push(element.name);
    });
    return output;
};