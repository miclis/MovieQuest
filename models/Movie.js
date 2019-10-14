const axios = require('axios');
var tmdbUtil = require('../utils/tmdbUtil');

var util = new tmdbUtil();

class Movie {
    constructor() {
    }

    async getMovieTmdb(tmdbid) {
        try {
            const res = await axios.get(util.movieRequestURL(tmdbid));
            this.data = res.data;
        } catch (error) {
            let err = new Error('FAILED TO GET MOVIE DATA')
            err.staus = 405;
            throw err;
        }
    }
    
    provideImageUrl(posterPath) {
        return util.imageURL(posterPath);
    }
}

module.exports = Movie;
