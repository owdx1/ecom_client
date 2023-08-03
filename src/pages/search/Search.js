import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import dummyImage from '../../images/cat.jpg';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import '../../styles/Search.css';

const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const FilterButton = styled(Button)(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  color: selected ? theme.palette.common.white : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParam = new URLSearchParams(location.search).get('search_parameter');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Scroll to top when the component mounts
    scrollToTop();
  }, []);

  

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
  const categories = {
    'takim': 1,
    'tek-ust': 2,
    'tek-alt': 3,
    'tesettur': 4,
    'bone': 5,
    'terlik': 6
  };
  const categoryArray = [
    'takim',
    'tek-ust',
    'tek-alt',
    'tesettur',
    'bone',
    'terlik'
  ];

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
      scrollToTop();
      navigate(`/search?search_parameter=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSearchByFeatures = (e) => {
    e.preventDefault();
    setActiveButton('features');

    const filtered = originalProducts.filter((product) =>
      (selectedSize === '' || product.size === selectedSize) &&
      (selectedColor === '' || product.color === selectedColor)
      && (selectedCategory === '' || product.category_id === categories[selectedCategory])
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
    scrollToTop();
    navigate(`/search?${searchParamsString}`);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-options">
          <SearchContainer>
            <FilterButton
              variant="contained"
              selected={activeButton === 'name'}
              onClick={() => setActiveButton('name')}
            >
              İsme göre ara
            </FilterButton>
            <FilterButton
              variant="contained"
              selected={activeButton === 'features'}
              onClick={() => setActiveButton('features')}
            >
              Özelliğe göre ara
            </FilterButton>
          </SearchContainer>
          {activeButton === 'name' ? (
            <form onSubmit={handleSearchByName}>
              <FormControl>
                <InputBase
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  startAdornment={<SearchIcon />}
                />
              </FormControl>
              <Button className='ara-button' type="submit" variant="contained">Ara</Button>
            </form>
          ) : (
            <form onSubmit={handleSearchByFeatures}>
              <div className="search-features">
                <div className="search-feature">
                  <span>Size:</span>
                  <FormControl>
                    <Select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      <MenuItem value="">Tümü</MenuItem>
                      {sizes.map((size) => (
                        <MenuItem key={size} value={size}>{size}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="search-feature">
                  <span>Color:</span>
                  <FormControl>
                    <Select
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                    >
                      <MenuItem value="">Tümü</MenuItem>
                      {colors.map((color) => (
                        <MenuItem key={color} value={color}>{color}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="search-feature">
                  <span>Category:</span>
                  <FormControl>
                    <Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <MenuItem value="">Tümü</MenuItem>
                      {categoryArray.map((category) => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <Button type="submit" variant="contained">Ara</Button>
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
                  <div className="product-image-search">
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
