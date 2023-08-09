import React, { useEffect } from 'react';
import { Paper, Typography, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import dummyImage from '../../images/cat.jpg';
import { Grid } from '@mui/material';
import flameIcon from '../../images/flame-icon.png'
import {useState} from 'react';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SameCategoryProducts = ({ filteredProducts }) => {
    
    const [display, setDisplay] = useState([]);
    useEffect(() =>{
      console.log('BANA GELEN FİLTERED PRODUCTS' , filteredProducts);
      setDisplay(filteredProducts);
    },[])
    

  return (
    <div>
      <h2>Aynı kategorinin farklı ürünlerine göz atın!</h2>
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
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
                  badgeContent={<FavoriteBorderIcon/>}
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

export default SameCategoryProducts;
