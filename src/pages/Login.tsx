import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('auth', username);
    navigate('/location');
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: 'linear-gradient(to right, #83a4d4, #b6fbff)',
      }}
    >
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px' }}>
        <div className="text-center mb-4">
          <div style={{ fontSize: '3rem' }}>🌤️</div>
          <h3 className="mt-2 fw-bold text-primary">Clima Inteligente</h3>
          <p className="text-muted">Ingresa para comenzar</p>
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Nombre de usuario</label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Tu nombre..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary btn-lg w-100 mt-3"
          onClick={handleLogin}
          disabled={!username}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
