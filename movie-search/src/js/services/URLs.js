import * as options from '../constants';

export function moviesUrl(page, movieName) {
  return `${options.OMDB_URL}?s=${movieName}&page=${page}&apikey=${options.OMDB_API_KEY}`;
}

export function ratingUrl(imdbID) {
  return `${options.OMDB_URL}?i=${imdbID}&apikey=${options.OMDB_API_KEY}`;
}

export function movieUrl(imdbID) {
  return `${options.IMBD_URL}title/${imdbID}/videogallery/?ref_=tt_pv_vi_sm`;
}

export function translateUrl(text) {
  return `${options.YANDEX_URL}translate?key=${options.YANDEX_API_KEY}&text=${text}&lang=ru-en`;
}

