var Config = require('../config');
var conf = new Config();

class Util {
    constructor() {}
    movieRequestURL = movieId => {
        return `${conf.apiURL}${movieId}?api_key=${conf.api_key}&language=${conf.langParam}`;
    };

    imageURL = posterPath => {
        return `${conf.posterURL}${posterPath}`;
    };
}

module.exports = Util;