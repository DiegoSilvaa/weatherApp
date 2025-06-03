import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getCurrentWeather,
  get5DayForecast,
  getCurrentWeatherByCity,
  get5DayForecastByCity,
} from '../services/weatherApi';
import { getLocation } from '../services/locationService';
import {
  WeatherState,
  UnitType,
  LocationSource,
  CurrentWeather,
  ForecastItem,
} from '../types/WeatherTypes';

const initialState: WeatherState = {
  current: null,
  forecast: [],
  loading: false,
  error: null,
  unit: 'metric',
  locationSource: null,
  selectedCity: null, // ✅ nuevo campo
};

// Carga usando ubicación del navegador o IP
export const loadWeatherDataFromLocation = createAsyncThunk<
  { current: CurrentWeather; forecast: ForecastItem[]; source: LocationSource },
  void,
  { state: { weather: WeatherState } }
>('weather/loadFromLocation', async (_, { getState, rejectWithValue }) => {
  try {
    const { lat, lon, source } = await getLocation();
    const unit = getState().weather.unit;

    const current = await getCurrentWeather(lat, lon, unit);
    const forecastData = await get5DayForecast(lat, lon, unit);

    return {
      current,
      forecast: forecastData.list.slice(0, 40),
      source,
    };
  } catch (error) {
    return rejectWithValue('Error al obtener datos del clima');
  }
});

// Carga usando nombre de ciudad
export const loadWeatherDataByCity = createAsyncThunk<
  { current: CurrentWeather; forecast: ForecastItem[]; source: LocationSource },
  string,
  { state: { weather: WeatherState } }
>('weather/loadByCity', async (city, { getState, rejectWithValue }) => {
  try {
    const unit = getState().weather.unit;
    const current = await getCurrentWeatherByCity(city, unit);
    const forecastData = await get5DayForecastByCity(city, unit);

    return {
      current,
      forecast: forecastData.list.slice(0, 40),
      source: 'manual' as LocationSource,
    };
  } catch (error) {
    return rejectWithValue('No se pudo obtener el clima para la ciudad');
  }
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setUnit: (state, action: PayloadAction<UnitType>) => {
      state.unit = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<string | null>) => {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWeatherDataFromLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadWeatherDataFromLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.current;
        state.forecast = action.payload.forecast;
        state.locationSource = action.payload.source;
        state.selectedCity = null; // ✅ reinicia ciudad seleccionada si se usa ubicación
      })
      .addCase(loadWeatherDataFromLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadWeatherDataByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadWeatherDataByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.current;
        state.forecast = action.payload.forecast;
        state.locationSource = action.payload.source;
      })
      .addCase(loadWeatherDataByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUnit, setSelectedCity } = weatherSlice.actions;
export default weatherSlice.reducer;
