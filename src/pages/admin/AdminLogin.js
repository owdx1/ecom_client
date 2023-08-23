import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {Container , Typography , Grid , TextField} from '@mui/material';

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
    return <Navigate to="/admin/denemedashboard" />;
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '30px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Giriş
      </Typography>
      {errorMessage && (
        <Typography variant="body2" color="error" align="center">
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleLogin}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="username"
              label="Username"
              variant="outlined"
              value={username}
              onChange={handleUsernameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Giriş Yap
        </Button>
      </form>
    </Container>
  );
}

export default AdminLogin;
