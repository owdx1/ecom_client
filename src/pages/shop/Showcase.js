import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import onluk1 from '../../images/onluk_1.jpg';
import tekUst1 from '../../images/tek-ust_1.jpg';
import tesettur1 from '../../images/tesettur_1.jpg';
import uFlex1 from '../../images/u-flex_1.jpg';
import tekUst2 from '../../images/tek-ust_2.jpg';
import tekAlt1 from '../../images/tek-alt_1.jpg';

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  
  borderRadius: '8px',
  width: '260px',
  height: '450px',
  margin: '16px',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'transform 0.2s',
  border: '1px solid lightgray',
  '&:hover': {
    transform: 'scale(1.05)',
  },
};

const imageStyle = {
  width: '100%',
  height: '390px',
  objectFit: 'cover',
  borderRadius: '8px 8px 0 0', // Rounded corners for the top
};

const productNameStyle = {
  fontWeight: '100',
  fontSize: '23px',
  marginTop: '3px',
  color:'gray'
};

const Showcase = () => {
  const products = [
    { name: 'u-flex takımlar', image: 'https://i.ibb.co/tbRJ8N9/id-15.jpg', link: '/search?search_parameter=u-flex%20Takım' },
    { name: 'Önlükler', image: 'https://i.ibb.co/tbRJ8N9/id-15.jpg', link: '/search?search_parameter=onluk' },
    { name: 'u-flex tek üstler', image: 'https://i.ibb.co/tbRJ8N9/id-15.jpg', link: '/search?search_parameter=tek%20ust' },
    { name: 'Tesettürler', image: 'https://i.ibb.co/tbRJ8N9/id-15.jpg', link: '/search?search_parameter=tesettur' },
    { name: 'Tek altlar', image: 'https://i.ibb.co/tbRJ8N9/id-15.jpg', link: '/search?search_parameter=alt' },
    { name: 'core-flex üstler', image: 'https://i.ibb.co/tbRJ8N9/id-15.jpg', link: '/search?search_parameter=core-flex%20ust' },
  ];

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <Box>
        <Grid container spacing={3} justifyContent="center" style={{gap:'10px'}}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Link to={product.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card elevation={0} style={cardStyle}>
                  <CardMedia component="img" image={product.image} alt={`Product ${index + 1}`} style={imageStyle} />
                  <CardContent>
                    <Typography variant="subtitle1" style={productNameStyle}>
                      {product.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Showcase;
