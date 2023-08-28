import React, { useEffect, useState } from 'react';
import { Typography, Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { ToastContainer , toast } from 'react-toastify';
const AdminCustomers = () => {
const [fetchedCustomers, setFetchedCustomers] = useState([]);
const [showModal, setShowModal] = useState(false);
const [currentId , setCurrentId] = useState('');
  
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
          
          setFetchedCustomers(data.data);
        } else {
          throw new Error('Kullanıcılar getirilemedi');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, [])

  const handleDeleteCustomer = async () => {
    const adminToken = localStorage.getItem('adminToken');
    if (currentId === undefined) {
      console.error('currentId undefined')
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/admin/delete-customer/${currentId}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          
        },
        method:'DELETE'
      })
      
      const data = await response.json();

      if(response.status === 200){
        
        toast.success(data.message);
        
      }

      else {
        console.error('kullanıcı silerken response status 200 değil');
        toast.error(data.message);
      }
      

    

      
    } catch (error) {
      console.error(error);
    }
  }

  const verifier = (customer_id) => {
    setShowModal(true);
    setCurrentId(customer_id);

  }

  return (
    <div>
      <div style={{marginTop:'20px'}}>
        <NavLink to='/admin/denemeDashboard'>
            <Button variant="contained" color="primary">
              Admin Anasayfa
            </Button>
        </NavLink>
      </div>
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
          <Button onClick={() => verifier(customer.customer_id)}>Kullanıcıyı Sil</Button>
        </Paper>
      ))}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '999', 
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)', 
            }}
          >
            <Typography variant='h4'>Kullanıcıyı silmek istediğinizden emin misiniz?</Typography>
            <div className="modal-button-container">
              <Button onClick={() => handleDeleteCustomer()}>EVET</Button>
              <Button onClick={() => setShowModal(false)}>HAYIR</Button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer/>
    </div>
  )
}

export default AdminCustomers;
