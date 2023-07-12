import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../src/styles/Header.css';
import { useNavigate } from 'react-router-dom';
const Header = ({ isLoggedIn, onLogout }) => {

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsPopupVisible(true);
  };

  const handleMouseLeave = () => {
    setIsPopupVisible(false);
  };
  const handleLogout = () => {
    onLogout();
    navigate("/");// Call the provided logout function from the prop
  };

  return (
    <nav>
      <NavLink to="/">Anasayfa</NavLink>
      {isLoggedIn ? (
        <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <NavLink to="/profile">Profilim</NavLink>
          {isPopupVisible && (
            <div className="popup">
              
              <NavLink to="/profile/orders  ">Siparişlerim</NavLink>
              <NavLink to="/profile/cart  ">Sepetim</NavLink>
              <button className='logout-btn' onClick={handleLogout}>Çıkış Yap</button>
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
