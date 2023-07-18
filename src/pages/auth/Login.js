import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../images/aydinmedikal.jpg';
import '../../styles/Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { accessToken, message } = await response.json();

        localStorage.setItem('accessToken', accessToken);
        onLogin();
        navigate('/', { state: { toastMessage: message } });
      } else {
        const { message } = await response.json();
        throw new Error(message);
      }
    } catch (error) {
      setError(`Failed to log in: ${error.message}`);
      toast.error(`Failed to log in: ${error.message}`);
    }
  };

  return (
    <div className="login-page">
      <img src={logo} alt="Logo" className="logo" />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log in</button>
          <NavLink to="/forget-password">Forgot Password?</NavLink>
          <NavLink to="/register" className="navlink-register">
            <div className="login-navlink-container">
              <p>You can register here!</p>
            </div>
          </NavLink>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;
