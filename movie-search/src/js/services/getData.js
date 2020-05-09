import { moviesUrl, ratingUrl, translateUrl } from './URLs';

const getMovie = async (page, name) => {
  const url = moviesUrl(page, name);
  const res = await fetch(url);
  return res;
};

const getImdbID = async imdbID => {
  const url = ratingUrl(imdbID);
  const res = await fetch(url);
  return res;
};

export const getFullMovie = async (page, name) => {
  return getMovie(page, name)
    .then(res => res.json())
    .then(data => {
      const promises = [];
      if (data.Error) {
        throw Error(data.Error);
      }
      let dataSearch = Array.from(new Set(data.Search));
      dataSearch.forEach((elem, i) => {
        promises.push(
          getImdbID(elem.imdbID)
            .then(res => res.json())
            .then(movie => {
              dataSearch[i].imdbRating = movie.imdbRating;
              dataSearch[i].Genre = movie.Genre;
              dataSearch[i].Plot = movie.Plot;
              dataSearch[i].Director = movie.Director;
              dataSearch[i].Released = movie.Released;
              if (movie.Actors) {
                dataSearch[i].Actors = movie.Actors.split(', ');
              }
            })
            .catch(err => console.log(err.message))
        );
      });
      return Promise.allSettled(promises).then(() => data);
    });
};

export async function getTranslate(text) {
  const url = translateUrl(text);
  return await fetch(url);
}
