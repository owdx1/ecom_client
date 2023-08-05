import React from 'react';
import { Paper, Typography, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import dummyImage from '../../images/cat.jpg';
import { Grid } from '@mui/material';
import flameIcon from '../../images/flame-icon.png'
const MostSaled = ({ originalProducts }) => {
  console.log('tum urunler' , originalProducts);
  const isMostSaled = originalProducts.filter((product) => product.is_most_saled);

  return (
    <div>
      <h2>Çok satan ürünler</h2>
      <Grid container spacing={2}>
        {isMostSaled.map((product) => (
          <Grid key={product.product_id} item xs={12} sm={6} md={4}>
            <Link to={`/shop/products/${product.product_id}`} state={{ product }}>
              <Paper className="product-item">
              <Badge
                  style={{ paddingRight: '270px', marginTop: '34px' }}
                  color="error"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  badgeContent={`-${parseFloat(product.discount)}%`}
                />
                {product.is_most_saled && (
                  <Badge
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    badgeContent={<img src={flameIcon} alt="Flame Icon" style={{ height: '60px', background: 'transparent', marginBottom:'80px' }} />}
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
