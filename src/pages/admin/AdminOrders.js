import React from 'react'
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TableCell } from '@mui/material';
import {TableRow} from '@mui/material';
import {TableHead} from '@mui/material';
import {TableBody} from '@mui/material';
import {Paper} from '@mui/material';
import {Table} from '@mui/material';
import {TableContainer} from '@mui/material';
import '../../styles/AdminOrders.css'
import {Button} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminOrders = () => {

  const status = {
    1:'sipari-alindi',
    2:'yolda',
    3:'teslim-edildi',
    4:'iptal-edildi'
  }
  
  const [selectedStatus, setSelectedStatus] = useState({});
  const [backendMessage , setBackendMessage] = useState('');

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [orderId]: newStatus });
  };

  const handleUpdate = async (orderId, newStatus) => {
    console.log('orderid:' , orderId , 'yeni status:', newStatus);
    try {
      const adminToken = localStorage.getItem('adminToken');
      console.log('suanki adminToken' , adminToken);
      const response = await fetch(`http://localhost:5000/admin/getOrders/${orderId}/${newStatus}`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        },
        method:'PUT'
    });

      if (response.status === 200) {    
        const data = await response.json();
        const {message} = await data;
        setBackendMessage(message);
        console.log('güncelle butonuna bastıktan sonra gelen cevap' , message);
        
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error(error);
    }
    
  }


  



  const navigate = useNavigate();
  const [orders, setOrders] = useState([])

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
          const {orders} = await data;
          console.log("suan gelen veri:" , orders);
          setOrders(data.orders); 
          
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
      <>
          <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Sipariş Numarası</TableCell>
                        <TableCell>Müşteri ID</TableCell>
                        <TableCell>Sipariş Tarihi</TableCell>
                        <TableCell>Toplam Miktar</TableCell>
                        <TableCell>Sipariş durumu</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow 
                        key={order.order_id}
                        
                        >
                          <TableCell 
                            component={NavLink}
                            to={`/admin/getOrders/${order.order_id}`}>{order.order_id}</TableCell>
                          <TableCell
                            component={NavLink}
                            to={`/admin/getOrders/${order.order_id}`}>{order.customer_id}</TableCell>
                          <TableCell
                            component={NavLink}
                            to={`/admin/getOrders/${order.order_id}`}>{order.order_date}</TableCell>
                          <TableCell
                            component={NavLink}
                            to={`/admin/getOrders/${order.order_id}`}>{order.total_amount}</TableCell>
                          <TableCell>
                            <select
                              value={order.orderstatus}
                              onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                            >
                              {Object.keys(status).map((key) => (
                                <option key={key} value={key}>
                                  {status[key]}
                                </option>
                              ))}
                            </select>
                          </TableCell>
                          <TableCell>
                            <Button onClick={() => handleUpdate(order.order_id , selectedStatus[order.order_id])}>
                              Güncelle
                            </Button>
                          </TableCell>
                          
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </TableContainer>
        <ToastContainer/>
      </>
    );
}

export default AdminOrders;