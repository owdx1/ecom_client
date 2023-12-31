import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const status = {
  1:'siparis-alindi',
  2:'yolda',
  3:'teslim-edildi',
  4:'iptal-edildi'
}

const ASingleOrder = () => {
  const [order , setOrder] = useState({});
  const location = useLocation();
  
  const { order_id } = order;
  const {orderstatus} = order;
  const [singleOrderDisplay, setSingleOrderDisplay] = useState([]);

  useEffect(() =>{
    setOrder(location.state.order);
  } , [])

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
        console.log(ordered);
        setSingleOrderDisplay(ordered);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleOrder();
  }, [order_id]);

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', width: '100%', maxWidth: '1000px', marginTop: '20px' , margin:'20px auto' , borderRadius:'20px'}}>
      <div style={{display:'flex' , justifyContent:'space-between'}}>
        <Typography variant="h6" component="div" style={{marginBottom:'20px'}}>
                    Sipariş Numarası : {order_id}
        </Typography>
        <Typography variant="h6" component="div" style={{marginBottom:'20px'}} className={`${status[orderstatus]}`}>
                    {status[orderstatus]}
        </Typography>
      </div>
      <Grid container spacing={2} direction="column">
        {singleOrderDisplay.map((orderItem) => {
          let url = '';
          const photoUrls = orderItem.photoUrls;
          const singleArray = photoUrls[0];
          console.log('single array' , singleArray);
          if(singleArray === undefined){
            url = 'https://i.ibb.co/tbRJ8N9/id-15.jpg'
          } else{
            url = singleArray.url;
          }



        
        return (
          <Grid item key={orderItem.order_item_id}>
            <Card style={{ display: 'flex' }}>
              <img src={url} alt='img' style={{ width: '150px', borderRadius:'10px' , margin:'20px'}}></img>
              
              <CardContent>

                <Typography variant="h4" color="text.secondary" style={{marginBottom:'20px'}}>
                  {orderItem.product_name}
                </Typography>
                
                <Typography variant="body1" color="text.secondary">
                  Renk: {orderItem.color}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Ürün Kodu: {orderItem.product_id}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Miktar: {orderItem.quantity}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Beden: {orderItem.size}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Fiyat: {orderItem.price}TL
                </Typography>
                
              </CardContent>
            </Card>
          </Grid>
        )})}
      </Grid>
      <Typography variant="body1" color="text.primary" style={{marginTop:'20px'}}>
                  Toplam Fiyat: {order.total_amount} TL
      </Typography>
    </div>
  );
};

export default ASingleOrder;
