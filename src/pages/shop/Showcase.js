import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for routing
import { Box, Card, CardMedia, Typography } from '@mui/material';
import dummyImage from '../../images/cat.jpg';
import onluk1 from '../../images/onluk_1.jpg';
import tekUst1 from '../../images/tek-ust_1.jpg';
import tesettur1 from '../../images/tesettur_1.jpg';
import uFlex1 from '../../images/u-flex_1.jpg';
import tekUst2 from '../../images/tek-ust_2.jpg';
import tekAlt1 from '../../images/tek-alt_1.jpg';

const cartStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  borderRadius: '4px',
  width: '220px',
  height: '350px', 
  margin: '16px',
  textDecoration: 'none',
  color: 'inherit',
  
};

const imageStyle = {
  width: '290px',
  height: '250px', 
  marginBottom: '8px',
  objectFit: 'contain',
};

const productNameStyle = {
  fontWeight: 'bold',
  fontSize: '24px',
};

const Showcase = () => {
  return (
    <div style={{ textAlign: 'center', width: '100%'}}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        <div style={{border:'1px solid', borderRadius:'3px' , margin:'10px' , borderColor:'lightgray'}}>
            <Link to="/search?search_parameter=u-flex Takım" style={{ ...cartStyle}}>
            <Card elevation={0} sx={{ ...cartStyle }}>
                <CardMedia component="img" image={uFlex1} alt="Product 1" style={{ ...imageStyle }} />
                <Typography variant="subtitle1" sx={{ ...productNameStyle }}>
                u-flex takımlar
                </Typography>
            </Card>
            </Link>
        </div>
        <div style={{border:'1px solid', borderRadius:'3px' , margin:'10px' , borderColor:'lightgray'}}>
            <Link to="/search?search_parameter=onluk" style={{ ...cartStyle}}>
            <Card elevation={0} sx={{ ...cartStyle }}>
                <CardMedia component="img" image={onluk1} alt="Product 1" style={{ ...imageStyle }} />
                <Typography variant="subtitle1" sx={{ ...productNameStyle }}>
                Önlükler
                </Typography>
            </Card>
            </Link>
        </div>
        <div style={{border:'1px solid', borderRadius:'3px' , margin:'10px' , borderColor:'lightgray'}}>
            <Link to="/search?search_parameter=tek ust" style={{ ...cartStyle}}>
            <Card elevation={0} sx={{ ...cartStyle }}>
                <CardMedia component="img" image={tekUst1} alt="Product 1" style={{ ...imageStyle }} />
                <Typography variant="subtitle1" sx={{ ...productNameStyle }}>
                u-flex tek üstler
                </Typography>
            </Card>
            </Link>
        </div>
        <div style={{border:'1px solid', borderRadius:'3px' , margin:'10px' , borderColor:'lightgray'}}>
            <Link to="/search?search_parameter=tesettur" style={{ ...cartStyle}}>
            <Card elevation={0} sx={{ ...cartStyle }}>
                <CardMedia component="img" image={tesettur1} alt="Product 1" style={{ ...imageStyle }} />
                <Typography variant="subtitle1" sx={{ ...productNameStyle }}>
                Tesettürler
                </Typography>
            </Card>
            </Link>
        </div>
        <div style={{border:'1px solid', borderRadius:'3px' , margin:'10px' , borderColor:'lightgray'}}>
            <Link to="/search?search_parameter=alt" style={{ ...cartStyle}}>
            <Card elevation={0} sx={{ ...cartStyle }}>
                <CardMedia component="img" image={tekAlt1} alt="Product 1" style={{ ...imageStyle }} />
                <Typography variant="subtitle1" sx={{ ...productNameStyle }}>
                Tek altlar
                </Typography>
            </Card>
            </Link>
        </div>
        <div style={{border:'1px solid', borderRadius:'3px' , margin:'10px' , borderColor:'lightgray'}}>
            <Link to="/search?search_parameter=core-flex ust" style={{ ...cartStyle}}>
            <Card elevation={0} sx={{ ...cartStyle }}>
                <CardMedia component="img" image={tekUst2} alt="Product 1" style={{ ...imageStyle }} />
                <Typography variant="subtitle1" sx={{ ...productNameStyle }}>
                core-flex üstler
                </Typography>
            </Card>
            </Link>
        </div>
        
      </Box>
    </div>
  );
};

export default Showcase;

