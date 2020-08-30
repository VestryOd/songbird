import { groups } from './movies';
import { prepareFilmsData, shuffleArray, getRandomInt } from '../../helpers/services';

const prepareDataSets = (quotesArray, filmsData) => {
  const result = [];
  quotesArray.forEach((el) => {
    const data = shuffleArray(el.data).slice(0, 6);
    const currentAudio = data[getRandomInt(data.length)];
    // console.log(data, currentAudio);
    // const { filmId } = currentAudio;
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
