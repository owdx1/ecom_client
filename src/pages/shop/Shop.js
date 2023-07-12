import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Shop.css';
import dummyImage from '../../images/cat.jpg';

function Shop() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/shop/');
        if (response.ok) {
          const { data } = await response.json();
          setOriginalProducts(data);
          setFilteredProducts(data);
          console.log(data);
        } else {
          throw new Error('An error occurred while fetching the products');
        }
      } catch (error) {
        setErrorMessage('Service unavailable');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts(activeButton);
  }, [activeButton]);

  const filterAndSortProducts = (option) => {
    let filteredProducts = [...originalProducts];

    if (option === 'takim') {
      filteredProducts = filteredProducts.filter((product) => product.category_id === 1);
    } else if (option === 'tek-ust') {
      filteredProducts = filteredProducts.filter((product) => product.category_id === 1);
    } else if (option === 'tek-alt') {
      filteredProducts = filteredProducts.filter((product) => product.category_id === 1);
    } else if (option === 'tesettur') {
      filteredProducts = filteredProducts.filter((product) => product.category_id === 1);
    } else if (option === 'bone') {
      filteredProducts = filteredProducts.filter((product) => product.category_id === 2);
    } else if (option === 'terlik') {
      filteredProducts = filteredProducts.filter((product) => product.category_id === 2);
    }


    setFilteredProducts(filteredProducts);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  const handleButtonClick = (option) => {
    if (activeButton === option) {
      setActiveButton('');
    } else {
      setActiveButton(option);
    }
  };

  return (
    <>
      <div className="filter-container">
        <button
          className={`filter-button ${activeButton === 'takim' ? 'active' : ''}`}
          onClick={() => handleButtonClick('takim')}
        >
          Takım
        </button>
        <button
          className={`filter-button ${activeButton === 'tek-ust' ? 'active' : ''}`}
          onClick={() => handleButtonClick('tek-ust')}
        >
          Tek Üst
        </button>
        <button
          className={`filter-button ${activeButton === 'tek-alt' ? 'active' : ''}`}
          onClick={() => handleButtonClick('tek-alt')}
        >
          Tek Alt
        </button>
        <button
          className={`filter-button ${activeButton === 'tesettur' ? 'active' : ''}`}
          onClick={() => handleButtonClick('tesettur')}
        >
          Tesettür
        </button>
        <button
          className={`filter-button ${activeButton === 'bone' ? 'active' : ''}`}
          onClick={() => handleButtonClick('bone')}
        >
          Bone
        </button>
        <button
          className={`filter-button ${activeButton === 'terlik' ? 'active' : ''}`}
          onClick={() => handleButtonClick('terlik')}
        >
          Terlik
        </button>
      </div>

      <div className="shop-container">
        {filteredProducts.map((product) => (
          <Link key={product.product_id} to={`/shop/products/${product.product_id}`}>
            <div className="product-item">
              <div className="product-image">
                <img src={dummyImage} alt={product.product_id} />
              </div>
              <div className="product-details-main">
                <div className="product-details">
                  <div className="first-detail">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <div className="product-price-div">
                    <p className="product-price"> {product.price} TL</p>
                  </div>
                </div>
                {product.quantity <= 4 ? <p>Son {product.quantity} ürün!</p> : null}
                {product.quantity > 0 ? <p>Stokta ✔️</p> : <p>Stokta değil ❌</p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Shop;
