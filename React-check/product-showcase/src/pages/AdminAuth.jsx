import React, { useState } from 'react';
import AdminPage from './AdminPage';
import '../Admin.css';
import '../AdminAuth.css';

const AdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isAuthenticated) {
    return <AdminPage />;
  }

  return (
    <div className="admin-page">
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Admin Login</h2>
          
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Username"
              className="auth-input"
              required
            />
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              className="auth-input"
              required
            />
            <button
              type="submit"
              className="auth-button"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;