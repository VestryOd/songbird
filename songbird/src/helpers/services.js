import humanNames from 'human-names';
import { welcomePage } from '../assets/text-data';

const audiosBase = '../assets/audios/';
const audioDivider = '_-_';
const statsObjectName = 'songbirdStats';

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

const playAudio = (src) => {
  const audio = new Audio(src);
  audio.play();
};

const generateTracksStyles = (arr, placeHolder) => new Array(arr.length).fill(placeHolder);

const saveStats = (obj) => {
  const stats = JSON.parse(localStorage.getItem(statsObjectName)) || [];
  localStorage.setItem(statsObjectName, {
    ...stats,
    ...obj,
  });
};

const getStats = () => {
  const stats = JSON.parse(localStorage.getItem(statsObjectName));
  return stats || [];
};

const ageBreakPoinst = [12, 13, 20, 15];

const defineAge = (scoreLevels) => {
  let age = 0;
  scoreLevels.forEach((point, idx) => {
    const calculated = point === 0 ? 0 : ageBreakPoinst[idx] * (point / 5);
    age += calculated;
  });
  return Math.floor(age);
};

const defineAgeGroup = (age) => {
  if (!age) return 0;

  if (age >= 0 && age <= 12) {
    return 0;
  }

  if (age >= 13 && age <= 25) {
    return 1;
  }

  if (age >= 26 && age <= 40) {
    return 2;
  }

  if (age >= 41 && age <= 50) {
    return 3;
  }

  if (age >= 51) {
    return 4;
  }
};

const defineGenderGroup = (gender) => {
  if (!gender || gender.length === 0) {
    return 'person';
  }
  const genders = welcomePage.ru.gender;
  const genderCategory = genders.find((el) => el.label === gender);
  return genderCategory.value;
};

const rand = (max, min = 0) => {
  const offset = min;
  const range = max - min + 1;
  return Math.floor(Math.random() * range) + offset;
};

const getAvatarImage = (gender, age, avatars) => {
  const ageGroup = defineAgeGroup(age);
  console.log(ageGroup);
  const genderGroup = defineGenderGroup(gender);
  console.log(genderGroup);

  const isNoGender = gender === welcomePage.ru.gender[2].label;
  console.log(isNoGender);
  const avatarPack = isNoGender ? avatars[genderGroup] : avatars[genderGroup][ageGroup];
  console.log(avatarPack);

  if (isNoGender) {
    console.log('isNoGender');
    return ageGroup >= 2 ? avatarPack[2] : avatarPack[ageGroup];
  }

  if (avatarPack.length === 1) {
    console.log(avatarPack.length === 1);
    return avatarPack[0];
  }

  const index = rand(avatarPack.length);
  console.log(index);
  return index >= avatarPack.length ? avatarPack[index - 1] : avatarPack[index];
};

const getResultsStatus = (gender, age, statusLabels) => {
  const ageGroup = defineAgeGroup(age);
  const genderGroup = defineGenderGroup(gender);
  return statusLabels[genderGroup][ageGroup];
};

const getRandomSet = (arr, howMatchToGet) => {
  const result = new Array(howMatchToGet).fill({});
  let count = 0;
  while (count < howMatchToGet) {
    const rndIdx = rand(arr.length);
    const elem = arr[rndIdx];
    if (!result.find((el) => el?.filmId === elem?.filmId)) {
      result[count] = { ...elem };
      count += 1;
    } else {
      continue;
    }
  }
  return result;
};

const prepareTitle = (title, name, score) => {
  const replacedName = title.replace('{name}', name);
  const replaceScore = replacedName.replace('{score}', score);
  return replaceScore;
};

export {
  getRandomName,
  prepareFilmsData,
  getRandomInt,
  shuffleArray,
  getTrack,
  kipoiskUrl,
  playAudio,
  generateTracksStyles,
  saveStats,
  getStats,
  defineAge,
  getAvatarImage,
  getRandomSet,
  rand,
  prepareTitle,
  getResultsStatus,
};
