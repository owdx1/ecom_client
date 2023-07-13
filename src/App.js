import './App.css';
import { Route, Routes} from 'react-router-dom';
import Shop from './pages/shop/Shop';
import Contact from './pages/Contact';
import Header from './Header';
import AdminLogin from './pages/admin/AdminLogin';
import Dash from './pages/admin/Dash';
import AddAProduct from './pages/admin/AddAProduct';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register';
import PatchASingleProduct from './pages/admin/PatchASingleProduct';

import { useState, useEffect } from 'react';
import Profile from './pages/profile/Profile';
import Cart from './pages/profile/Cart';
import ASingleProduct from './pages/shop/ASingleProduct';
import Error  from './utils/Error';
import ImageSlider from './utils/ImagesSlider';



function App() {

  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const slides = [

    {url:'https://images.wallpaperscraft.com/image/single/lion_art_colorful_122044_1600x900.jpg' , title:'lion'},
    {url:'https://images.wallpaperscraft.com/image/single/laptop_keyboard_glow_170138_1600x900.jpg' , title:'laptop'},
    {url:'https://images.wallpaperscraft.com/image/single/drone_camera_technology_171576_1600x900.jpg' , title:'drone'},
    {url:'https://images.wallpaperscraft.com/image/single/code_programming_text_140050_1600x900.jpg' , title:'coding'},
    

  ]


  useEffect(() =>{
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) setIsLoggedIn(true);
  }, [])

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('accessToken');
  };
  const containerStyles = {
    width : "1900px",
    height: "600px",
    margin: "70px auto"
  }
  return (
    <>
      <Header isLoggedIn= {isLoggedIn} onLogout={handleLogout}/>
      <div style={containerStyles}>
        <ImageSlider slides={slides}/>
      </div>
      
      
      <Routes>
        <Route path='/' element={<Shop />}></Route>
        
        <Route path='/shop/products/:product_id' element={<ASingleProduct />}></Route>


        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/profile/cart' element={<Cart />}></Route>





        <Route path='/login' element={<Login onLogin={() => setIsLoggedIn(true)}/>} />
        <Route path='/register' element={<Register/>} />


        
        <Route path='/' element={<Shop/>} />
        
        <Route path='/admin/login' element={<AdminLogin />}></Route>
        <Route path='/admin/add-a-product' element={<AddAProduct />}></Route>
        <Route path='/admin/dashboard' element={<Dash />}></Route>
        <Route path='/admin/products' element={<Contact />}></Route>
        <Route path='/admin/products/:product_id' element={<Contact />}></Route>
        <Route path='/admin/delete-a-product/:product_id' element={<Contact />}></Route>
        <Route path='/admin/patch-a-product/:product_id' element={<PatchASingleProduct />}></Route>

        <Route path='/error' element={<Error />}></Route>
      </Routes>

    </>


  );
}

export default App;
