import React from 'react';
import { Paper, Typography, Badge, Grid, Link as MuiLink, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import dummyImage from '../../images/cat.jpg';
import starIcon from '../../images/star-icon.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ItemsOfTheWeek = ({ originalProducts }) => {
  console.log('tum urunler', originalProducts);
  const itemsOfTheWeek = originalProducts.filter(
    (product) => product.is_product_of_the_week
  );

  // Restrict to a maximum of 6 products
  const displayedProducts = itemsOfTheWeek.slice(0, 6);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', marginTop:'50px'}}>
        <IconButton style={{ margin: 0 }}>Haftanın Ürünleri</IconButton>
        
          <MuiLink
            component={Link}
            to="/your-path-for-all-items-of-the-week"
            style={{ textDecoration: 'none' }}
          >
            <IconButton aria-label="Tümünü Gör">Tümünü Gör &nbsp;
              <ArrowForwardIcon />
            </IconButton>
          </MuiLink>
        
      </div>
      <Grid container spacing={2}>
        {displayedProducts.map((product) => (
          <Grid key={product.product_id} item xs={12} sm={6} md={4}>
            <Link to={`/shop/products/${product.product_id}`} state={{ product }}>
              <Paper className="product-item">
                <Badge
                  style={{ paddingRight: '270px', marginTop: '34px' }}
                  
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  badgeContent={<FavoriteBorderIcon/>}
                />
                {product.is_product_of_the_week && (
                  <Badge
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    badgeContent={<img src={starIcon} alt="Star Icon" style={{ height: '30px', background: 'transparent', marginBottom: '50px' }} />}
                    style={{ marginRight: '330px' }}
                    badgeStyle={{ backgroundColor: 'transparent' }}
                  />
                )}

                <div className="product-image-shop">
                  <img src={dummyImage} alt={product.product_id} />
                </div>
                <div className="product-details-main">
                  <div className="first-detail">
                    <Typography variant="body1" style={{ marginTop: '10px' }}>
                      {product.product_name}
                    </Typography>
                  </div>
                  <div className="product-price-div">
                    <Typography variant="h5" className="product-price">
                      {product.price} TL
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ItemsOfTheWeek;
