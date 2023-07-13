import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../src/styles/Header.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isHomeDropdownVisible, setIsHomeDropdownVisible] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsPopupVisible(true);
  };

  const handleMouseLeave = () => {
    setIsPopupVisible(false);
  };

  const handleHomeDropdownEnter = () => {
    setIsHomeDropdownVisible(true);
  };

  const handleHomeDropdownLeave = () => {
    setIsHomeDropdownVisible(false);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav>
      <div
        className="dropdown"
        onMouseEnter={handleHomeDropdownEnter}
        onMouseLeave={handleHomeDropdownLeave}
      >
        <NavLink to="/">Anasayfa</NavLink>
        {isHomeDropdownVisible && (
          <div className="popup">
            <NavLink to="/home/link1">Link 1</NavLink>
            <NavLink to="/home/link2">Link 2</NavLink>
            
          </div>
        )}
      </div>

      {isLoggedIn ? (
        <div
          className="dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          
        >
          <NavLink to="/profile">Profilim</NavLink>
          {isPopupVisible && (
            <div className="popup">
              <NavLink to="/profile/orders">Siparişlerim</NavLink>
              <NavLink to="/profile/cart">Sepetim</NavLink>
              <button className="logout-btn" onClick={handleLogout}>
                Çıkış Yap
              </button>
            </div>
          )}
        </div>
      ) : (
        <NavLink to="/login">Giriş Yap</NavLink>
      )}
    </nav>
  );
};

export default Header;
