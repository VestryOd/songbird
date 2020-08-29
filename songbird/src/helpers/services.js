import humanNames from 'human-names';

const getRandomName = () => {
  const choise = Math.floor(Math.random() * 2) + 1;
  const name =
    choise === 1 ? humanNames.maleRandom() : humanNames.femaleRandom();
  return name;
};

export default getRandomName;
