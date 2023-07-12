import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      console.log("giris yaparkenki kullanici adi ve sifre" , username , password);
      if (response.status === 200) {
        const { adminToken, message } = await response.json();

        localStorage.setItem('adminToken', adminToken);
        console.log(message);
        setIsLoggedIn(true);
      } else {
        setErrorMessage('Unauthorized access');
      }
    } catch (error) {
      setErrorMessage('Server error');
    }
  };
  
  if (isLoggedIn) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
