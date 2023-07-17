import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../../styles/Shop.css';
import dummyImage from '../../images/cat.jpg';
import ImageSlider from '../../utils/ImagesSlider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const slides = [
  { url: 'https://images.wallpaperscraft.com/image/single/lion_art_colorful_122044_1600x900.jpg', title: 'lion' },
  { url: 'https://images.wallpaperscraft.com/image/single/boat_mountains_lake_135258_1920x1080.jpg', title: 'boats' },
  { url: 'https://images.wallpaperscraft.com/image/single/laptop_keyboard_glow_170138_1600x900.jpg', title: 'laptop' },
  { url: 'https://images.wallpaperscraft.com/image/single/drone_camera_technology_171576_1600x900.jpg', title: 'drone' },
  { url: 'https://images.wallpaperscraft.com/image/single/code_programming_text_140050_1600x900.jpg', title: 'coding' },
];

const containerStyles = {
  width: '1900px',
  height: '600px',
  margin: '70px auto',
};

function Shop() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeButton, setActiveButton] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchBarPopupVisible, setSearchBarPopupVisible] = useState(false);

  const location = useLocation();
  const { toastMessage } = location.state || {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/shop/');
        if (response.ok) {
          const { data } = await response.json();
          setOriginalProducts(data);
          setFilteredProducts(data);
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
      filteredProducts = filteredProducts.filter((product) => product.category_id === 2);
    } else if (option === 'tek-alt') {
      filteredProducts = filteredProducts.filter((product) => product.category_id === 3);
    } else if (option === 'tesettur') {
      filteredProducts = filteredProducts.filter((product) => product.category_id === 4);
    } else if (option === 'bone') {
      filteredProducts = filteredProducts.filter((product) => product.category_id === 5);
    } else if (option === 'terlik') {
      filteredProducts = filteredProducts.filter((product) => product.category_id === 6);
    }

    setFilteredProducts(filteredProducts);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    searchResultChanger();
  }, [searchTerm]);

  const searchResultChanger = () => {
    let results = [...originalProducts];

    if (searchTerm !== '') {
      results = results.filter((product) => {
        return product.product_name && product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
      });

      setSearchResults(results.slice(0, 5));
      setSearchBarPopupVisible(true);
    } else {
      setSearchBarPopupVisible(false);
    }
  };

  const handleButtonClick = (option) => {
    if (activeButton === option) {
      setActiveButton('');
    } else {
      setActiveButton(option);
    }
  };

  useEffect(() => {
    if (toastMessage) {
      toast.info(toastMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  }, [toastMessage]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchBarPopupVisible && (
          <div className="search-results">
            {searchResults.map((product) => (
              <Link key={product.product_id} to={`/shop/products/${product.product_id}`} state={{ product }}>
                <div className="search-result-item">
                  <img src={dummyImage} alt={product.product_id} />
                  <div>
                    <h3>{product.product_name}</h3>
                    <p>{product.price} tl</p>
                  </div>
                </div>
              </Link>
            ))}
            {searchResults.length === 5 && (
              <NavLink to={`/search?search_parameter=${searchTerm}`} className="see-all-link">
                See All Results
              </NavLink>
            )}
            {searchResults.length === 0 && <p>Sonuç bulunamadı</p>}
          </div>
        )}
      </div>

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

      <div style={{ alignItems: 'center' }}>
        <h2 style={{ fontWeight: '100', textAlign: 'center' }}> Tüm ürünler </h2>
      </div>
      <div className="shop-container">
        {filteredProducts.map((product) => (
          <Link key={product.product_id} to={`/shop/products/${product.product_id}`} state={{ product }}>
            <div className="product-item">
              <div className="product-image">
                <img src={dummyImage} alt={product.product_id} />
              </div>
              <div className="product-details-main">
                <div className="first-detail">
                  <p>{product.product_name}</p>
                  <p>Renk: {product.color}</p>
                  <p>İndirim {product.discount}</p>
                </div>
                <div className="product-price-div">
                  <p className="product-price"> {product.price} TL</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Shop;
