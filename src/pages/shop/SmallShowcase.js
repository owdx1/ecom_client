import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import PersonIcon from '@mui/icons-material/Person';
import '../../styles/SmallShowcase.css';

const SmallShowcase = () => {
  return (
    <Box className="small-showcase-container">
      <NavLink to="/week-products" className="small-showcase-link">
        <IconButton className="small-showcase-icon-button">
          <StarIcon className="small-showcase-icon" />
        </IconButton>
        <span className="small-showcase-label">Haftanın Ürünleri</span>
      </NavLink>
      <NavLink to="/best-sellers" className="small-showcase-link">
        <IconButton className="small-showcase-icon-button">
          <WhatshotIcon className="small-showcase-icon" />
        </IconButton>
        <span className="small-showcase-label">En Çok Satanlar</span>
      </NavLink>
      <NavLink to="/new-arrivals" className="small-showcase-link">
        <IconButton className="small-showcase-icon-button">
          <Brightness2Icon className="small-showcase-icon" />
        </IconButton>
        <span className="small-showcase-label">Yeni Gelenler</span>
      </NavLink>
      <NavLink to="/recommended" className="small-showcase-link">
        <IconButton className="small-showcase-icon-button">
          <PersonIcon className="small-showcase-icon" />
        </IconButton>
        <span className="small-showcase-label">Sizin için Seçtiklerimiz</span>
      </NavLink>
    </Box>
  );
};

export default SmallShowcase;
