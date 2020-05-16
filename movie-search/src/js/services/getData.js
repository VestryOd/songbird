import { moviesUrl, ratingUrl, translateUrl } from './URLs';
import reportError from "./reportError";

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

const checkStatus = code => {
  switch (code) {
    case '401':
      return reportError(`Status 401: limit is reached`);
    case '404':
      return reportError(`Status 404: no matches found`);
    default:
      return {};
  }
}

export const getFullMovie = async (page, name) => {
  return getMovie(page, name)
    .then(res => {
      checkStatus(res.status);
      return res.json();
    })
    .then(data => {
      const promises = [];
      if (data.Error) {
        throw Error(data.Error);
      }
      let dataSearch = Array.from(new Set(data.Search));
      dataSearch.forEach((elem, i) => {
        promises.push(
          getImdbID(elem.imdbID)
            .then(res => {
              checkStatus(res.status);
              return res.json();
            })
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
            .catch(err => {
              throw new Error(err);
            })
        );
      });
      return Promise.allSettled(promises).then(() => data);
    })
    .catch(err => {
      throw new Error(err.message);
    });
};

export async function getTranslate(text) {
  const url = translateUrl(text);
  try {
    return fetch(url)
      .then(res => {
        if (!res.ok) {
          throw Error(`Connection problem, status: ${res.status}, text: ${res.statusText}`);
        }
        return res.json()
      })
      .then(data => {
        if (data.code > 299) {
          throw Error(data.message);
        }
        return data;
      })
      .catch(error => {
        throw new Error(`Connection problem. Reason: ${error.message}`);
      });
  } catch (error) {
    throw new Error(error);
  }

}
