import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import {Button} from '@mui/material';


const AdminOrderDetails = () => {
  const navigate = useNavigate();
  const { order_id } = useParams();
  const [details, setDetails] = useState([]);
  console.log('suanki order id', order_id);
  
  const [userDetails, setUserDetails] = useState({
    address:'',
    city:'',
    country:'',
    email:'',
    first_name:'',
    last_name:'',
    phone:'',
    postal_code:''
  });
  const [orderDetails, setOrderDetails] = useState({
    total_amount: '',
    order_id :''
  })


  const fetchAdminOrderDetails = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      console.log('suanki adminToken', adminToken);
      const response = await fetch(`http://localhost:5000/admin/getOrders/${order_id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        const { orderFeature } = data;
        console.log('suan gelen detail:', orderFeature);
        setDetails(orderFeature);
        setUserDetails({
          address: orderFeature[0].address,
          city: orderFeature[0].city,
          country: orderFeature[0].country,
          email: orderFeature[0].email,
          first_name: orderFeature[0].first_name,
          last_name: orderFeature[0].last_name,
          phone: orderFeature[0].phone,
          postal_code: orderFeature[0].postal_code,
        })
        setOrderDetails({
          total_amount:orderFeature[0].total_amount,
          order_id:orderFeature[0].order_id
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
      fetchAdminOrderDetails();
    }
  }, []);

  return (
    <>
      <div>
        <h1 style={{fontWeight:'300'}}> Sipariş Numarası: {orderDetails.order_id}</h1>
        <h1 style={{fontWeight:'100'}}> Toplam Fiyat: {orderDetails.total_amount} TL</h1>
        <Button>Alıcıyla İletişime Geç</Button>
      </div>
      

      <div>
        <Typography variant="h4">Kullanıcı Bilgileri</Typography>
        <Typography variant="h6">İsim: {userDetails.first_name}</Typography>
        <Typography variant="h5">Soyisim: {userDetails.last_name}</Typography>
        <Typography variant="h5">Adres: {userDetails.address}</Typography>
        <Typography variant="h5">Şehir: {userDetails.city}</Typography>
        <Typography variant="h5">Posta Code: {userDetails.postal_code}</Typography>
        <Typography variant="h5">Ülke: {userDetails.country}</Typography>
        <Typography variant="h5">Email: {userDetails.email}</Typography>
        <Typography variant="h5">Tel No: {userDetails.phone}</Typography>
       
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell></TableCell>
              <TableCell>Ürün ismi</TableCell>
              <TableCell>Ürün No</TableCell>
              <TableCell>Renk</TableCell>
              <TableCell>Beden</TableCell>
              <TableCell>Adet</TableCell>
              <TableCell>Fiyat</TableCell>
              <TableCell>Müşteri ID</TableCell>
              <TableCell>Order Item ID</TableCell>
              
              
              
              
              
              
              
            </TableRow>
          </TableHead>
          <TableBody>
            {details.map((detail, index) => (
              
              <TableRow key={index}>
                <TableCell><img src='https://i.ibb.co/tbRJ8N9/id-15.jpg' style={{width:'120px' , borderRadius:'10px'}}></img></TableCell>
                <TableCell>{detail.product_name}</TableCell>
                <TableCell>{detail.product_id}</TableCell>
                <TableCell>{detail.color}</TableCell>
                <TableCell>{detail.size}</TableCell>
                <TableCell>{detail.quantity}</TableCell>
                <TableCell>{detail.price}</TableCell>
                <TableCell>{detail.customer_id}</TableCell>
                
                <TableCell>{detail.order_item_id}</TableCell>
                
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </>
  );
};

export default AdminOrderDetails;
