import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpScreen.css';

const SignUpScreen = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add your API call for sign-up here
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Sign-up failed');
      }

      navigate('/login'); // Redirect to login or another page after successful sign-up
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-screen">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Sign Up</h1>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpScreen;
