import React from 'react'
import { NavLink } from 'react-router-dom'
import '../src/styles/Header.css'

const Header = () => {

  const accessToken = localStorage.getItem('accessToken');

  // localhosttan accesstoken diye mi yoksa token diye mi alınması gerektiğinden emin değilim
  return (
    <nav>
      <NavLink to='/'>Anasayfa</NavLink>
      {accessToken ? (<NavLink to="/profile"> Profilim </NavLink>) : (<NavLink to="/login"> Giriş Yap </NavLink>)}
    </nav>
  )
}

export default Header