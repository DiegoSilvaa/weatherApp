// src/components/CitySelector.tsx
import React, { useEffect, useState } from 'react';

interface Props {
  onCitySelect: (city: string) => void;
}

const CitySelector: React.FC<Props> = ({ onCitySelect }) => {
  const [cityInput, setCityInput] = useState('');
  const [savedCities, setSavedCities] = useState<string[]>([]);

  // Leer ciudades guardadas al cargar
  useEffect(() => {
    const stored = localStorage.getItem('saved_cities');
    if (stored) {
      setSavedCities(JSON.parse(stored));
    }
  }, []);

  const saveToLocalStorage = (cities: string[]) => {
    localStorage.setItem('saved_cities', JSON.stringify(cities));
  };

  const addCity = () => {
    const city = cityInput.trim();
    if (!city || savedCities.includes(city)) return;
    const updated = [...savedCities, city];
    setSavedCities(updated);
    saveToLocalStorage(updated);
    setCityInput('');
  };

  const removeCity = (city: string) => {
    const updated = savedCities.filter((c) => c !== city);
    setSavedCities(updated);
    saveToLocalStorage(updated);
  };

  return (
    <div className="card p-3 mb-4 rounded-4 shadow">
      <h5>Ciudades Guardadas</h5>
      <div className="d-flex gap-2 mb-2">
        <input
          className="form-control"
          placeholder="Ej. Monterrey"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addCity}>
          Agregar
        </button>
      </div>

      {savedCities.length === 0 && <p className="text-muted">No hay ciudades guardadas.</p>}

      <ul className="list-group">
        {savedCities.map((city) => (
          <li key={city} className="list-group-item d-flex justify-content-between align-items-center">
            <span onClick={() => onCitySelect(city)} role="button">
              📍 {city}
            </span>
            <button className="btn btn-sm btn-outline-danger" onClick={() => removeCity(city)}>
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySelector;
