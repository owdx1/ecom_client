import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const status = {
  1:'sipari-alindi',
  2:'yolda',
  3:'teslim-edildi',
  4:'iptal-edildi'
}

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
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
            // Assuming order_data is a date or timestamp field, you can compare them like this
            return new Date(b.order_date) - new Date(a.order_date);
          });


          const slicedOrders = sortedOrders.slice(0, 5);
          const {orders} = await data;
          console.log("suan gelen veri:" , orders);
          setOrders(slicedOrders); 
          
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
      <Title>Yeni Siparişler</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Sipariş No</TableCell>
            <TableCell>Tarih</TableCell>
            <TableCell>İsim</TableCell>
            <TableCell>Kargo</TableCell>
            <TableCell>Sipariş durumu</TableCell>
            <TableCell align="right">Tutar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.order_id}>
              <TableCell>{order.order_id}</TableCell>
              <TableCell>{order.order_date}</TableCell>
              <TableCell>simdilik yok</TableCell>
              <TableCell>simdilik yok</TableCell>
              <TableCell>{status[order.orderstatus]}</TableCell>
              <TableCell align="right">{`${order.total_amount} TL`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        color="primary"
        href="/admin/orders"
        onClick={(event) => {
          event.preventDefault();
          navigate('/admin/orders');
        }}
        sx={{ mt: 3 }}
      >
        Tüm siparişleri gör
      </Link>
    </React.Fragment>
  );
}