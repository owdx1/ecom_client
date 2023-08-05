import React, { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Button, TextField, Typography, Container, Grid, Card, CardMedia, CardContent, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const AdminProductDetails = () => {
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [backendMessage, setBackendMessage] = useState("");

  const colors = [
    'beyaz', 'acik_mavi', 'parlament_mavisi', 'turkuaz', 'duman_grisi', 'gri', 'lacivert',
    'petrol_mavisi', 'petrol_yesili', 'kuf_yesili', 'benetton_yesili', 'ameliyathane_yesili',
    'pembe', 'lila', 'mor', 'fuchsia', 'kirmizi', 'siyah', 'saks_mavisi', 'fistik_yesili',
    'bordo', 'nar_cicegi', 'fume', 'murdum', 'acik_petrol_yesili', 'avci_yesili', 'ozel_mor',
    'su_yesili', 'visne', 'leylak', 'sari', 'hardal', 'kiremit', 'gul_kurusu', 'somon',
    'haki', 'menekse', 'kot_mavisi', 'bej', 'kahverengi', 'kum_rengi', 'turuncu_turkuaz',
    'mint_yesili', 'mavi', 'krem', 'antep_fistigi'
  ];
  const categories = {
    1: 'takim',
    2: 'tek-ust',
    3: 'tek-alt',
    4: 'tesettur',
    5: 'bone',
    6: 'terlik'
  };

  useEffect(() => {
    setProduct(location.state.product);
  }, [location]);

  useEffect(() => {
    if (backendMessage) {
      toast.info(backendMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  }, [backendMessage]);

  const [updatedProduct, setUpdatedProduct] = useState({});

  useEffect(() => {
    // Set the initial state of updatedProduct to match the original product fields
    setUpdatedProduct({
      product_name: product.product_name,
      price: product.price,
      color: product.color,
      category_id: product.category_id,
      is_product_of_the_week: product.is_product_of_the_week,
    });
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'is_product_of_the_week') {
      if (value === 'true' || value === 'false') {
        setUpdatedProduct({
          ...updatedProduct,
          [name]: value === 'true',
        });
      } else {
        console.error('Invalid value for "Haftanın ürünü". It can only be "true" or "false".');
      }
    } else {
      setUpdatedProduct({
        ...updatedProduct,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (updatedProduct.is_product_of_the_week === null){
      toast.warn('Haftanın ürünü kısmını giriniz');
      return;
    }

    const adminToken = localStorage.getItem('adminToken');
    console.log('giden ürün' , updatedProduct);
    try {
      const response = await fetch(`http://localhost:5000/admin/patch-a-product/${product.product_id}`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(updatedProduct),
      });

      const data = await response.json();

      if (response.ok) {
        setBackendMessage(data.message);
      } else {
        throw new Error(data.message || 'Failed to update');
      }

    } catch (error) {
      console.error(error);
      setBackendMessage(error.message || 'Failed to update');
    }
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
              Kategori: {categories[product.category_id]}
            </Typography>
            <Typography gutterBottom>
              Beden: {product.product_size}
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
                value={updatedProduct.product_name || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fiyat"
                name="price"
                value={updatedProduct.price || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={colors}
                getOptionLabel={(option) => option}
                value={updatedProduct.color || ""}
                onChange={(event, newValue) => {
                  handleChange({ target: { name: "color", value: newValue } });
                }}
                renderInput={(params) => <TextField {...params} label="Renk" fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Kategori"
                name="category_id"
                value={categories[updatedProduct.category_id] || ""}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="is_product_of_the_week-label">Haftanın ürünü</InputLabel>
                <Select
                  labelId="is_product_of_the_week-label"
                  id="is_product_of_the_week"
                  name="is_product_of_the_week"
                  value={String(updatedProduct.is_product_of_the_week) || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                Güncelle
              </Button>
            </Grid>
          </Grid>
        </form>
        <ToastContainer />
      </Container>
    </>
  );
};

export default AdminProductDetails;
