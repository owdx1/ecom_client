import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CircularProgress, TextField, Paper, Typography, Container, Grid, IconButton } from '@mui/material';
import '../../styles/Shop.css';
import '../../styles/Preview.css'
import dummyImage from '../../images/cat.jpg';
import dummyImage2 from '../../images/onluk_1.jpg';
import ImageSlider from '../../utils/ImagesSlider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Showcase from './Showcase';
import MostSaled from './MostSaled';
import ItemsOfTheWeek from './ItemsOfTheWeek';
import { Badge } from '@mui/material';
import flameIcon from '../../images/flame-icon.png';
import starIcon from '../../images/star-icon.png';
import Adversitement from './Adversitement';
import SmallShowcase from './SmallShowcase';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HorizontalSection from './HorizontalSection';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';


const slides = [
  'https://images.wallpaperscraft.com/image/single/lion_art_colorful_122044_1600x900.jpg',
  'https://images.wallpaperscraft.com/image/single/boat_mountains_lake_135258_1920x1080.jpg', 
  'https://images.wallpaperscraft.com/image/single/laptop_keyboard_glow_170138_1600x900.jpg', 
  'https://images.wallpaperscraft.com/image/single/drone_camera_technology_171576_1600x900.jpg',
  'https://images.wallpaperscraft.com/image/single/code_programming_text_140050_1600x900.jpg',
];

const containerStyles = {
  width: '100%',
  height: '600px',
  margin: '70px auto',
};

const Shop = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeButton, setActiveButton] = useState('');
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0); // image hoverde foto değiştirmesi için kullanılıyor
  const handleImageHover = (index) => {
    setHoveredImageIndex(index);
  };

  const handleImageLeave = () => {
    setHoveredImageIndex(null);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchBarPopupVisible, setSearchBarPopupVisible] = useState(false);

  // const [payloadToDetailedPage , setPayloadToDetailedPage] = useState({});



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
    return (
      <div className='CircularProgress'>
        <CircularProgress />
      </div>
    );
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <Container>
      <SmallShowcase/>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
      <div className="search-container">
        <TextField
          type="text"
          placeholder="Neye ihtiyacınız var?"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        {searchBarPopupVisible && (
          <Paper className="search-results">
            {searchResults.map((product) => (
              <Link key={product.product_id} to={`/shop/products/${product.product_id}`} state={{ product }}>
                <div className="search-result-item">
                  <img src={dummyImage} alt={product.product_id} />
                  <div>
                    <Typography variant="h6">{product.product_name}</Typography>
                    <Typography variant="body1">{product.price} tl</Typography>
                  </div>
                </div>
              </Link>
            ))}
            {searchResults.length === 5 && (
              <NavLink to={`/search?search_parameter=${searchTerm}`} className="see-all-link">
                See All Results  
              </NavLink>
            )}
            {searchResults.length === 0 && <Typography variant="body1">Sonuç bulunamadı</Typography>}
          </Paper>
        )}
      </div>

      <Showcase/>
      <MostSaled originalProducts={originalProducts}/>
      <HorizontalSection/>
      <ItemsOfTheWeek originalProducts={originalProducts}/>
      <Adversitement/>

      <div className="filter-container" style={{marginTop:'70px'}}>
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

      <div style={{ alignItems: 'center'}}>
        <IconButton variant="h2" style={{ fontWeight: '100', textAlign: 'center', fontSize:'30px'}}>
          Tüm ürünler
        </IconButton>
      </div>
      <Container maxWidth="md" component="main" id='all-products'>
        <Grid container spacing={5} alignItems="flex-end">
          {filteredProducts.map((product , index) => {
            let url1 = '';
            let url2 = '';
            const photoUrls = product.photoUrls; 
            const singleArrayOne = photoUrls[filteredProducts.length - 1];
            const singleArrayTwo = photoUrls[filteredProducts.length - 2];

            if(singleArrayOne === undefined){
              url1 = 'https://i.ibb.co/tbRJ8N9/id-15.jpg'
            } else{
              url1 = singleArrayOne.url
            }
            if(singleArrayTwo === undefined){
              url2 = 'https://www.classuniforma.com/image/cache/catalog/2023/03/murdum-627x941h.jpg'
            } else {
              url2 = singleArrayTwo.url
            }
            
          
          return (
            
            <Grid
              item
              key={product.title}
              xs={12}
              sm={product.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              {product.photoUrls[0] && console.log('suanki her produtcutn photoURL', product.photoUrls[0].url)}
              <Link to={`/shop/products/${product.product_id}`}  state={{ product , originalProducts}}>
              <Card>
                <img 
                  src={hoveredImageIndex === index ? url1 : url2}
                  style={{
                      width: '300px',
                      transition: 'transform 0.9s ease-in-out' 
                      
                  }}
                  className='image-zoom'
                  alt={product.id}
                  onMouseEnter={() => handleImageHover(index)} 
                  onMouseLeave={handleImageLeave}
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
                      <span style={{ color: 'crimson', textDecoration: 'line-through' }}>{(product.discount !== null ? product.discount : `529.99`)}</span>
                    </Typography>
                    <Typography component="h2" variant="h5" color="text.primary">
                      {product.price} TL
                    </Typography>
                  </Box>
                  
                </CardContent>
                
              </Card>
              </Link>
            </Grid>
          )})}
        </Grid>
      </Container>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default Shop;
