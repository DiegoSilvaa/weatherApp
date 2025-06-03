import axios from 'axios';

const OPEN_WEATHER_API_KEY = '0e7db23053e0848c90f8c6c3be652933';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (lat: number, lon: number, units: 'metric' | 'imperial') => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      units,
      appid: OPEN_WEATHER_API_KEY,
    },
  });
  return response.data;
};

export const get5DayForecast = async (lat: number, lon: number, units: 'metric' | 'imperial') => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      units,
      appid: OPEN_WEATHER_API_KEY,
    },
  });
  return response.data;
};

export const getCurrentWeatherByCity = async (city: string, units: 'metric' | 'imperial') => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units,
      appid: OPEN_WEATHER_API_KEY,
    },
  });
  return response.data;
};

export const get5DayForecastByCity = async (city: string, units: 'metric' | 'imperial') => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      units,
      appid: OPEN_WEATHER_API_KEY,
    },
  });
  return response.data;
};