import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ImageSlider from '../../utils/ImagesSlider';
import '../../styles/ASingleProduct.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const ASingleProduct = ({ isLoggedIn , getNumberOfProductsInCart }) => {
  const navigate = useNavigate();
  const [errorM, setErrorM] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentFeatureId, setCurrentFeatureId] = useState(0);
  const [currentProduct , setCurrentProduct] = useState({});
  
  const slides = [
    { url: 'https://images.wallpaperscraft.com/image/single/lion_art_colorful_122044_1600x900.jpg', title: 'lion' },
    { url: 'https://images.wallpaperscraft.com/image/single/boat_mountains_lake_135258_1920x1080.jpg', title: 'boats' },
    { url: 'https://images.wallpaperscraft.com/image/single/laptop_keyboard_glow_170138_1600x900.jpg', title: 'laptop' },
    { url: 'https://images.wallpaperscraft.com/image/single/drone_camera_technology_171576_1600x900.jpg', title: 'drone' },
    { url: 'https://images.wallpaperscraft.com/image/single/code_programming_text_140050_1600x900.jpg', title: 'coding' },
  ];



  const location = useLocation();
  useEffect(() => {
    
    const { product } = location.state || {};
    
    setCurrentProduct(product)
    console.log('suanki productabi', currentProduct)
  }, []);
  
  

  const accessToken = localStorage.getItem('accessToken');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(slides[0].url);
  const { product_id } = useParams();

  const [transformedData, setTransformedData] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSize_i, setSelectedSize_i] = useState('');
  const [addToCartSuccessfull, setAddToCartSuccessfull] = useState('');
  const [totalAmount, setTotalAmount] = useState(quantity * currentProduct.price);

  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/shop/products/${product_id}`);
        if (response.ok) {
          const { transformedData, SizeIsNotNUll } = await response.json();
          setTransformedData(transformedData);
          console.log(transformedData);
          setSelectedSize(transformedData[0].size);
          setSelectedSize_i(transformedData[0].size_i);
          setCurrentFeatureId(transformedData[0].feature_id)
        } else {
          throw new Error('An error occurred while fetching the products' , errorM);
        }
      } catch (error) {
        setErrorMessage('Service unavailable');
      } finally {
        setLoading(false);
      }
    };


    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  /*useEffect(() => {
    if ( product === 'undefined') {
      
      return;
    }
  
  
  }, [product]);*/

  useEffect(() => {
    if (errorM !== '') {
      toast.error(errorM, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        className: 'toast-error',
        bodyClassName: 'toast-body',
      });
    }
  }, [errorM]);

  useEffect(() => {
    setTotalAmount(quantity * currentProduct.price);
  }, [quantity, currentProduct.price]);

  useEffect(() =>{
    console.log('current feature id' , currentFeatureId);
  },[currentFeatureId])

  const addToCart = async () => {
    if (selectedSize === '') {
      setErrorM('Please select a size before adding to cart');
      return;
    }
    if (!isLoggedIn) {
      navigate('/login');
      return; // Stop the function execution if not logged in
    }

    const size = currentProduct.category_id === 6 ? selectedSize_i : selectedSize;
    const product_id = currentProduct.product_id;
    console.log('suanki feaute id' , currentFeatureId);
    const color = currentProduct.color;
    const category = currentProduct.category_id;


    try {
      const response = await fetch(`http://localhost:5000/shop/add-basket`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity,
          size,
          product_id,
          category,
          totalAmount,
          currentFeatureId
        }),
      });
      if (response.ok) {
        const { accessToken, message } = await response.json();

        localStorage.setItem('accessToken', accessToken);
        setAddToCartSuccessfull(message);
        getNumberOfProductsInCart(accessToken);

        toast.success('Ürün sepete eklendi ✔️', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });

        /*setTimeout(() => {
          navigate('/');
        }, 3000);   buna gerek var mı yok mu tam emin değilim                 */ 
      } else {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
    } catch (error) {
      setErrorM(`Failed to log in: ${error.message}`);
    }
  };

  const handleThumbnailClick = (imageURL) => {
    setSelectedImage(imageURL);
  };

  const handleSizeButtonClick = (size , feature_id) => {
    if (selectedSize === size) {
      setSelectedSize('');
      setCurrentFeatureId(0);
    } else {
      setSelectedSize(size);
      setCurrentFeatureId(feature_id)
    }
  };

  const handleSize_iButtonClick = (size,feature_id) => {
    if (selectedSize_i === size) {
      setSelectedSize_i(0);
      setCurrentFeatureId(0);
    } else {
      setSelectedSize_i(size);
      setCurrentFeatureId(feature_id)
    }
  };

  return (
    <Container maxWidth="xl">
      <Box mt={2}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
        >
          Anasayfa
        </Button>
      </Box>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <div className="thumbnail-gallery">
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide.url}
                alt={slide.title}
                className={`thumbnail-image ${
                  slide.url === selectedImage ? 'active' : ''
                }`}
                onClick={() => handleThumbnailClick(slide.url)}
              />
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className="image-slider-container">
            <ImageSlider slides={slides} selectedImage={selectedImage} />
          </div>
          {loading ? (
            <CircularProgress />
          ) : (
            <Card>
              <CardContent>
                <div className="product-name-container">
                  <Typography variant="h5" gutterBottom>
                    {currentProduct.product_name}
                  </Typography>
                </div>
                <Typography variant="body1" gutterBottom>
                  Renk: {currentProduct.color}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Desen: {currentProduct.fabric}
                </Typography>
                <div className="sizes-container">
                  {currentProduct.category_id !== 6 ? (
                    transformedData.map((data, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        className={`size-button ${
                          selectedSize === data.size ? 'active' : ''
                        }`}
                        onClick={() => handleSizeButtonClick(data.size, data.feature_id)}
                      >
                        {data.size}
                      </Button>
                    ))
                  ) : (
                    transformedData.map((data, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        className={`size-button ${
                          selectedSize_i === data.size_i ? 'active' : ''
                        }`}
                        onClick={() => handleSize_iButtonClick(data.size_i , data.feature_id)}
                      >
                        {data.size_i}
                      </Button>
                    ))
                  )}
                </div>
                <Typography variant="body1" gutterBottom>
                  Ürün ID'si: {currentProduct.product_id}
                </Typography>
                
                <Typography variant="body1" gutterBottom>
                  Fiyat: {currentProduct.price} TL
                </Typography>
                <div className="quantity-container">
                  <Button variant="outlined" onClick={decreaseQuantity}>
                    -
                  </Button>
                  <span className="quantity-text">{quantity}</span>
                  <Button variant="outlined" onClick={increaseQuantity}>
                    +
                  </Button>
                </div>
                <Typography variant="body1" gutterBottom>
                  Toplam Fiyat: {quantity * currentProduct.price} TL
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addToCart}
                  disabled={addToCartSuccessfull}
                >
                  Sepete Ekle
                </Button>
                <div className="description">
                  <Typography variant="body1" className="product-description">
                    {currentProduct.description}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default ASingleProduct;
