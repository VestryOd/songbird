import { groups } from './movies';
import { prepareFilmsData, getRandomSet, rand } from '../../helpers/services';

const prepareDataSets = (quotesArray, filmsData) => {
  const result = [];
  quotesArray.forEach((el) => {
    const data = getRandomSet(el.data, 6);
    const rndIdx = rand(data.length);
    const currentAudio = data[rndIdx];
    const currentFilm = filmsData[currentAudio?.filmId];
    result.push({
      title: groups[el.title],
      currentFilm,
      currentAudio,
      data,
    });
  });
  return result;
};

const prepareAllData = (moviesData, quotesData) => {
  const filmsData = prepareFilmsData(moviesData);
  const gameDataSets = prepareDataSets(quotesData, filmsData);

  return {
    filmsData,
    gameDataSets,
  };
};

export default prepareAllData;
