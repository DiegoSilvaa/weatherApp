// src/pages/LocationWeatherPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadWeatherDataFromLocation, setUnit } from '../features/weatherSlice';
import { RootState, AppDispatch } from '../store/store';
import ForecastCard from '../components/ForecastCard';
import HourlyChart from '../components/HourlyChart';
import { format } from 'date-fns';

const LocationWeatherPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { current, forecast, loading, unit, locationSource } = useSelector((state: RootState) => state.weather);
  
  useEffect(() => {
    dispatch(loadWeatherDataFromLocation());
  }, [dispatch, unit]);

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as 'metric' | 'imperial';
    localStorage.setItem('weather_unit', newUnit);
    dispatch(setUnit(newUnit));
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-3">📍 Clima en tu ubicación</h1>
      <div className="text-center mb-4">
        <label className="me-2">Unidad:</label>
        <select value={unit} onChange={handleUnitChange} className="form-select d-inline w-auto">
          <option value="metric">Celsius (°C)</option>
          <option value="imperial">Fahrenheit (°F)</option>
        </select>
      </div>

      {locationSource && <p className="text-center text-muted">Ubicación por: <strong>{locationSource}</strong></p>}
      {loading && <p className="text-center">Cargando...</p>}
      {current && (
        <div className="card p-4 mb-4 shadow rounded-4">
          <h4 className="mb-2">Clima actual: {current.name}</h4>
          <p><strong>Temperatura:</strong> {Math.round(current.main.temp)}°</p>
        </div>
      )}
      {forecast.length > 0 && (
        <>
          <h4>Pronóstico</h4>
          <div className="d-flex gap-3 overflow-auto">
            {forecast
              .filter((_, i) => i % 8 === 0)
              .slice(0, 5)
              .map((item, idx) => (
                <ForecastCard
                  key={idx}
                  date={format(new Date(item.dt * 1000), 'EEEE')}
                  min={Math.round(item.main.temp_min)}
                  max={Math.round(item.main.temp_max)}
                  icon={item.weather[0].icon}
                  description={item.weather[0].description}
                />
              ))}
          </div>
          <HourlyChart data={forecast} />
        </>
      )}
    </div>
  );
};

export default LocationWeatherPage;
