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
          <div className="empty-cart-button">
            <Button onClick={handleEmptyCart} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
              Sepeti Boşalt 
            </Button>
          </div>
          <div className="cart-container">
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
                      {dataDisplay.map((product) => (
                        <TableRow key={product.product_id}>
                          <TableCell>
                            <Grid container alignItems="center" spacing={2}>
                              <Grid item>
                                <img src={dummyImage} alt="Product" className="product-image" />
                              </Grid>
                              <Grid item>
                                <Typography variant="body1">{product.product_name}</Typography>
                              </Grid>
                            </Grid>
                          </TableCell>
                          <TableCell>{product.color}</TableCell>
                          <TableCell>{product.orderquantity}</TableCell>
                          {product.size && <TableCell>{product.size}</TableCell>}
                          {product.size_i !== 0 && <TableCell>{product.size_i}</TableCell>}
                          <TableCell>TL {product.price}</TableCell>
                          
                          <TableCell>
                            <Button onClick={() => handleDeleteProduct(product.product_id, product.feature_id)} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                              Sepetten çıkar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="total-price">
                  <Typography variant="body1" >Toplam Fiyat: {totalPrice} TL</Typography>
                </div>
                <NavLink to='/profile/address-form' state={{ customer, dataDisplay, totalPrice }}>
                  <Button variant="contained" color="primary">
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
