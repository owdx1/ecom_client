import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Paper } from '@mui/material';

const styles = {
  tableContainer: {
    marginTop: '20px',
    padding: '10px',
    
    margin:'30px auto'
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    fontWeight: 'bold',
    borderBottom: '1px solid #ccc',
  },
  tableRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    textDecoration: 'none',
    color: 'inherit',
  },
};

const status = {
  1:'siparis-alindi',
  2:'yolda',
  3:'teslim-edildi',
  4:'iptal-edildi'
}

const Orders = ({ onLogout }) => {
  const navigate = useNavigate();
  const [displayOrders, setDisplayOrders] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('Current accessToken', accessToken);
    if (!accessToken || accessToken === 'undefined') {
      navigate('/error');
    } else {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://localhost:5000/profile/orders', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        onLogout();
        navigate('/');
      }

      if (!response.ok) {
        throw new Error('Error fetching orders');
      }

      const data = await response.json();
      const { accessToken: newAccessToken, oldOrders } = data;
      const sortedOrders = oldOrders.sort((a, b) => {
          
        return new Date(b.order_date) - new Date(a.order_date);
      });
      setDisplayOrders(sortedOrders);
      localStorage.setItem('accessToken', newAccessToken);
      console.log('New accessToken', newAccessToken);
      console.log('Current orders', oldOrders);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div>
      <Paper style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <Typography style={{ width: '7000px' }}>Sipariş Numarası</Typography>
          <Typography style={{ width: '7000px' }}>Tarih</Typography>
          <Typography style={{ width: '7000px' }}>Toplam Fiyat</Typography>
          <Typography style={{ width: '7000px' }}>Sipariş Durumu</Typography>
        </div>
        {displayOrders.map((order) => (
          <Link to={`/profile/orders/${order.order_id}`} style={styles.tableRow} state={{ order }} key={order.order_id}>
            <Typography style={{ width: '7000px' }}>{order.order_id}</Typography>
            <Typography style={{ width: '7000px' }}>{order.order_date}</Typography>
            <Typography style={{ width: '7000px' }}>{order.total_amount} TL </Typography>
            <Typography style={{ width: '7000px' }}  className={`${status[order.orderstatus]}`}>{status[order.orderstatus]}</Typography>
          </Link>
        ))}
      </Paper>
    </div>
  );
};

export default Orders;

