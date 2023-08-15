// HorizontalSection.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { Container, Grid, Paper, Typography } from '@mui/material';
import '../../styles/HorizontalSection.css';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LooksIcon from '@mui/icons-material/Looks';
import PhoneIcon from '@mui/icons-material/Phone';

const CustomIcon = ({ children }) => {
  return (
    <div className="custom-icon">
      {children}
    </div>
  );
};

const HorizontalSection = () => {
  const itemStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '16px',
    height: '240px',
  };

  return (
    <Paper className="horizontal-section-container">
      <Container>
        <Grid container>
          
          <Grid item xs={12} sm={6} md={3} style={itemStyle}>
            <NavLink to="/phone" className="horizontal-section-link">
              <CustomIcon>
                <PhoneIcon fontSize="inherit"  style={{ fontSize: 100, color:'gray'}} />
              </CustomIcon>
              <Typography variant="body1" className="horizontal-section-label">
                TELEFONLA DESTEK
              </Typography>
            </NavLink>
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={itemStyle}>
            <NavLink to="/shipping" className="horizontal-section-link">
              <CustomIcon>
                <LocalShippingIcon fontSize="inherit"  style={{ fontSize: 100, color:'gray'}}/>
              </CustomIcon>
              <Typography variant="body1" className="horizontal-section-label">
                ÜCRETSİZ KARGO
              </Typography>
            </NavLink>
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={itemStyle}>
            <NavLink to="/basket" className="horizontal-section-link">
              <CustomIcon>
                <ShoppingBasketIcon fontSize="inherit" style={{ fontSize: 100, color:'gray'}}/>
              </CustomIcon>
              <Typography variant="body1" className="horizontal-section-label">
                İADE
              </Typography>
            </NavLink>
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={itemStyle}>
            <NavLink to="/warranty" className="horizontal-section-link">
              <CustomIcon>
                <LooksIcon fontSize="inherit"  style={{ fontSize: 100, color:'gray'}}/>
              </CustomIcon>
              <Typography variant="body1" className="horizontal-section-label">
                ÜRÜN GARANTİSİ
              </Typography>
            </NavLink>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default HorizontalSection;
