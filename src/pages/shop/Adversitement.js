import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Typography } from '@mui/material';
import '../../styles/Adversitement.css';
import { SendRounded } from '@mui/icons-material';

const Adversitement = () => {
  return (
    <Container
      style={{
        width: '100%',
        padding: '0 40px',
        margin: '0 auto',
        maxWidth: 1920,
        marginTop: '200px',
        marginBottom: '200px',
      }}
    >
      <Grid
        container
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          justifyContent: 'space-between',
        }}
      >
        <Grid
          item
          className='guide-style-image order-1'
          style={{
            flex: 2, 
            maxWidth: '60vw', 
            height: 'auto',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Link className='guide-style-link' to='/'>
            <img
              src='https://www.classuniforma.com/image/cache/catalog/2023/03/fu%C5%9Fya3-627x941h.jpg'
              alt='Ad Image'
              className='guide-style-img'
              style={{ width: '60%', height: 'auto', borderRadius:'30px' }}
            />
          </Link>
        </Grid>
        <Grid
          item
          className='guide-style-desc order-2'
          style={{
            flex: '1 1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 20,
          }}
        >
          <div
            className='guide-style-text'
            style={{ maxWidth: 500, marginLeft: 40 }}
          >
            <Typography variant='h5' className='title' style={{ marginBottom: '20px' }}>
              KIRMIZI VE YENİ
            </Typography>
            <Typography variant='body1' className='desc'>
              Zamansız renk ve desenlerimizin modern yorumlarıyla tanışın
            </Typography>
          </div>
          <div style={{ marginTop: 20 }}>
            <Button
              variant='contained'
              color='secondary'
              endIcon={<SendRounded />}
              style={{
                marginLeft:'30px',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: '10px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
                transition: 'background 0.3s ease-in-out, transform 0.2s ease',
                border: 'none',
              }}
            >
              Yeni gelenleri keşfet
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Adversitement;
