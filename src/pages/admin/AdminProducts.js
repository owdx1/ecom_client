import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button } from '@mui/material';
import '../../styles/newAdminProducts.css';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    product_name: 'asc',
    product_id: 'asc',
    price: 'asc',
    color: 'asc',
    category_id: 'asc',
    is_product_of_the_week: 'asc'
  });
  const categories = {
    1: 'takim',
    2: 'tek-ust',
    3: 'tek-alt',
    4: 'tesettur',
    5: 'bone',
    6: 'terlik'
  };

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken || adminToken === 'undefined') {
      navigate('/error');
    } else {
      fetchAdminProducts(adminToken);
    }
  }, []);

  const handleSort = (columnName) => {
    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [columnName]: prevSortOrder[columnName] === 'asc' ? 'desc' : 'asc'
    }));

    const sortedProducts = [...products].sort((a, b) => {
      if (columnName === 'product_id' || columnName === 'price' || columnName === 'category_id') {
        return sortOrder[columnName] === 'asc' ? a[columnName] - b[columnName] : b[columnName] - a[columnName];
      } else if (columnName === 'product_name' || columnName === 'color') {
        return sortOrder[columnName] === 'asc' ? a[columnName].localeCompare(b[columnName]) : b[columnName].localeCompare(a[columnName]);
      } else if (columnName === 'is_product_of_the_week') {
        return sortOrder[columnName] === 'asc'
          ? b[columnName] - a[columnName] 
          : a[columnName] - b[columnName]; 
      }
      return 0;
    });

    setProducts(sortedProducts);
  };

  const fetchAdminProducts = async (adminToken) => {
    try {
      const response = await fetch('http://localhost:5000/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data.products);
        setProducts(data.products);
        
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
              <TableCell onClick={() => handleSort('product_name')} style={{ cursor: 'pointer' }}>
                Ürün İsmi {sortOrder.product_name === 'asc' ? ' ▲' : ' ▼'}
              </TableCell>
              <TableCell onClick={() => handleSort('product_id')} style={{ cursor: 'pointer' }}>
                Ürün ID {sortOrder.product_id === 'asc' ? ' ▲' : ' ▼'}
              </TableCell>
              <TableCell onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
                Fiyat {sortOrder.price === 'asc' ? ' ▲' : ' ▼'}
              </TableCell>
              <TableCell onClick={() => handleSort('color')} style={{ cursor: 'pointer' }}>
                Renk {sortOrder.color === 'asc' ? ' ▲' : ' ▼'}
              </TableCell>
              <TableCell onClick={() => handleSort('category_id')} style={{ cursor: 'pointer' }}>
                Kategori {sortOrder.category_id === 'asc' ? ' ▲' : ' ▼'}
              </TableCell>
              <TableCell>Miktar</TableCell>
              <TableCell onClick={() => handleSort('is_product_of_the_week')} style={{ cursor: 'pointer' }}>
                Öne Çıkan Ürün {sortOrder.is_product_of_the_week === 'asc' ? ' ▲' : ' ▼'}
              </TableCell>
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
                <TableCell>
                  {product.is_product_of_the_week ? (
                    <span style={{ color: 'gold' }}>★</span>
                  ) : (
                    <span>☆</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminProducts;
