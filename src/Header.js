import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemText from '@mui/material/ListItemText';
import MuiBadge from '@mui/material/Badge';
import { ShoppingCart, Person, Menu } from '@mui/icons-material';
import '../src/styles/Header.css';

const Header = ({ isLoggedIn, onLogout, numberOfProductsInCart }) => {
  const [isHamburgerDropdownVisible, setHamburgerDropdownVisible] = useState(false);
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleHamburgerDropdownEnter = () => {
    setHamburgerDropdownVisible(true);
  };

  const handleHamburgerDropdownLeave = () => {
    setHamburgerDropdownVisible(false);
  };

  const handleProfileDropdownEnter = () => {
    setProfileDropdownVisible(true);
  };

  const handleProfileDropdownLeave = () => {
    setProfileDropdownVisible(false);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleHamburgerLinkClick = () => {
    setHamburgerDropdownVisible(false);
  };

  const handleProfileLinkClick = () => {
    setProfileDropdownVisible(false);
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

  return (
    <nav>
      <div className="header-left">
        
        <div
          className="dropdown"
          onMouseEnter={handleHamburgerDropdownEnter}
          onMouseLeave={handleHamburgerDropdownLeave}
        >
          <Menu className="hamburger-icon" />
          {isHamburgerDropdownVisible && (
            <Drawer anchor="left" open={isHamburgerDropdownVisible} onClose={handleHamburgerDropdownLeave}>
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
                onClose={handleHamburgerLinkClick}
              />
            </Drawer>
          )}
        </div>
        <div className="dropdown">
          <NavLink to="/">Anasayfa</NavLink>
        </div>
      </div>
      <div className="header-right">
        {isLoggedIn ? (
          <>
            <div className="dropdown">
              <NavLink to="/profile/cart" className="basket-icon">
                <MuiBadge badgeContent={numberOfProductsInCart} color="secondary">
                  <ShoppingCart />
                </MuiBadge>
              </NavLink>
            </div>
            <div
              className="dropdown"
              onMouseEnter={handleProfileDropdownEnter}
              onMouseLeave={handleProfileDropdownLeave}
            >
              <NavLink to="/profile" className="profile-icon">
                <Person />
              </NavLink>
              {isProfileDropdownVisible && (
                <Drawer anchor="right" open={isProfileDropdownVisible} onClose={handleProfileDropdownLeave}>
                  <LinkList
                    links={[
                      { to: '/profile' , label: 'Profilim'},
                      { to: '/profile/orders', label: 'Siparişlerim' },
                      { to: '/profile/cart', label: 'Sepetim' }
                      
                    ]}
                    onClose={handleProfileLinkClick}
                  />
                  <button className="logout-btn" onClick={handleLogout}>
                    Çıkış Yap
                  </button>
                </Drawer>
              )}
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
