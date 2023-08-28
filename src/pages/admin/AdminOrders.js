import React from 'react'
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormControl, MenuItem, TableCell } from '@mui/material';
import {TableRow} from '@mui/material';
import {TableHead} from '@mui/material';
import {TableBody} from '@mui/material';
import {Paper} from '@mui/material';
import {Table} from '@mui/material';
import {TableContainer} from '@mui/material';
import '../../styles/AdminOrders.css'
import {Button} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import {Select} from '@mui/material';


const AdminOrders = () => {

  const status = {
    1:'siparis-alindi',
    2:'yolda',
    3:'teslim-edildi',
    4:'iptal-edildi'
  }

  
  
  const [selectedStatus, setSelectedStatus] = useState({});
  const [backendMessage , setBackendMessage] = useState('');

  const handleStatusChange = (orderId, newStatus) => {
    
    setSelectedStatus({ ...selectedStatus, [orderId]: newStatus });
  
    
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.order_id === orderId) {
          
          return { ...order, orderstatus: newStatus };
        }
        return order;
      });
    });
    
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
      const data = await response.json();
      if (response.status === 200) {    
        
        const {message} = await data;
        toast.success(message);
        
      } else {
        const {message} = data;
        toast.error(message);
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
          const sortedOrders = data.orders.sort((a, b) => {
          
            return new Date(b.order_date) - new Date(a.order_date);
          });
          
          console.log("suan gelen veri:" , orders);
          setOrders(sortedOrders); 
          
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
          

          <TableContainer component={Paper} style={{ margin: '20px auto'}}>
          <div style={{ margin: '10px' }}>
            <NavLink to='/admin/denemeDashboard'>
              <Button variant="contained" color="primary">
                Admin Anasayfa
              </Button>
            </NavLink>

          </div>
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
                            to={`/admin/getOrders/${order.order_id}`}>{order.total_amount} TL</TableCell>
                          <TableCell>
                            <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
                              <Select
                                
                                value={order.orderstatus}
                                onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                                sx={{
                                  "& .MuiSelect-select.MuiSelect-select": {
                                    color: (() => {
                                      switch (order.orderstatus) {
                                        case 1:
                                          return 'orange';
                                        case 2:
                                          return 'purple';
                                        case 3:
                                          return 'green';
                                        case 4:
                                          return 'red';
                                        default:
                                          return 'black';
                                      }
                                    })(),
                                  },
                                }}
                              >
                                {Object.keys(status).map((key) => (
                                  <MenuItem key={key} value={key} className={status[key]}>
                                    {status[key]}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
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