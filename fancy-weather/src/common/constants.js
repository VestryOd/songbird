export const API_KEY = process.env.REACT_APP_WEATHER_MAP_API_KEY;
export const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
export const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;
export const GEO_API_KEY = process.env.REACT_APP_OPENCAGEDATA_API_KEY;

export const unsplashUrl = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query={query}&client_id=${UNSPLASH_ACCESS_KEY}`;


export const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${API_KEY}`;

export const initialCenterMap = { lat: 46.4016958, lng: 30.713786799999994 };
export const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?&key=${GEO_API_KEY}&pretty=1`;

export const Units = {
  metric: 'metric',
  fahrenheit: 'fahrenheit',
};

export const Lang = {
  en: 'EN',
  ru: 'RU',
  be: 'BE',
};

export const defaultState = {
  isLoading: true,
  isFirstLoad: true,
  isShowError: false,
  error: {},
  errorMessage: '',
  currentLocation: '',
  forecast: [],
  backgroundUrl: '',
  timezone: 'Europe/Kiev',
  city: 'Odessa',
  country: 'Ukraine',
  mapCoordinates: [30.713786799999994, 46.4016958],
  mapInfo: "46° 24' 6.83568'' N",
  lang: 'en',
  units: 'metric',
};
