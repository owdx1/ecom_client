import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImageSlider from '../../utils/ImagesSlider';
import '../../styles/ASingleProduct.css';

const ASingleProduct = () => {
  const slides = [
    { url: 'https://images.wallpaperscraft.com/image/single/lion_art_colorful_122044_1600x900.jpg', title: 'lion' },
    { url: 'https://images.wallpaperscraft.com/image/single/boat_mountains_lake_135258_1920x1080.jpg', title: 'boats' },
    { url: 'https://images.wallpaperscraft.com/image/single/laptop_keyboard_glow_170138_1600x900.jpg', title: 'laptop' },
    { url: 'https://images.wallpaperscraft.com/image/single/drone_camera_technology_171576_1600x900.jpg', title: 'drone' },
    { url: 'https://images.wallpaperscraft.com/image/single/code_programming_text_140050_1600x900.jpg', title: 'coding' },
  ];
  const location = useLocation();
  const { product } = location.state;
  console.log(product);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(slides[0].url);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addToCart = () => {
    console.log(`Added ${quantity} product(s) to the cart`);
  };

  const handleThumbnailClick = (imageURL) => {
    setSelectedImage(imageURL);
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
          <h3 className="product-stock">{product.quantity > 0 ? 'In Stock ✔️' : 'Out of Stock ❌'}</h3>
        </div>

        <p className="product-info">Color: {product.color}</p>
        <p className="product-info">Fabric: {product.fabric}</p>
        <p className="product-info">Size: {product.size}</p>
        <p className="product-info">Product ID: {product.product_id}</p>
        <p className="product-info">Category ID: {product.category_id}</p>
        <p className="product-info">Price: {product.price} TL</p>

        <div className="quantity-container">
          <button className="quantity-button" onClick={decreaseQuantity}>-</button>
          <span className="quantity-text">{quantity}</span>
          <button className="quantity-button" onClick={increaseQuantity}>+</button>
        </div>
        <p className="price">Total Price: {quantity * product.price} TL</p>
        <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button>
        <div className="description">
          <p className="product-description">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ASingleProduct;
