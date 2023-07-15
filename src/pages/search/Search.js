import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import dummyImage from '../../images/cat.jpg';
import '../../styles/Search.css';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParam = new URLSearchParams(location.search).get('search_parameter');

  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeButton, setActiveButton] = useState('name');

  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    'beyaz', 'acik_mavi', 'parlament_mavisi', 'turkuaz', 'duman_grisi', 'gri', 'lacivert',
    'petrol_mavisi', 'petrol_yesili', 'kuf_yesili', 'benetton_yesili', 'ameliyathane_yesili',
    'pembe', 'lila', 'mor', 'fuchsia', 'kirmizi', 'siyah', 'saks_mavisi', 'fistik_yesili',
    'bordo', 'nar_cicegi', 'fume', 'murdum', 'acik_petrol_yesili', 'avci_yesili', 'ozel_mor',
    'su_yesili', 'visne', 'leylak', 'sari', 'hardal', 'kiremit', 'gul_kurusu', 'somon',
    'haki', 'menekse', 'kot_mavisi', 'bej', 'kahverengi', 'kum_rengi', 'turuncu_turkuaz',
    'mint_yesili', 'mavi', 'krem', 'antep_fistigi'
  ];
  const categories = [
    'takim',
    'tek-ust',
    'tek-alt',
    'tesettur'
  ];

  useEffect(() => {
    const fetchOriginalProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/shop');
        if (response.ok) {
          const { data } = await response.json();
          setOriginalProducts(data);
          originalProducts.map((prod) => console.log(prod))
        } else {
          throw new Error('An error occurred while fetching original products');
        }
      } catch (error) {
        console.error('Error fetching original products:', error);
      }
    };

    fetchOriginalProducts();
  }, []);

  useEffect(() => {
    if (searchParam && originalProducts.length > 0 && activeButton === 'name') {
      const filtered = originalProducts.filter((product) =>
        product.product_name.toLowerCase().includes(searchParam.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchParam, originalProducts, activeButton]);

  const handleSearchByName = (e) => {
    e.preventDefault();
    setActiveButton('name');

    if (searchTerm.trim() !== '') {
      const filtered = originalProducts.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);

      navigate(`/search?search_parameter=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSearchByFeatures = (e) => {
    e.preventDefault();
    setActiveButton('features');

    const filtered = originalProducts.filter((product) =>
      (selectedSize === '' || product.size === selectedSize) &&
      (selectedColor === '' || product.color === selectedColor) 
     // && (selectedCategory === '' || product.category === selectedCategory) simdilik kategori bir ise yaramıyo bu dursun bi
    );
    setFilteredProducts(filtered);

    const queryParams = new URLSearchParams();
    if (selectedSize !== '') {
      queryParams.set('size', encodeURIComponent(selectedSize));
    }
    if (selectedColor !== '') {
      queryParams.set('color', encodeURIComponent(selectedColor));
    }
    if (selectedCategory !== '') {
      queryParams.set('category', encodeURIComponent(selectedCategory));
    }

    const searchParamsString = queryParams.toString();
    navigate(`/search?${searchParamsString}`);
  };

  return (
    <div className="search-page">
      
      <div className="search-container">
        <div className="search-options">
          <div className="search-buttons">
            <button
              className={`search-button ${activeButton === 'name' ? 'active' : ''}`}
              onClick={() => setActiveButton('name')}
            >
              İsme göre ara
            </button>
            <button
              className={`search-button ${activeButton === 'features' ? 'active' : ''}`}
              onClick={() => setActiveButton('features')}
            >
              Özelliğe göre ara
            </button>
          </div>
          {activeButton === 'name' ? (
            <form onSubmit={handleSearchByName}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Ara</button>
            </form>
          ) : (
            <form onSubmit={handleSearchByFeatures}>
              <div className="search-features">
                <div className="search-feature">
                  <span>Size:</span>
                  <div className='size-options'>
                    {sizes.map((size) => (
                      <label key={size}>
                        <input
                          type="button"
                          onClick={() => setSelectedSize(size === selectedSize ? '' : size)}
                          value={size}
                          className={`filter-button ${size === selectedSize ? 'active' : ''}`}
                        />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="search-feature">
                  <span>Color:</span>
                  <div className="color-options">
                    {colors.map((color) => (
                      <label key={color}>
                        <input
                          type="button"
                          onClick={() => setSelectedColor(color === selectedColor ? '' : color)}
                          value={color}
                          className={`filter-button ${color === selectedColor ? 'active' : ''}`}
                        />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="search-feature">
                  <span>Category:</span>
                  <div className="category-options">
                    {categories.map((category) => (
                      <label key={category}>
                        <input
                          type="button"
                          onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                          value={category}
                          className={`filter-button ${category === selectedCategory ? 'active' : ''}`}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <button type="submit">Ara</button>
            </form>
          )}
        </div>
      </div>

      {searchParam && (
        <div className="search-param">
          Aranılan ürün: <span>{searchParam}</span>
        </div>
      )}
      {
        filteredProducts.length > 0 ? 
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
                  </div>
                  {product.quantity <= 4 && product.quantity !== 0 ? <p>Son {product.quantity} ürün!</p> : null}
                  {product.quantity > 0 ? <p>Stokta ✔️</p> : <p>Stokta değil ❌</p>}
                  <div className="product-price-div">
                    <p className="product-price">{product.price} TL</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      :
        <h1>ürün bulunamadi</h1>

      }               
      


    </div>
  );
};

export default Search;
