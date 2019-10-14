class Config {
    constructor() {
        this.apiURL = 'https://api.themoviedb.org/3/movie/'; // Add ${movieId}?api_key=${api_key}&language=pl-PL
        this.posterURL = 'https://image.tmdb.org/t/p/w500/'; // Add ${poster_path} - w500 corresponds to file size
        this.api_key = 'f7b51d5758abad3b84e3c0dbba3591e2';
        this.langParam = 'pl-PL';
        this.csvPath = '../static/data/movies.csv';
    }
}

module.exports = Config;
