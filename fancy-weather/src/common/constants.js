export const API_KEY = process.env.REACT_APP_WEATHER_MAP_API_KEY;
export const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
export const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;
export const GEO_API_KEY = process.env.REACT_APP_OPENCAGEDATA_API_KEY;

export const unsplashUrl = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query={query}&client_id=${UNSPLASH_ACCESS_KEY}`;


export const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${API_KEY}`;
// export const weatherPlaceUrl = `${weatherBaseUrl}?city={city}&units={units}&lang={lang}&key=${API_KEY}`;
// export const weatherCoordsUrl = `${weatherBaseUrl}?lat={lat}&lon={lon}&lang={lang}&key=${API_KEY}`;

export const initialCenterMap = { lat: 46, lon: 30 };
export const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?&key=${GEO_API_KEY}&pretty=1`;
// export const geocodingPlaceUrl = `https://api.opencagedata.com/geocode/v1/json?q={place}&key=${GEO_API_KEY}&language={lang}&pretty=1`

export const Units = {
  metric: 'metric',
  fahrenheit: 'fahrenheit',
};

export const Lang = {
  en: 'EN',
  ru: 'RU',
  by: 'BY',
};