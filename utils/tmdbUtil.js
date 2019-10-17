import { apiURL, api_key, langParam, posterURL } from '../config';

export const movieRequestURL = movieId => {
    return `${apiURL}${movieId}?api_key=${api_key}&language=${langParam}`;
};

export const imageURL = posterPath => {
    return `${posterURL}${posterPath}`;
};