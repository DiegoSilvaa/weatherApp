export type UnitType = 'metric' | 'imperial';
export type LocationSource = 'geolocation' | 'ip' | null;

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  pop: number;
  rain?: { '3h': number };
}

export interface CurrentWeather {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface WeatherState {
  current: CurrentWeather | null;
  forecast: ForecastItem[];
  loading: boolean;
  error: string | null;
  unit: UnitType;
  locationSource: LocationSource;
  selectedCity: string | null;
}
