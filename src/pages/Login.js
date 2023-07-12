import React, { useState } from 'react';
import '../styles/Login.css';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { accessToken , message } = await response.json();
        localStorage.setItem('accessToken', accessToken);
        console.log(message);
        setLoginSuccess(true);
        navigate('/');

      } else {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
    } catch (error) {
      setError(`Failed to log in: ${error.message}`);
    }
  };

  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={handleLogin}>
        <input
          className="inputField"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="inputField"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="loginButton" type="submit">
          Log In
        </button>
        {error && <p className="errorMsg">{error}</p>}
        <NavLink className="registerLink" to="/register">
          New here? Register now
        </NavLink>
      </form>
      {loginSuccess && <NavLink to="/" />}
    </div>
  );
}
