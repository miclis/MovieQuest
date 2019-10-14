var fs = require('fs');
var csv = require('fast-csv');
var path = require('path');
var Config = require('../config');

var conf = new Config();

class MovieList {
    constructor() {
        this.data = [];
        fs.createReadStream(path.join(__dirname, conf.csvPath))
            .pipe(csv.parse({ headers: true, delimiter: ';', rowDelimiter: '\n' }))
            .on('data', row => {
                this.data.push(row);
            });
    }
}

module.exports = MovieList;
