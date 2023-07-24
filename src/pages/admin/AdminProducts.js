import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button } from '@mui/material';
import '../../styles/newAdminProducts.css';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const categories = {
    1:'takim',
    2:'tek-ust',
    3:'tek-alt',
    4:'tesettur',
    5:'bone',
    6:'terlik'
  }
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    console.log('Current adminToken', adminToken);
    if (!adminToken || adminToken === 'undefined') {
      navigate('/error');
    } else {
      fetchAdminProducts(adminToken);
    }
  }, []);

  const fetchAdminProducts = async (adminToken) => {
    try {
      const response = await fetch('http://localhost:5000/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        setProducts(data.products);
        console.log('tüm ürünler:', products);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div style={{ margin: '10px' }}>
        <NavLink to='/admin/denemeDashboard'>
          <Button variant="contained" color="primary">
            Admin Anasayfa
          </Button>
        </NavLink>
        <NavLink to='/admin/add-a-product'>
          <Button variant="contained" color="primary">
            Ürün Ekle
          </Button>
        </NavLink>
      </div>

      <TableContainer component={Paper} style={{ marginTop: '50px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ürün İsmi</TableCell>
              <TableCell>Ürün ID</TableCell>
              <TableCell>Fiyat</TableCell>
              <TableCell>Renk</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Miktar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.product_id}
                component={NavLink}
                to={`/admin/products/${product.product_id}`}
                style={{ textDecoration: 'none' }}
                state={{ product: product }} 
              >
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.product_id}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{categories[product.category_id]}</TableCell>
                <TableCell>{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminProducts;
