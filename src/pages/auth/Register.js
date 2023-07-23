import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { ToastContainer , toast } from 'react-toastify';
import { useEffect } from 'react';

const defaultTheme = createTheme();

export default function SignUp() {
  const [email, setEmail] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [postalcode, setPostalCode] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [lastname, setLastName] = React.useState('');
  const [city, setCity] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [backEndMessage, setBackEndMessage] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password1,
          password2,
          address,
          postalcode,
          country,
          firstname,
          lastname,
          city,
          phoneNumber,
        }),
      });

      const responseData = await response.json();
      const { message } = responseData;
      const { loggedIn } = responseData;
      setIsLoggedIn(loggedIn);
      setBackEndMessage(message);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to register');
      }
    } catch (error) {
      setError(`Failed to register: ${error.message}`);
    }
  };

  useEffect(() => {
    if (backEndMessage !== '') toast.warn(backEndMessage);
  }, [backEndMessage]);

  useEffect(() => {
    let intervalId;

    if (isLoggedIn) {
      intervalId = setInterval(() => {
        navigate('/login');
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isLoggedIn, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Kayıt ol
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="İsim"
                  autoFocus
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Soyisim"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label="Şifre"
                  type="password"
                  id="password1"
                  autoComplete="new-password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Şifre Tekrarı"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Adres"
                  type="text"
                  id="address"
                  autoComplete="new-password"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="country"
                  label="Ülke"
                  type="text"
                  id="country"
                  autoComplete="new-password"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="Şehir"
                  type="text"
                  id="city"
                  autoComplete="new-password"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="postalcode"
                  label="Posta kodu"
                  type="text"
                  id="postalcode"
                  autoComplete="new-password"
                  value={postalcode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Telefon numarası"
                  type="text"
                  id="phoneNumber"
                  autoComplete="new-password"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="E-posta aracılığıyla kampanyalardan ve fırsatlardan haberdar olmayı kabul ediyorum."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Kayıt ol
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Hesabınız var mı? Giriş yapın.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer/>
      </Container>
    </ThemeProvider>
  );
}
