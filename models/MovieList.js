import fs from 'fs';
import csv from 'fast-csv'
import path from 'path'

import { csvPath } from '../config'

export default class MovieList {
    constructor() {
        this.data = [];
        fs.createReadStream(path.join(__dirname, csvPath))
            .pipe(csv.parse({ headers: true, delimiter: ';', rowDelimiter: '\n' }))
            .on('data', row => {
                this.data.push(row);
            });
    }
}