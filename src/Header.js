import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemText from '@mui/material/ListItemText';
import MuiBadge from '@mui/material/Badge';
import { ShoppingCart, Person, Menu } from '@mui/icons-material';
import { Popover, Button, Box , Badge} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../src/styles/Header.css';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout, numberOfProductsInCart }) => {
  const [isHamburgerDropdownVisible, setHamburgerDropdownVisible] = useState(false);
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleHamburgerButtonClick = () => {
    setHamburgerDropdownVisible(!isHamburgerDropdownVisible);
    setProfileDropdownVisible(false); // Close the profile dropdown if open
  };

  const handleProfileButtonClick = () => {
    setProfileDropdownVisible(!isProfileDropdownVisible);
    setHamburgerDropdownVisible(false); // Close the hamburger dropdown if open
  };

  const handleCloseDropdowns = () => {
    setHamburgerDropdownVisible(false);
    setProfileDropdownVisible(false);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const Drawer = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
      width: '250px',
    },
  }));

  const LinkList = ({ links, onClose }) => (
    <MuiList>
      {links.map(({ to, label }) => (
        <MuiListItem button key={to} component={NavLink} to={to} onClick={onClose}>
          <MuiListItemText primary={label} />
        </MuiListItem>
      ))}
    </MuiList>
  );

  // Custom Popover component for the hamburger dropdown
  const HamburgerDropdown = () => (
    <Popover
      open={isHamburgerDropdownVisible}
      onClose={handleCloseDropdowns}
      anchorReference="anchorEl"
      anchorEl={document.getElementById('hamburger-icon')}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box sx={{ p: 2, minWidth: '12rem' }}>
        <LinkList
          links={[
            { to: '/search?search_parameter=u-flex likrali takim', label: 'u-Flex Likralı Takımlar' },
            { to: '/search?search_parameter=coro-flex likrali takim', label: 'coro-Flex Likralı Takımlar' },
            { to: '/search?search_parameter=tek üst', label: 'Tek üst' },
            { to: '/search?search_parameter=desenli', label: 'Desenli Ürünler' },
            { to: '/search?search_parameter=tesettür', label: 'Likralı Tesettürler' },
            { to: '/search?search_parameter=bone', label: 'Boneler' },
            { to: '/search?search_parameter=terlik', label: 'Terlikler' },
          ]}
          onClose={handleCloseDropdowns}
        />
      </Box>
    </Popover>
  );

  // Custom Popover component for the profile dropdown
  const ProfileDropdown = () => (
    <Popover
      open={isProfileDropdownVisible}
      onClose={handleCloseDropdowns}
      anchorReference="anchorEl"
      anchorEl={document.getElementById('profile-icon')}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box sx={{ p: 2, minWidth: '12rem' }}>
        <LinkList
          links={[
            { to: '/profile', label: 'Profilim' },
            { to: '/profile/orders', label: 'Siparişlerim' },
            { to: '/profile/cart', label: 'Sepetim' }
          ]}
          onClose={handleCloseDropdowns}
        />
        <Button className="logout-btn" onClick={handleLogout} fullWidth>
          Çıkış Yap
        </Button>
      </Box>
    </Popover>
  );

  return (
    <nav>
      <div className="header-left">
        <div
          className="dropdown"
          onClick={handleHamburgerButtonClick}
        >
          <Menu id="hamburger-icon" className="hamburger-icon" />
          {isHamburgerDropdownVisible && <HamburgerDropdown />}
        </div>
        <div className="dropdown">
          <NavLink to="/">Anasayfa</NavLink>
        </div>
      </div>
      <div className="header-right">
        {isLoggedIn ? (
          <>
            <div> İletişime Geçin!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to={'https://wa.me/905322557015'} target="_blank" rel="noopener noreferrer">
                <Badge color="secondary" variant="dot">
                  <WhatsAppIcon color="action" />
                </Badge>
              </Link>
            </div>
            <div className="dropdown">
              <NavLink to="/profile/cart" className="basket-icon">
                <MuiBadge badgeContent={numberOfProductsInCart} color="secondary">
                  <ShoppingCart />
                </MuiBadge>
              </NavLink>
            </div>
            <div
              className="dropdown"
              onClick={handleProfileButtonClick}
            >
              <NavLink  id="profile-icon" className="profile-icon">
                <Person />
              </NavLink>
              {isProfileDropdownVisible && <ProfileDropdown />}
            </div>
            


          </>
        ) : (
          <div className="dropdown">
            <NavLink to="/login">Giriş yap</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
