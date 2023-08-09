import React, { useEffect, useState } from 'react';
import { Typography, Paper } from '@mui/material';

const AdminCustomers = () => {
  const [fetchedCustomers, setFetchedCustomers] = useState([]);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/fetchCustomers', {
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });

        if (response.status === 200) {
          const data = await response.json();
          const { customers } = data;
          setFetchedCustomers(customers);
        } else {
          throw new Error('Kullanıcılar getirilemedi');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, [])

  return (
    <div>
      <Typography variant="h4">Kullanıcı Listesi</Typography>
      {fetchedCustomers.map((customer) => (
        <Paper key={customer.customer_id} elevation={3} style={{ padding: 16, margin: 16 }}>
          <Typography variant="h5">{customer.first_name} {customer.last_name}</Typography>
          <Typography>Email: {customer.email}</Typography>
          <Typography>Phone: {customer.phone}</Typography>
          <Typography>Address: {customer.address}</Typography>
          <Typography>City: {customer.city}</Typography>
          <Typography>Country: {customer.country}</Typography>
          <Typography>Postal Code: {customer.postal_code}</Typography>
        </Paper>
      ))}
    </div>
  )
}

export default AdminCustomers;
