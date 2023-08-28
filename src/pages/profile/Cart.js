import React, { useEffect, useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import dummyImage from '../../images/cat.jpg';
import { Button, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../styles/Cart.css';
import { ToastContainer, toast } from 'react-toastify';

const Cart = ({ onLogout, getNumberOfProductsInCart }) => {
  const [customer, setCustomer] = useState({});
  const [dataDisplay, setDataDisplay] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [backEndMessage, setBackEndMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('Current accessToken', accessToken);
    if (!accessToken || accessToken === 'undefined') {
      navigate('/error');
    } else {
      fetchCart(accessToken);
    }
  }, []);

  useEffect(() => {
    const priceSum = dataDisplay.reduce((sum, product) => {
      const productPrice = parseFloat(product.price); 
      return sum + productPrice;
    }, 0);
  
    setTotalPrice(priceSum);
    console.log(typeof totalPrice);
  }, [dataDisplay]);
  

  const fetchCart = async (accessToken) => {
    try {
      const response = await fetch('http://localhost:5000/profile/cart', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        onLogout();
        navigate('/');
      }

      if (!response.ok) {
        throw new Error('Error fetching Cart');
      }

      const data = await response.json();
      const { customer, basket, accessToken: newAccessToken } = data;
      setDataDisplay(basket);
      console.log('Current data:', basket);
      localStorage.setItem('accessToken', newAccessToken);

      setCustomer(customer);
      console.log(customer);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    if (backEndMessage !== '') toast.warn(backEndMessage);
  }, [backEndMessage]);

  const handleDeleteProduct = async (productId, featureId) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://localhost:5000/profile/cart/delete-a-product', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ product_id: productId, feature_id: featureId })
      });

      const data = await response.json();
      setBackEndMessage(data.message);
      if (response.status !== 200) {
        throw new Error(backEndMessage || 'Failed to register');
      } else {
        // Update the dataDisplay state after successful deletion
        getNumberOfProductsInCart(accessToken)
        setDataDisplay(prevDataDisplay => prevDataDisplay.filter(product => product.product_id !== productId || product.feature_id !== featureId));
        localStorage.setItem('accessToken', data.accessToken);
      }
    } catch (error) {
      console.error(error);
      setBackEndMessage(error);
    }
  };

  const handleEmptyCart = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch('http://localhost:5000/profile/cart/empty-cart', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        method: 'DELETE'
      });

      const data = await response.json();
      const message = data.message;

      setBackEndMessage(message);

      if (response.status !== 200) {
        throw new Error('Error fetching Cart');
      } else {
        localStorage.setItem('accessToken', data.accessToken);
        setDataDisplay([]);
        getNumberOfProductsInCart(accessToken);
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {dataDisplay.length === 0 ? (
        <div style={{ textAlign: 'center', fontSize: '24px', marginTop: '50px' }}>
          Sepette Ürün yok 😔
          <div>
            <Link to="/">Alışverişe başlayın</Link>
          </div>
        </div>
      ) : (
        <>
          
          <div className="cart-container" style={{margin:'30px auto'}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Ürün</TableCell>
                        <TableCell>Renk</TableCell>
                        <TableCell>Miktar</TableCell>
                        <TableCell>Beden</TableCell>
                        <TableCell>Fiyat</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataDisplay && dataDisplay.map((product) =>{
                        const photoUrls =  product.photoUrls;
                        let singleObject = photoUrls[0];
                        console.log('single object' , singleObject);
                        if(singleObject === undefined){
                          singleObject = {
                            url:'https://i.ibb.co/tbRJ8N9/id-15.jpg',
                            name:'current-name'
                          }
                        } 
                        
                        let url = singleObject.url;
                        console.log('current url', url);
                                
                        
                        
                        
                        
                      return (
                        <TableRow key={product.product_id}>
                          <Link to={`/shop/products/${product.product_id}`} state={{ product }}>
                            <TableCell>
                              <Grid container alignItems="center" spacing={2}>
                              <Grid item>
                                <img src={url} alt="Product" className="product-image"/>
                              </Grid>
                              <Grid item>
                                <Typography variant="h5" style={{fontWeight:'100'}}>{product.product_name}</Typography>
                              </Grid>
                              </Grid>
                            </TableCell>
                          </Link>
                          <TableCell>{product.color}</TableCell>
                          <TableCell>{product.orderquantity}</TableCell>
                          <TableCell>{product.size}</TableCell>
                          
                          <TableCell>{product.price} TL</TableCell>
                          
                          <TableCell>
                            <Button onClick={() => handleDeleteProduct(product.product_id, product.feature_id)} variant="contained" color="secondary" startIcon={<DeleteIcon />}
                              style={{
                                marginLeft: '35px',
                                background: 'linear-gradient(45deg, #FE6B00 30%, #FF8ECC 90%)',
                                borderRadius: '10px',
                                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                color: 'white',
                                transition: 'background 0.3s ease-in-out, transform 0.2s ease',
                                border: 'none',
                              }}
                            >
                              Sepetten çıkar
                            </Button>
                          </TableCell>
                        </TableRow>
                      )})}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="empty-cart-button">
                  <Button onClick={handleEmptyCart} variant="contained" color="secondary" startIcon={<DeleteIcon />}
                  style={{
                    marginLeft: '35px',
                    background: 'linear-gradient(45deg, #CF6AAB 60%, #FC8E00 90%)',
                    borderRadius: '10px',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    color: 'white',
                    transition: 'background 0.3s ease-in-out, transform 0.2s ease',
                    border: 'none',
                    
                  }}
                  >
                    Sepeti Boşalt 
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="total-price">
                  <Typography variant="h4">Toplam Fiyat: {totalPrice} TL</Typography>
                </div>
                <NavLink to='/profile/address-form' state={{ customer, dataDisplay, totalPrice }}>
                <Button
                  style={{
                    marginLeft: '35px',
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    borderRadius: '10px',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    color: 'white',
                    transition: 'background 0.3s ease-in-out, transform 0.2s ease',
                    border: 'none',
                    width:'200px'
                  }}
                  
                >
                    Ödemeye geç
                  </Button>
                </NavLink>
              </Grid>
            </Grid>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default Cart;
