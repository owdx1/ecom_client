import './App.css';
import { Route, Routes, Link , NavLink } from 'react-router-dom';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Header from './Header';
import AdminLogin from './pages/admin/AdminLogin';
import Dash from './pages/admin/Dash';
import AddAProduct from './pages/admin/AddAProduct';
import Login from './pages/Login'
import Register from './pages/Register';
import PatchASingleProduct from './pages/admin/PatchASingleProduct';




function App() {
  return (
    <>
      <Header/>
      
      <Routes>
      <Route path='/' element={<Shop />}></Route>
      <Route path='/profile' element={<Contact />}></Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />

      
      <Route path='/admin/login' element={<AdminLogin />}></Route>
      <Route path='/admin/add-a-product' element={<AddAProduct />}></Route>
      <Route path='/admin/dashboard' element={<Dash />}></Route>
      <Route path='/admin/products' element={<Contact />}></Route>
      <Route path='/admin/products/:product_id' element={<Contact />}></Route>
      <Route path='/admin/delete-a-product/:product_id' element={<Contact />}></Route>
      <Route path='/admin/patch-a-product/:product_id' element={<PatchASingleProduct />}></Route>





      </Routes>

    </>


  );
}

export default App;
