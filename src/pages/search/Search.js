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
import {Grid} from '@mui/material';
import { Container } from '@mui/material';
import {CardHeader} from '@mui/material';
import {CardContent} from '@mui/material';
import {Typography} from '@mui/material';
import {Box} from '@mui/material';
import '../../styles/Search.css';
import {Card} from '@mui/material';


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
  const searchParamTag = new URLSearchParams(location.search).get('tag');

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
        <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {filteredProducts.map((product , index) => (
            
            <Grid
              item
              key={product.title}
              xs={12}
              sm={product.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Link to={`/shop/products/${product.product_id}`}  state={{ product , originalProducts}}>
              <Card>
                {/*{product.isproductoftheweek && (
                    <Badge
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      badgeContent={<img src={starIcon} alt="Star Icon" style={{ height: '30px', background: 'transparent' }} />}
                      style={{ marginRight: '330px' , paddingTop:'70px'}}
                      badgeStyle={{ backgroundColor: 'transparent' }}
                    />
                  )}
                  {product.bestseller >= 10 && (
                    <Badge
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      badgeContent={<img src={flameIcon} alt="Flame Icon" style={{ height: '30px', background: 'transparent'}} />}
                      style={{ marginLeft: '350px' }}
                      badgeStyle={{ backgroundColor: 'transparent' }}
                    />
                    )}*/}
                <img 
                src='https://i.ibb.co/tbRJ8N9/id-15.jpg'
                style={{width:'300px'}}
                className='image-zoom'
                alt={product.id}
                
                />
                

                

                <CardHeader
                  title={product.product_name}
                  
                  titleTypographyProps={{ align: 'center' }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      gap: '8px',
                      mb: 2,
                    }}
                  >
                    
                    <Typography variant="h6" color="text.secondary">
                      <span style={{ color: 'crimson', textDecoration: 'line-through' }}>{`529.99`}</span>
                    </Typography>
                    <Typography component="h2" variant="h5" color="text.primary">
                      {product.price} TL
                    </Typography>
                  </Box>
                  
                </CardContent>
                
              </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
          :
          <h1>ürün bulunamadi</h1>
      }
    </div>
  );
};

export default Search;
