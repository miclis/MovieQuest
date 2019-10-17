import axios from 'axios'
import * as util from '../utils/tmdbUtil'

export default class Movie {
    constructor() {
    }

    async getMovieTmdb(tmdbid) {
        try {
            console.log(util.movieRequestURL(tmdbid));
            
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
