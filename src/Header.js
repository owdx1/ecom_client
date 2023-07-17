import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
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

  return (
    <nav>
      <div className="header-left">
        <div className="dropdown">
          <NavLink to="/">Anasayfa</NavLink>
        </div>
        <div
          className="dropdown"
          onMouseEnter={handleHamburgerDropdownEnter}
          onMouseLeave={handleHamburgerDropdownLeave}
        >
          <AiOutlineMenu className="hamburger-icon" />
          {isHamburgerDropdownVisible && (
            <div className="hamburger-dropdown popup-hamburger">
              <div className="popup-hamburger">
                <NavLink to="/search?search_parameter=u-flex likrali takim">u-Flex Likralı Takımlar</NavLink>
                <NavLink to="/search?search_parameter=coro-flex likrali takim">coro-Flex Likralı Takımlar</NavLink>
                <NavLink to="/search?search_parameter=tek üst">Tek üst </NavLink>
                <NavLink to="/search?search_parameter=desenli">Desenli Ürünler</NavLink>
                <NavLink to="/search?search_parameter=tesettür">Likralı Tesettürler</NavLink>
                <NavLink to="/search?search_parameter=bone">Boneler</NavLink>
                <NavLink to="/search?search_parameter=terlik">Terlikler</NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="header-right">
        {isLoggedIn ? (
          <>
            <div className="dropdown">
              <NavLink to="/profile/cart" className="basket-icon">
                <FaShoppingCart />
                {numberOfProductsInCart > 0 && (
                  <span className="cart-counter">{numberOfProductsInCart}</span>
                )}
              </NavLink>
            </div>
            <div
              className="dropdown"
              onMouseEnter={handleProfileDropdownEnter}
              onMouseLeave={handleProfileDropdownLeave}
            >
              <NavLink to="/profile" className="profile-icon">
                <FaUser />
              </NavLink>
              {isProfileDropdownVisible && (
                <div className="profile-dropdown popup-profile">
                  <div className="popup-profile">
                    <NavLink to="/profile/orders">Siparişlerim</NavLink>
                    <NavLink to="/profile/cart">Sepetim</NavLink>
                    <button className="logout-btn" onClick={handleLogout}>
                      Çıkış Yap
                    </button>
                  </div>
                </div>
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
