import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useEffect } from "react";
import { ToastContainer , toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateInfo = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [backEndMessage, setBackEndMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorM , setErrorM] = useState('');

  const handleUpdateInfo = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch('http://localhost:5000/profile/update-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          firstName,
          lastName,
          address,
          postalcode,
          country,
          city,
          phoneNumber,
        }),
      });

      const responseData = await response.json();
      const { message } = responseData;
      setBackEndMessage(message);

      if (response.status === 200) {
        const newAccessToken = responseData.accessToken;
        localStorage.setItem('accessToken' , newAccessToken);
        setTimeout(() => {
          navigate('/profile');
        }, 3000);
      }
    } catch (error) {
      setErrorM(error)
      console.error(`Failed to change information: ${errorM}`);
    }
  };

  useEffect(() => {
    if (backEndMessage !== '') toast.warn(backEndMessage);
  }, [backEndMessage]);

  return (
    <Container maxWidth="md">
      <Box p={2}>
        <Typography variant="h4">Bilgi güncelleme</Typography>
        <TextField
          label="İsim"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Soyisim"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Ülke"
          fullWidth
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <TextField
          label="Şehir"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="Adres"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="Posta kodu"
          fullWidth
          value={postalcode}
          onChange={(e) => setPostalcode(e.target.value)}
        />
        <TextField
          label="Telefon numarası"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateInfo}
          fullWidth
          style={{ marginTop: "10px" }}
        >
          Bilgilerimi Güncelle
        </Button>
        <Button
          component={Link}
          to="/profile"
          variant="outlined"
          color="primary"
          fullWidth
          style={{ marginTop: "10px" }}
        >
          İptal
        </Button>
      </Box>
      <ToastContainer/>  
    </Container>
  );
};

export default UpdateInfo;
