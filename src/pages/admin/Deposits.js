import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {

  const navigate = useNavigate();
  const [totalMoney , setTotalMoney] = useState(0.0);

  const fetchAdminOrders = async () => {
      try {
          const adminToken = localStorage.getItem('adminToken');
          console.log('suanki adminToken' , adminToken);
        const response = await fetch('http://localhost:5000/admin/getOrders', {
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });
  
        if (response.status === 200) {    
          const data = await response.json();

          
          const {orders} = data;
          orders.map((order) => {
            setTotalMoney(totalMoney + parseFloat(order.total_amount));
          })
          
          
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
        fetchAdminOrders();
        
    }
  }, []);










  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        {totalMoney} TL
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}