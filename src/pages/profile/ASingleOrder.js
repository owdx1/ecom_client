import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import dummyImage from '../../images/cat.jpg';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const ASingleOrder = () => {
  const location = useLocation();
  const { order } = location.state;
  const { order_id } = order;
  const [singleOrderDisplay, setSingleOrderDisplay] = useState([]);

  useEffect(() => {
    const fetchSingleOrder = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await fetch(`http://localhost:5000/profile/orders/${order_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching a single order');
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        const { ordered } = data;
        setSingleOrderDisplay(ordered);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleOrder();
  }, [order_id]);

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', width: '100%', maxWidth: '1000px', marginTop: '20px' }}>
      <Typography variant="h6" component="div" style={{marginBottom:'20px'}}>
                  Order ID: {order_id}
      </Typography>
      <Grid container spacing={2} direction="column">
        {singleOrderDisplay.map((orderItem) => (
          <Grid item key={orderItem.order_item_id}>
            <Card style={{ display: 'flex' }}>
              <CardMedia component="img" image={dummyImage} alt="Dummy" style={{ width: '150px' }} />
              <CardContent>
                
                <Typography variant="body1" color="text.secondary">
                  Product ID: {orderItem.product_id}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Quantity: {orderItem.quantity}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Size: {orderItem.size}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Price: ${orderItem.price}
                </Typography>
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="body1" color="text.primary" style={{marginTop:'20px'}}>
                  Toplam Fiyat: {order.total_amount} TL
      </Typography>
    </div>
  );
};

export default ASingleOrder;
