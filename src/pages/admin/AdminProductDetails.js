import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Button, TextField, Typography, Container, Grid, Card, CardMedia, CardContent } from '@mui/material';

const AdminProductDetails = () => {
  const location = useLocation();
  const { product } = location.state;
  const [updatedProduct, setUpdatedProduct] = useState({
    product_name: product.product_name,
    price: product.price,
    color: product.color,
    category_id: product.category_id,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Updated Product:', updatedProduct);
  };

  const slides = [
    { url: 'https://images.wallpaperscraft.com/image/single/lion_art_colorful_122044_1600x900.jpg', title: 'lion' },
    { url: 'https://images.wallpaperscraft.com/image/single/boat_mountains_lake_135258_1920x1080.jpg', title: 'boats' },
    { url: 'https://images.wallpaperscraft.com/image/single/laptop_keyboard_glow_170138_1600x900.jpg', title: 'laptop' },
    { url: 'https://images.wallpaperscraft.com/image/single/drone_camera_technology_171576_1600x900.jpg', title: 'drone' },
    { url: 'https://images.wallpaperscraft.com/image/single/code_programming_text_140050_1600x900.jpg', title: 'coding' },
  ];

  return (
    <>
      <NavLink to='/admin/products'>
        <Button variant="contained" color="primary">
          Ürünler
        </Button>
      </NavLink>
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Typography variant="h4" gutterBottom>
          Ürün Detayları
        </Typography>
        <Card sx={{ mb: 2 }}>
          <CardMedia component="img" height="300" image={slides[0].url} alt={slides[0].title} />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {product.product_name}
            </Typography>
            <Typography gutterBottom>
              Fiyat: {product.price} TL
            </Typography>
            <Typography gutterBottom>
              Renk: {product.color}
            </Typography>
            <Typography gutterBottom>
              Kategori: {product.category_id}
            </Typography>
          </CardContent>
        </Card>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ürün İsmi"
                name="product_name"
                value={updatedProduct.product_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fiyat"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Renk"
                name="color"
                value={updatedProduct.color}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Kategori"
                name="category_id"
                value={updatedProduct.category_id}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Güncelle
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default AdminProductDetails;
