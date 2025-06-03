// src/layout/WeatherLayout.tsx
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const WeatherLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="d-flex min-vh-100">
      <aside className="bg-light border-end p-3 d-flex flex-column" style={{ width: '240px' }}>
        <h5 className="mb-4 text-center">☀️ Clima App</h5>

        <NavLink
          to="/location"
          className={({ isActive }) =>
            `btn mb-2 text-start ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
          }
        >
          📍 Mi ubicación
        </NavLink>

        <NavLink
          to="/city"
          className={({ isActive }) =>
            `btn mb-4 text-start ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
          }
        >
          🏙️ Por ciudad
        </NavLink>

        <button onClick={handleLogout} className="btn btn-danger mt-auto">
          🚪 Cerrar sesión
        </button>
      </aside>

      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default WeatherLayout;
