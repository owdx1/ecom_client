import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import dummyImage from '../../images/cat.jpg';
import { Button, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../styles/Cart.css';
import { ToastContainer , toast } from 'react-toastify';

const Cart = ({ onLogout }) => {
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
      return sum + product.price * product.quantity;
    }, 0);
    setTotalPrice(priceSum);
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
      const { customer, basket, accessToken: newAccessToken} = data;
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

  const handleDeleteProduct = async (productId) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://localhost:3000/profile/cart/delete-a-product', {
      headers:{
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      body: JSON.stringify({product_id: productId})
      })
      const {message} = await response.json();
      setBackEndMessage(message);
      if (response.status !== 200) {
        throw new Error(backEndMessage || 'Failed to register');
      } 
      else{
        localStorage.setItem('accessToken', response.accessToken);
      }
    } catch (error) {
      console.error(error);
      setBackEndMessage(error);
    }
  };

  useEffect(() => {

  } , [dataDisplay]);
  

  const handleEmptyCart = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch('http://localhost:5000/profile/cart/empty-cart',{
        headers: {
          'Authorization' : `Bearer ${accessToken}`
        },
        method: 'DELETE'
      });

      
      const data = await response.json();
      const message = data.message;

      setBackEndMessage(message);

      if (response.status === 200){
        
        localStorage.setItem('accessToken' , data.accessToken);
      } 
      else { 
        throw new Error('Error fetching Cart');
      }
      
    } catch (error) {
      console.error(error);
    }
    
    
  };

  const handleBuy = async () => {

    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch('http://localhost:5000/profile/cart/buy',{
        headers: {
          'Authorization' : `Bearer ${accessToken}`
        },
        method: 'POST'
      });

      
      const data = await response.json();
      const message = data.message;

      setBackEndMessage(message);

      if (response.status === 200){
        
        localStorage.setItem('accessToken' , data.accessToken);
      } 
      else { 
        throw new Error('Error fetching Cart');
      }
      
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <>
      <div className="empty-cart-button">
        <Button onClick={handleEmptyCart} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
          Empty Cart
        </Button>
      </div>
      <div className="cart-container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Size</TableCell>
                <TableCell></TableCell>
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
                  <TableCell>TL{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteProduct(product.id,product.price,product.size)} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="cart-info" style={{ backgroundColor: '#f5f5f5', width:'500px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className="user-info">
                <Typography variant="h5">User Info</Typography>
                <Typography variant="body1">Email: {customer.email}</Typography>
                <Typography variant="body1">Address: Dummy Address</Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="total-price">
                <Typography variant="h5">Cart Info</Typography>
                <Typography variant="body1">Total Price: TL{totalPrice}</Typography>
                <Button onClick={handleBuy} variant="contained" color="primary">
                  Buy
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};

export default Cart;
