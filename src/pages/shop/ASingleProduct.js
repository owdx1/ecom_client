import React, { useEffect, useState } from 'react';
import { json, useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ImageSlider from '../../utils/ImagesSlider';
import '../../styles/ASingleProduct.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ASingleProduct = ({ isLoggedIn }) => {
  console.log("is logged in:", isLoggedIn);
  const navigate = useNavigate();
  const [errorM, setErrorM] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const slides = [
    { url: 'https://images.wallpaperscraft.com/image/single/lion_art_colorful_122044_1600x900.jpg', title: 'lion' },
    { url: 'https://images.wallpaperscraft.com/image/single/boat_mountains_lake_135258_1920x1080.jpg', title: 'boats' },
    { url: 'https://images.wallpaperscraft.com/image/single/laptop_keyboard_glow_170138_1600x900.jpg', title: 'laptop' },
    { url: 'https://images.wallpaperscraft.com/image/single/drone_camera_technology_171576_1600x900.jpg', title: 'drone' },
    { url: 'https://images.wallpaperscraft.com/image/single/code_programming_text_140050_1600x900.jpg', title: 'coding' },
  ];

  const location = useLocation();
  const { product } = location.state;
  console.log('state ile gelen product', product);

  const accessToken = localStorage.getItem('accessToken');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(slides[0].url);
  const { product_id } = useParams();

  const [transformedData, setTransformedData] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSize_i, setSelectedSize_i] = useState('');
  const [addToCartSuccessfull, setAddToCartSuccessfull] = useState('');
  const [totalAmount, setTotalAmount] = useState(quantity * product.price);
  console.log('total amount init', totalAmount);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/shop/products/${product_id}`);
      if (response.ok) {
        const { transformedData, SizeIsNotNUll } = await response.json();
        console.log('TRANSFORMED DATA', transformedData, 'NNULL OLMAYAN SIZELER', SizeIsNotNUll);
        setTransformedData(transformedData);
        setSelectedSize(transformedData[0].size);
        setSelectedSize_i(transformedData[0].size_i);
      } else {
        throw new Error('An error occurred while fetching the products');
      }
    } catch (error) {
      setErrorMessage('Service unavailable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0,0)
  }, []);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    console.log('suanki urun miktari', quantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

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
    setTotalAmount(quantity * product.price);
  }, [quantity, product.price]);

  const addToCart = async () => {
    if (selectedSize === '') {
      setErrorM('Please select a size before adding to cart');
      return;
    }
    if (!isLoggedIn) {
      navigate('/login');
      return; // Stop the function execution if not logged in
    }

    const size = product.category_id === 6 ? selectedSize_i : selectedSize;
    console.log('isteği yaparken', selectedSize_i, selectedSize);
    console.log('seçim sonrasi sectigim size', size);
    const product_id = product.product_id;
    const color = product.color;
    const category = product.category_id;

    try {
      const response = await fetch(`http://localhost:5000/shop/add-basket`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          quantity,
          size,
          product_id,
          category,
          totalAmount,
        }),
        // normalde pattern de yollamam lazım ama dbye eklenince yollarım
      });
      if (response.ok) {
        const { accessToken, message } = await response.json();

        localStorage.setItem('accessToken', accessToken);
        setAddToCartSuccessfull(message);

        toast.success('Ürün sepete eklendi ✔️', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate('/');
        }, 3000);
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

  const handleSizeButtonClick = (size) => {
    if (selectedSize === size) {
      setSelectedSize('');
    } else {
      setSelectedSize(size);
    }
  };

  const handleSize_iButtonClick = (size) => {
    if (selectedSize_i === size) {
      setSelectedSize_i(0);
    } else {
      setSelectedSize_i(size);
    }
  };

  return (
    <div className="container">
      <div className="thumbnail-gallery">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.url}
            alt={slide.title}
            className={`thumbnail-image ${slide.url === selectedImage ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(slide.url)}
          />
        ))}
      </div>
      <div className="image-slider-container">
        <ImageSlider slides={slides} selectedImage={selectedImage} />
      </div>

      <div className="product-details">
        <div className="product-name-container">
          <h2 className="product-name">{product.product_name}</h2>
          {/*<h3 className="product-stock">{product.quantity > 0 ? 'In Stock ✔️' : 'Out of Stock ❌'}</h3>*/}
        </div>

        <p className="product-info">Color: {product.color}</p>
        <p className="product-info">Fabric: {product.fabric}</p>
        <div className="sizes-container">
          {product.category_id !== 6 ? (
            transformedData.map((data, index) => (
              <button
                key={index}
                className={`size-button ${selectedSize === data.size ? 'active' : ''}`}
                onClick={() => handleSizeButtonClick(data.size)}
              >
                {data.size}
              </button>
            ))
          ) : (
            transformedData.map((data, index) => (
              <button
                key={index}
                className={`size-button ${selectedSize_i === data.size_i ? 'active' : ''}`}
                onClick={() => handleSize_iButtonClick(data.size_i)}
              >
                {data.size_i}
              </button>
            ))
          )}
        </div>

        <p className="product-info">Product ID: {product.product_id}</p>
        <p className="product-info">Category ID: {product.category_id}</p>
        <p className="product-info">Price: {product.price} TL</p>

        <div className="quantity-container">
          <button className="quantity-button" onClick={decreaseQuantity}>
            -
          </button>
          <span className="quantity-text">{quantity}</span>
          <button className="quantity-button" onClick={increaseQuantity}>
            +
          </button>
        </div>
        <p className="price">Total Price: {quantity * product.price} TL</p>
        <button className="add-to-cart-button" onClick={addToCart}>
          Add to Cart
        </button>
        <div className="description">
          <p className="product-description">{product.description}</p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ASingleProduct;
