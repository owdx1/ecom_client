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
  let totalMoney = 0.0;
  const [currentOrders , setCurrentOrders] = useState([]);
  const [totalAmount , setTotalAmount] = useState(0.0);

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
          setCurrentOrders(orders);
          
          orders.map((order) =>{
            console.log('suanki para' , order.total_amount);
            if(order.total_amount === null) {return;}
            totalMoney += parseFloat(order.total_amount);
            console.log('eklendikten sonraki total miktar' , totalMoney);
          })
          setTotalAmount(totalMoney);

          
          
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
      <Title>Toplam Satım</Title>
      <Typography component="p" variant="h4">
        {totalAmount} TL
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Burası kullanılabilir
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Burasi kullanılabilir 
        </Link>
      </div>
    </React.Fragment>
  );
}