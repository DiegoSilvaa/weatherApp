import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadWeatherDataByCity,
  setUnit,
  setSelectedCity,
} from '../features/weatherSlice';
import { RootState, AppDispatch } from '../store/store';
import ForecastCard from '../components/ForecastCard';
import { format } from 'date-fns';
import HourlyChart from '../components/HourlyChart';
import CitySelector from '../components/CitySelector';

const CityWeatherPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    current,
    forecast,
    loading,
    error,
    unit,
    selectedCity,
  } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    const savedUnit = localStorage.getItem('weather_unit') as 'metric' | 'imperial';
    const lastCity = localStorage.getItem('last_selected_city');

    if (savedUnit) dispatch(setUnit(savedUnit));
    if (lastCity) {
      dispatch(setSelectedCity(lastCity));
      dispatch(loadWeatherDataByCity(lastCity));
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedCity) {
      dispatch(loadWeatherDataByCity(selectedCity));
    }
  }, [dispatch, unit, selectedCity]);

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as 'metric' | 'imperial';
    localStorage.setItem('weather_unit', newUnit);
    dispatch(setUnit(newUnit));
  };

  const handleCitySelect = async (city: string) => {
    localStorage.setItem('last_selected_city', city);
    dispatch(setSelectedCity(city));
    const result = await dispatch(loadWeatherDataByCity(city));

    if (loadWeatherDataByCity.rejected.match(result)) {
      alert(`No se pudo obtener el clima para "${city}". Verifica que el nombre esté bien escrito.`);
      localStorage.removeItem('last_selected_city');
      dispatch(setSelectedCity(null));
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-primary text-center mb-3">🌍 Clima por ciudad</h1>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <div>
          <label className="me-2 fw-semibold">Unidad:</label>
          <select value={unit} onChange={handleUnitChange} className="form-select d-inline w-auto shadow-sm">
            <option value="metric">🌡️ Celsius (°C)</option>
            <option value="imperial">🔥 Fahrenheit (°F)</option>
          </select>
        </div>

        <div className="text-center">
          <CitySelector onCitySelect={handleCitySelect} />
        </div>
      </div>

      {loading && <p className="text-center">Cargando clima...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && current && (
        <div className="card shadow-lg p-4 mb-5 rounded-4 border-0">
          <div className="d-flex align-items-center flex-wrap gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
              alt={current.weather[0].description}
              className="mx-auto"
              style={{ width: 100, height: 100 }}
            />
            <div className="flex-grow-1">
              <h4 className="text-primary mb-3">Clima en {current.name}</h4>
              <ul className="list-unstyled mb-0">
                <li><strong>Temperatura:</strong> {Math.round(current.main.temp)}°</li>
                <li><strong>Sensación térmica:</strong> {Math.round(current.main.feels_like)}°</li>
                <li><strong>Humedad:</strong> {current.main.humidity}%</li>
                <li>
                  <strong>Viento:</strong>{' '}
                  {unit === 'metric'
                    ? `${(current.wind.speed * 3.6).toFixed(1)} km/h`
                    : `${current.wind.speed.toFixed(1)} mph`}
                </li>
                <li><strong>Presión:</strong> {current.main.pressure} hPa</li>
                <li><strong>Descripción:</strong> {current.weather[0].description}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {!loading && forecast.length > 0 && (
        <>
          <div className="mb-4">
            <h4 className="text-secondary mb-3">Pronóstico de los próximos 5 días</h4>
            <div className="d-flex gap-3 overflow-auto pb-2">
              {forecast
                .filter((_, idx) => idx % 8 === 0)
                .slice(0, 5)
                .map((item, index) => (
                  <ForecastCard
                    key={index}
                    date={format(new Date(item.dt * 1000), 'EEEE')}
                    min={Math.round(item.main.temp_min)}
                    max={Math.round(item.main.temp_max)}
                    icon={item.weather[0].icon}
                    description={item.weather[0].description}
                  />
                ))}
            </div>
          </div>

          <div className="card shadow-sm p-3 rounded-4">
            <h5 className="mb-3 text-center text-info">Temperatura por hora</h5>
            <HourlyChart data={forecast} />
          </div>
        </>
      )}
    </div>
  );
};

export default CityWeatherPage;
