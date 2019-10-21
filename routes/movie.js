import { Router } from 'express';
import axios from 'axios';
import MovieList from '../models/MovieList';
import Movie from '../models/Movie';
import { databaseApiURL } from '../config';

const router = Router();
let movies = new MovieList();

const MIN_RANGE = 1;
const MAX_RANGE = 200;

/* GET movie page. */
router.get('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);

    if (id >= MIN_RANGE && id <= MAX_RANGE) {
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
            nextId: nextId <= MAX_RANGE ? nextId : 'end'
        });
    } else if (req.params.id == 'end') {
        res.redirect('/end');
    } else {
        let err = new Error('INVALID MOVIE ID');
        err.status = 404;
        next(err);
    }
});

/* POST rate movie request */
router.post('/:id', async (req, res, next) => {
    // 1. Prepare tiny request body
    const body = {
        rate: req.body.rating == 'skip' ? null : req.body.rating,
        movieId: req.params.id,
        userId: req.sessionID
    };

    // 2. Send data to database API
    // await axios.post(databaseApiURL, body);
});

export default router;

const transformGenres = genres => {
    let output = [];
    genres.forEach(element => {
        output.push(element.name);
    });
    return output;
};
