import humanNames from 'human-names';

const audiosBase = '../assets/audios/';
const audioDivider = '_-_';

const getRandomName = () => {
  const choise = Math.floor(Math.random() * 2) + 1;
  const name = choise === 1 ? humanNames.maleRandom() : humanNames.femaleRandom();
  return name;
};

const prepareFilmsData = (arraOfFilmsData) => {
  if (!arraOfFilmsData) return {};

  const result = {};
  arraOfFilmsData.forEach((el) => {
    result[el.filmId] = el;
  });
  return result;
};

const getRandomInt = (arrLength) => Math.floor(Math.random() * arrLength);

const shuffleArray = (array) => {
  if (!array) return [];
  const result = [...array];
  result.forEach((_, i) => {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  });
  return result;
};

const kipoiskUrl = 'https://www.kinopoisk.ru/film/{filmId}/';

const getTrack = (filmName, name) => `${audiosBase}${filmName}${audioDivider}${name}.mp3`;

export { getRandomName, prepareFilmsData, getRandomInt, shuffleArray, getTrack, kipoiskUrl };
