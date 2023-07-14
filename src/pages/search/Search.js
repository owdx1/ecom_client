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

  useEffect(() => {
    const fetchOriginalProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/shop');
        if (response.ok) {
          const { data } = await response.json();
          setOriginalProducts(data);
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
    if (searchParam && originalProducts.length > 0) {
      const filtered = originalProducts.filter((product) =>
        product.product_name.toLowerCase().includes(searchParam.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchParam, originalProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      const filtered = originalProducts.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);

      navigate(`/search?search_parameter=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="search-page">
      {searchParam && (
        <div className="search-param">
          Aranılan ürün: <span>{searchParam}</span>
        </div>
      )}
      <div className="search-container">
        <div className="search-options">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
            <div className="size-options">
              <label>
                <input type="submit" name="size" value="XXS" />
              </label>
              <label>
                <input type="submit" name="size" value="XS" />
              </label>
              <label>
                <input type="submit" name="size" value="S" />
              </label>
              <label>
                <input type="submit" name="size" value="M" />
              </label>
              <label>
                <input type="submit" name="size" value="L" />
              </label>
              <label>
                <input type="submit" name="size" value="XL" />
              </label>
              <label>
                <input type="submit" name="size" value="XXL" />
              </label>
            </div>
          </form>
        </div>
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
    </div>
  );
};

export default Search;
