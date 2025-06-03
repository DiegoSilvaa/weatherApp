// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import LocationWeatherPage from './pages/LocationWeatherPage';
import CityWeatherPage from './pages/CityWeatherPage';
import ProtectedRoute from './routes/ProtectedRoute';
import WeatherLayout from './layout/WeatherLayout';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <WeatherLayout />
          </ProtectedRoute>
        }
      >
        <Route path="location" element={<LocationWeatherPage />} />
        <Route path="city" element={<CityWeatherPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
