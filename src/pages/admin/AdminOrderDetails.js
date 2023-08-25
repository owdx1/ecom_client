import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const AdminOrderDetails = () => {

    const navigate = useNavigate();
    const { order_id } = useParams();
    const [details, setDetails] = useState([]);
    console.log('suanki order id' , order_id);
    
  
  const fetchAdminOrderDetails = async () => {
    try {
        const adminToken = localStorage.getItem('adminToken');
        console.log('suanki adminToken' , adminToken);
        const response = await fetch(`http://localhost:5000/admin/getOrders/${order_id}`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      if (response.status === 200) {    
        const data = await response.json();
        const {orderFeature} = await data;
        console.log("suan gelen detail:" , orderFeature);
        setDetails(orderFeature); 
        
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error(error);
    }
  };


useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken || adminToken === 'undefined') {
        navigate('/error');
    } else {
        fetchAdminOrderDetails();
        
    }
    }, []);

  return (
    <div>{order_id}</div>
  )
}

export default AdminOrderDetails