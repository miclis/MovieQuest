var express = require('express');
var router = express.Router();
const axios = require('axios');
var MovieList = require('../models/MovieList');
var Movie = require('../models/Movie');

var movies = new MovieList();

/* GET movie page. */
router.get('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);

    if (id >= 1 && id <= 200) {
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

        // 4. Render movie
        res.render('movie', {
            originalTitle: oriTitle,
            polishTitle: title,
            year: ' (' + year + ')',
            tagline: tagline,
            genres: genres,
            imageUrl: imageUrl,
            nextId: nextId
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