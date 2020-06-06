import { unsplashUrl, weatherUrl, geocodingUrl } from './constants';

import axios from 'axios';
import moment from 'moment';

export const getBackgroundUrl = async (place) => {
  const quarter = getSeason().toLowerCase();
  const time = getDayTime();
  const query = `${quarter}, ${time}, ${place || ''}`;
  const finalQuery = unsplashUrl.replace('{query}', query);
  console.log(finalQuery);
  try {
    const json = await fetch(finalQuery);
    const backgroundData = await json.json();
    return backgroundData?.urls?.regular;
  } catch (error) {
    console.error(error);
  }
}

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          resolve({ lat, lon });
        },
        (error) => reject(error)
      );
    } else {
      reject("Not supported");
    }
  });
}

export const getWeatherByAddress = async (place, options) => {
  const { units, lang } = options
  const url = `${weatherUrl}&q=${place}&units=${units}&lang=${lang.toLowerCase()}`
  try {
    const json = await axios(url);
    return (await json.json())
  } catch (error) {
    console.error(error)
  }
}

export const getWeatherByCoords = async ({ lat, lon }, options) => {
  const { units, lang } = options;
  const url = `${weatherUrl}&lat=${lat}&lon=${lon}&units=${units}&lang=${lang.toLowerCase()}`;
  try {
    const json = await axios(url);
    return await json.json();
  } catch (error) {
    console.error(error);
  }
}

export const getGeolocation = async (place, lang) => {
  const url = typeof place === 'string'
    ? `${geocodingUrl}&language=${lang.toLowerCase()}&q=${place}`
    : `${geocodingUrl}&language=${lang.toLowerCase()}&q=${place.lat+place.lon}`;
  try {
    const json = await axios(url);
    return (await json.json());
  } catch (error) {
    console.error(error);
  }
}

export const checkTemperature = (temp) => {
  if (temp === 0) {
    return `${temp}°`;
  }
  const rounded = Math.round(temp);
  return rounded > 0 ? `+${rounded}°` : `-${rounded}°`;
}

export const getSeason = () => {
  const d = new Date();

  let seasonArray = [
    {
      name: "Spring",
      date: new Date(
        d.getFullYear(),
        2,
        d.getFullYear() % 4 === 0 ? 19 : 20
      ).getTime()
    },
    {
      name: "Summer",
      date: new Date(
        d.getFullYear(),
        5,
        d.getFullYear() % 4 === 0 ? 20 : 21
      ).getTime()
    },
    {
      name: "Autumn",
      date: new Date(
        d.getFullYear(),
        8,
        d.getFullYear() % 4 === 0 ? 22 : 23
      ).getTime()
    },
    {
      name: "Winter",
      date: new Date(
        d.getFullYear(),
        11,
        d.getFullYear() % 4 === 0 ? 20 : 21
      ).getTime()
    }
  ];
  const season = seasonArray.filter(({ date }) => date <= d).slice(-1)[0] || {
    name: "Winter"
  };
  return season.name;
};

export const getDayTime = () => {
  const d = moment().hour();
  if (d >= 0 && d <= 6) {
    return "night";
  }
  if (d >= 6 && d <= 12) {
    return "morning";
  }
  if (d >= 12 && d <= 18) {
    return "day";
  }
  if (d >= 18 && d <= 24) {
    return "evening";
  }
};