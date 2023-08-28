// HorizontalSection.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { Container, Grid, Paper, Typography } from '@mui/material';
import '../../styles/HorizontalSection.css';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LooksIcon from '@mui/icons-material/Looks';
import PhoneIcon from '@mui/icons-material/Phone';
import { useState } from 'react';
import {Button} from '@mui/material';
import {Popover} from '@mui/material';
import { Link } from 'react-router-dom';
import { WhatsApp } from '@mui/icons-material';

const CustomIcon = ({ children }) => {
  return (
    <div className="custom-icon">
      {children}
    </div>
  );
};
  


const HorizontalSection = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



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
            <Button
              aria-describedby={id}
              onClick={handleClick}
              className="horizontal-section-link"
            >
              <CustomIcon>
                <PhoneIcon fontSize="inherit" style={{ fontSize: 100, color: 'gray' }} />
              </CustomIcon>
              <Typography variant="body1" className="horizontal-section-label">
                TELEFONLA DESTEK,diğerlerini de tamamla
              </Typography>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Link
                to={`https://wa.me/905322557015`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}
              >
                <div style={{display:'flex' , alignItems:'center' , justifyContent:'center', margin:'10px 10px' , borderRadius:'10px'}}>
                  <WhatsApp style={{ fontSize: '40px', color: 'green', marginBottom: '10px', textDecoration:'none' , marginLeft:'10px'}} />
                  <Typography variant="h6" color="text.secondary" style={{marginLeft:'8px'}}>
                    WhatsApp'tan iletişime geçin!
                  </Typography>
                  
                </div>
              </Link>
            </Popover>
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
