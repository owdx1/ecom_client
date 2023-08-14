import React from 'react';
import { Paper, Typography, Badge, Grid, Link as MuiLink, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import dummyImage from '../../images/cat.jpg';
import flameIcon from '../../images/flame-icon.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const MostSaled = ({ originalProducts }) => {
  console.log('tum urunler', originalProducts);
  const isMostSaled = originalProducts.filter((product) => product.bestseller);

  const displayedProducts = isMostSaled.slice(0, 6);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', marginTop: '50px' }}>
        <IconButton style={{ margin: 0 }}>Çok Satan Ürünler</IconButton>
        
        <MuiLink
          component={Link}
          to="/your-path-for-all-most-saled-products"
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

export default MostSaled;
