import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './LoginScreen.css'; // Import the CSS file

const LoginScreen = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-screen">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit" onSubmit={async (event) => {
          event.preventDefault();
          login(username, password);
        }}>Log In</button>
      </form>
    </div>
  );
};

export default LoginScreen;