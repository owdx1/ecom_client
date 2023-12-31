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
import { useState, useEffect } from 'react';
import ScrollUpButton from './utils/ScrollUpButton';
import Profile from './pages/profile/Profile';
import Cart from './pages/profile/Cart';
import ASingleProduct from './pages/shop/ASingleProduct';
import Error  from './utils/Error';
import Search from './pages/search/Search';
import ResetPassword from './utils/ResetPassword';
import Footer from './utils/Footer';
import UpdateInfo from './pages/profile/UpdateInfo';
import Dashboard from '../src/pages/admin/Dashboard'
import Orders from './pages/profile/Orders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductDetails from './pages/admin/AdminProductDetails';
import ASingleOrder from './pages/profile/ASingleOrder';
import AddressForm from './pages/profile/AddressForm';
import Review from './pages/profile/Review';
import FileUpload from './pages/admin/FileUpload';
import AdminCustomers from './pages/admin/AdminCustomers'
import Search2 from './pages/search/Search2';
import ArdaDeneme from './utils/ArdaDeneme';
import Preview from './pages/Preview'
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrderDetails from './pages/admin/AdminOrderDetails';





  function App() {

    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [numberOfProductsInCart, setNumberOfProductsInCart] = useState(0);

    const getNumberOfProductsInCart = async (accessToken) => {

      try {
        const response = await fetch('http://localhost:5000/product-num' , {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        if(response.ok){
          const allFetch = await response.json();
          let {productNum} = allFetch;
          console.log("şuanki urun miktari" , productNum);
          
          setNumberOfProductsInCart(productNum);
          
  
        } else if(response.status === 401){
          handleLogout();
        }
        else{
          console.error("app js in icindeki useeffectte basta bir sorun var anlamadım")
        }
  
        
      } catch (error) {
        console.error(error);
      }
    }
    
    
    
    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      if(accessToken === 'undefined' || !accessToken){
        handleLogout();
        
        
      } 
      else{
        setIsLoggedIn(true);
      }
      
      if(isLoggedIn){
        getNumberOfProductsInCart(accessToken);
      }
      

    }, [])

    const handleLogout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('accessToken');
    };




    
    return (
      <>
        <Header isLoggedIn= {isLoggedIn} onLogout={handleLogout} numberOfProductsInCart={numberOfProductsInCart}/>
        
        <Routes>
          <Route path='/' element={<Shop />}></Route>
          
          <Route path='/shop/products/:product_id' element={<ASingleProduct isLoggedIn={isLoggedIn} getNumberOfProductsInCart={getNumberOfProductsInCart}/>} />

          <Route path='/search' element={<Search />}></Route>
          <Route path='/search-trends' element={<Search2 />}></Route>

          <Route path='/profile' element={<Profile onLogout={handleLogout}/>}></Route>
          <Route path='/profile/cart' element={<Cart onLogout={handleLogout} getNumberOfProductsInCart={getNumberOfProductsInCart}/>}></Route>
          <Route path='/profile/orders' element={<Orders  onLogout={handleLogout} />}></Route>
          <Route path='/profile/orders/:order_id' element={<ASingleOrder  onLogout={handleLogout} />}></Route>
          <Route path='/profile/address-form' element={<AddressForm  onLogout={handleLogout} />}></Route>
          <Route path='/profile/review-order' element={<Review  onLogout={handleLogout} getNumberOfProductsInCart={getNumberOfProductsInCart}/>}></Route>

          <Route path='/forget-password' element={<ResetPassword onLogout={handleLogout}/>}></Route>
          <Route path='/profile/update' element={<UpdateInfo />}></Route>


          <Route path='/login' element={<Login onLogin={() => setIsLoggedIn(true)}/>} />
          <Route path='/register' element={<Register/>} />


          
          <Route path='/arda' element={<ArdaDeneme/>} />
          <Route path='/' element={<Shop/>} />
          <Route path='/foto/file' element ={<FileUpload/>}></Route>
          <Route path='/admin/login' element={<AdminLogin />}></Route>
          <Route path='/admin/add-a-product' element={<AddAProduct />}></Route>
          <Route path='/admin/dashboard' element={<Dash />}></Route>
          <Route path='/admin/products' element={<AdminProducts />}></Route>
          <Route path='/admin/products/:product_id' element={<AdminProductDetails />}></Route>
          <Route path='/admin/delete-a-product/:product_id' element={<Contact />}></Route>
          <Route path='/admin/customers' element={<AdminCustomers/>}></Route>
          <Route path='/admin/orders' element={<AdminOrders />}></Route>
          <Route path='/admin/getOrders/:order_id' element={<AdminOrderDetails />}></Route>
          <Route path='/admin/denemeDashboard' element={<Dashboard />}></Route>

          <Route path='/error' element={<Error />}></Route>

          <Route path='/preview' element={<Preview/>}></Route>
        </Routes>
        <ScrollUpButton/>
        <Footer/>

      </>


    );
  }

  export default App;