import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import PersonIcon from '@mui/icons-material/Person';
import '../../styles/SmallShowcase.css';
import CheckroomIcon from '@mui/icons-material/Checkroom';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const scrollToSelector = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const SmallShowcase = () => {
  return (
    <Box className="small-showcase-container">
      <div
        onClick={() => scrollToSelector('#week-products')}
        className="small-showcase-link"
      >
        <IconButton className="small-showcase-icon-button">
          <StarIcon className="small-showcase-icon" />
        </IconButton>
        <span className="small-showcase-label">Haftanın Ürünleri</span>
      </div>
      <div
        onClick={() => scrollToSelector('#best-sellers')}
        className="small-showcase-link"
      >
        <IconButton className="small-showcase-icon-button">
          <WhatshotIcon className="small-showcase-icon" />
        </IconButton>
        <span className="small-showcase-label">En Çok Satanlar</span>
      </div>
      <div
        onClick={() => scrollToSelector('#all-products')}
        className="small-showcase-link"
      >
        <IconButton className="small-showcase-icon-button">
          <CheckroomIcon className="small-showcase-icon" />
        </IconButton>
        <span className="small-showcase-label"> Tüm Ürünler </span>
      </div>
      <div
        onClick={() => scrollToSelector('#new-arrivals')}
        className="small-showcase-link"
      >
        <IconButton className="small-showcase-icon-button">
          <Brightness2Icon className="small-showcase-icon" />
        </IconButton>
        <span className="small-showcase-label">Yeni Gelenler</span>
      </div>
      <div
        onClick={() => scrollToSelector('#recommended')}
        className="small-showcase-link"
      >
        <IconButton className="small-showcase-icon-button">
          <PersonIcon className="small-showcase-icon" />
        </IconButton>
        <span className="small-showcase-label">Sizin için Seçtiklerimiz</span>
      </div>
    </Box>
  );
};

export default SmallShowcase;
