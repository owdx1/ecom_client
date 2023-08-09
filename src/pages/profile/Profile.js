import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Typography, TextField, Button, Box, Grid } from "@mui/material";

import "../../styles/Profile.css";

const Profile = ({ onLogout }) => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [changePasswordMessage, setChangePasswordMessage] = useState("");

  useEffect(() => {
    toast.done(changePasswordMessage);
  }, [changePasswordMessage]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Current accessToken", accessToken);
    if (!accessToken || accessToken === "undefined") {
      navigate("/error");
    } else {
      fetchProfile(accessToken);
    }
  }, []);

  const fetchProfile = async (accessToken) => {
    try {
      const response = await fetch("http://localhost:5000/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        onLogout();
        navigate("/");
      }

      if (!response.ok) {
        throw new Error("Error fetching profile");
      }

      const data = await response.json();
      const { customer, accessToken: newAccessToken } = data;

      localStorage.setItem("accessToken", newAccessToken);
      console.log("New accessToken", newAccessToken);
      setCustomer(customer);
      console.log("suanki customerim", customer);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleUpdateInfo = () => {
    navigate('/profile/update')
  };

  const handleMyOrders = () => {
    
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const handleChangePassword = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      if (!oldPassword || !newPassword || !newPasswordRepeat) {
        toast.error("Please fill in all password fields.");
        return;
      }

      const response = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({oldPassword, newPassword, newPasswordRepeat}),
      });

      const data = await response.json();
      console.log("suan aldıgım data", data);
      setChangePasswordMessage(data.message);

      if (response.status === 200) {
        const newAccessToken = data.accessToken;
        localStorage.setItem('accessToken' , newAccessToken);
        setTimeout(() => {
          handleLogout();
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error(changePasswordMessage);
    }
  };

  useEffect(() => {
    if (changePasswordMessage !== '') toast.warn(changePasswordMessage);
  }, [changePasswordMessage]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" className="profile-container">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box p={2}>
            <Typography variant="h4">Profil Bilgisi</Typography>
            <Typography>
              <span className="label">İsim:</span> {customer.first_name} {customer.last_name}
            </Typography>
            
            <Typography>
              <span className="label">Email:</span> {customer.email}
            </Typography>
            <Typography>
              <span className="label">Adres:</span> {customer.address}
            </Typography>
            <Typography>
              <span className="label">Şehir:</span> {customer.city}
            </Typography>
            <Typography>
              <span className="label">Ülke:</span> {customer.country}
            </Typography>
          </Box>
        </Grid>
        <div className="button-container">
        
        <Button variant="contained" color="primary" onClick={handleUpdateInfo}>
          Bilgilerimi Güncelle
        </Button>
        <NavLink to='/profile/orders'>
          <Button variant="contained" color="primary" onClick={handleMyOrders}>
            Siparişlerim
          </Button>
        </NavLink>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Çıkış Yap
        </Button>
      </div>
        <Grid item xs={12} md={6}>
          <Box p={2}>
            <Typography variant="h4">Şifre değiştirme</Typography>
            <TextField
              type="text"
              label="Eski Şifre"
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              type="text"
              label="Yeni Şifre"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              type="text"
              label="Yeni Şifre Tekrar"
              fullWidth
              value={newPasswordRepeat}
              onChange={(e) => setNewPasswordRepeat(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
              fullWidth
              style={{ marginTop: "10px" }}
            >
              Şifre Değiştir
            </Button>
          </Box>
        </Grid>
      </Grid>

      

      <ToastContainer /> 
    </Container>
  );
};

export default Profile;
