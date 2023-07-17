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
  import Search from './pages/search/Search';






  function App() {

    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [numberOfProductsInCart, setNumberOfProductsInCart] = useState(0);
    
    
    
    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      if(accessToken === 'undefined' || !accessToken){
        handleLogout();
        
        
      } 
      else{
        setIsLoggedIn(true);
      }
      const getNumberOfProductsInCart = async (accessToken) => {

        try {
          const response = await fetch('http://localhost:5000/product-num' , {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          if(response.ok){
            const allFetch = await response.json();
            const {productNum} = allFetch;
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

      getNumberOfProductsInCart(accessToken);

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
          <Route path='/shop/products/:product_id' element={<ASingleProduct isLoggedIn={isLoggedIn} />} />

          <Route path='/search' element={<Search />}></Route>
          <Route path='/profile' element={<Profile onLogout={handleLogout}/>}></Route>
          <Route path='/profile/cart' element={<Cart onLogout={handleLogout}/>}></Route>





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