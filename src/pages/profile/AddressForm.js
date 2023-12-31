import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const cartContainerStyle = {
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '16px',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  marginTop: '30px',
};



export default function AddressForm({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [detailedCustomer, setDetailedCustomer] = useState({});
  const [dataDisplay, setDataDisplay] = useState([]);
  const[totalPrice , setTotalPrice] = useState(0)

  useEffect(() =>{
    setDataDisplay(location.state.dataDisplay);
    setTotalPrice(location.state.totalPrice);
  }, [])
 
  

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || accessToken === 'undefined') {
      navigate('/error');
    } else {
      fetchDetailedInfo(accessToken);
    }
  }, []);

  const fetchDetailedInfo = async (accessToken) => {
    try {
      const response = await fetch('http://localhost:5000/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        onLogout();
        navigate('/');
      }

      if (!response.ok) {
        throw new Error('Error fetching Cart');
      }

      const data = await response.json();
      const { customer, accessToken: newAccessToken } = data;
      setDetailedCustomer(customer);
      localStorage.setItem('accessToken', newAccessToken);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    country: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    setFormData({
      firstName: detailedCustomer.first_name || '',
      lastName: detailedCustomer.last_name || '',
      address1: detailedCustomer.address || '',
      address2: '',
      city: detailedCustomer.city || '',
      state: detailedCustomer.state || '',
      zip: detailedCustomer.postal_code || '',
      country: detailedCustomer.country || '',
      email: detailedCustomer.email || '',
      phone: detailedCustomer.phone || '',
    });
  }, [detailedCustomer]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <React.Fragment>
      <Grid container spacing={3} style={cartContainerStyle}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={formData.email}
            onChange={handleChange}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={formData.address1}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={formData.address2}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={formData.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            autoComplete="tel"
            variant="standard"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={formData.zip}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={formData.country}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          
          <Grid item xs={12}>
            <NavLink to='/profile/review-order' state={{ dataDisplay, totalPrice, formData }}>
              <Button variant="contained"
              style={{
                
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: '10px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
                transition: 'background 0.3s ease-in-out, transform 0.2s ease',
                border: 'none',
              }}
              >
                Sıradaki
              </Button>
            </NavLink>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
