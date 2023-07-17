import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Cart = ({onLogout}) => {
  const [customer , setCustomer] = useState({})

  const navigate = useNavigate();
  const [dataDisplay , setDataDisplay] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Current accessToken", accessToken);
    if (!accessToken || accessToken === "undefined") {
      navigate("/error"); 
    } else {
      fetchCart(accessToken);
    }
  }, []);

  const fetchCart = async (accessToken) => {
    try {
      const response = await fetch("http://localhost:5000/shop/basket", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        onLogout(); 
        navigate('/');
      }
  
      if (!response.ok) {
        throw new Error("Error fetching Cart");
      }
  
      const data = await response.json();
      
      const { customer , newData , accessToken: newAccessToken } = data;
      setDataDisplay(newData);
      console.log("suanki data " , dataDisplay);
      localStorage.setItem("accessToken", newAccessToken);
      
      setCustomer(customer);
      console.log(customer);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  


  return (
    <>
      <div>{customer.id}</div>
      <div>
        {
          dataDisplay.map((product) => (
            <p>{product.price}</p>
          ))
        }
      </div>
    </>
  )
}

export default Cart