import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dummmyImage from '../../images/cat.jpg';
import '../../styles/Cart.css';

const Cart = ({ onLogout }) => {
  const [customer, setCustomer] = useState({});
  const [dataDisplay, setDataDisplay] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
    // Calculate the total price based on product price and quantity
    const priceSum = dataDisplay.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    setTotalPrice(priceSum);
  }, [dataDisplay]);

  const fetchCart = async (accessToken) => {
    try {
      const response = await fetch('http://localhost:5000/shop/basket', {
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

      const { customer, newData, accessToken: newAccessToken } = data;
      setDataDisplay(newData);
      console.log('Current data:', newData);
      localStorage.setItem('accessToken', newAccessToken);

      setCustomer(customer);
      console.log(customer);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleDeleteProduct = (productId) => {
    // Implement the delete product functionality
    // Call the backend API to delete the product from the cart
    // Update the dataDisplay state with the modified cart data
    const updatedData = dataDisplay.filter((product) => product.id !== productId);
    setDataDisplay(updatedData);
  };

  const handleEmptyCart = () => {
    // Implement the empty cart functionality
    // Call the backend API to delete all products from the cart
    // Update the dataDisplay state to an empty array
    setDataDisplay([]);
  };

  const handleBuy = () => {
    // Handle the buy functionality
    // You can add your logic here for processing the purchase
    console.log('Buy button clicked');
  };

  return (
    <>
      <div className="empty-cart-button">
        <button onClick={handleEmptyCart}>Empty Cart</button>
      </div>
      <div className="cart-container">
        <div className="cart-items">
          {dataDisplay.map((product) => (
            <div className="cart-item" key={product.id}>
              <img src={dummmyImage} alt="Product" className="product-image" />
              <div className="product-details">
                <p>{product.product_name}</p>
                <p>Price: {product.price}</p>
                <p>Quantity: {product.quantity} tane</p>
                <p>Color: {product.color}</p>
                <p>Size: {product.size}</p>
              </div>
              <button className='delete-button' onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </div>
          ))}
        </div>
        <div className="cart-info">
          <div>
            <h3>User Info</h3>
            <p className="cart-text">Email: {customer.email}</p>
            <p className="cart-text">Address: Dummy Address</p> {/* Replace with actual address */}
          </div>
          <div>
            <h3>Cart Info</h3>
            <p className="cart-text">Total Price: {totalPrice}</p>
            <button className="buy-button" onClick={handleBuy}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
