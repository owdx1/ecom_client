import React, { useEffect } from 'react';
import { Paper, Typography, Badge } from '@mui/material';
import dummyImage from '../../images/cat.jpg';
import { Grid } from '@mui/material';
import flameIcon from '../../images/flame-icon.png'
import {useState} from 'react';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {IconButton} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {Container} from '@mui/material';

const categories = {
  1:'takim',
  2:'tek-ust',
  3:'tek-alt',
  4:'tesettur',
  5:'bone',
  6:'terlik'
};


const SameCategoryProducts = ({originalProducts , category_id, product_id}) => {
    
    console.log('BANA GELEN FİLTERED PRODUCTS' , originalProducts);
    const filteredProducts = originalProducts.filter((item) => (item.category_id === category_id) && (item.product_id !== product_id));
    const displayedProducts = filteredProducts.slice(0, 6);

    
    

  return (
    <div id='same-category'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', marginTop:'50px'}}>
        <IconButton style={{ margin: 0 }}>Aynı kategorinin diğer ürünlerine göz atın!</IconButton>
        
          <Link
            component={Link}
            to={`/search?category=${categories[category_id]}`}
            style={{ textDecoration: 'none' }}
          >
            <IconButton aria-label="Tümünü Gör">Tümünü Gör &nbsp;
              <ArrowForwardIcon />
            </IconButton>
          </Link>
        
      </div>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {displayedProducts.map((product , index) => (
            
            <Grid
              item
              key={product.title}
              xs={12}
              sm={product.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
               <Link to={`/shop/products/${product.product_id}`}  state={{ product , originalProducts}}>
              <Card>
                {/*{product.isproductoftheweek && (
                    <Badge
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      badgeContent={<img src={starIcon} alt="Star Icon" style={{ height: '30px', background: 'transparent' }} />}
                      style={{ marginRight: '330px' , paddingTop:'70px'}}
                      badgeStyle={{ backgroundColor: 'transparent' }}
                    />
                  )}
                  {product.bestseller >= 10 && (
                    <Badge
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      badgeContent={<img src={flameIcon} alt="Flame Icon" style={{ height: '30px', background: 'transparent'}} />}
                      style={{ marginLeft: '350px' }}
                      badgeStyle={{ backgroundColor: 'transparent' }}
                    />
                    )}*/}
                <img 
                src='https://i.ibb.co/tbRJ8N9/id-15.jpg'
                style={{width:'300px'}}
                className='image-zoom'
                alt={product.id}
                
                />
                

                

                <CardHeader
                  title={product.product_name}
                  
                  titleTypographyProps={{ align: 'center' }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      gap: '8px',
                      mb: 2,
                    }}
                  >
                    
                    <Typography variant="h6" color="text.secondary">
                      <span style={{ color: 'crimson', textDecoration: 'line-through' }}>{`529.99`}</span>
                    </Typography>
                    <Typography component="h2" variant="h5" color="text.primary">
                      {product.price} TL
                    </Typography>
                  </Box>
                  
                </CardContent>
                
              </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default SameCategoryProducts;
