import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ImageSlider from '../../utils/ImagesSlider';
import '../../styles/ASingleProduct.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Typography, Button, Grid, Card, CardContent, Box, CircularProgress} from '@mui/material';
import MostSaled from './MostSaled';
import {Paper} from '@mui/material';
import {Rating} from '@mui/material';
import ItemsOfTheWeek from './ItemsOfTheWeek';
import SameCategoryProducts from './SameCategoryProducts';
import { ArrowBack } from '@mui/icons-material';

const colors = {
  'beyaz':'#fff', 'acik_mavi':'#add8e6', 'parlament_mavisi':'#0437F2', 'turkuaz':'#30d5c8', 'duman_grisi':'#636969', 'gri':'#ccc', 'lacivert':'"#000080',
  'petrol_mavisi':'#216477', 'petrol_yesili':'#008080', 'kuf_yesili':'#78866b', 'benetton_yesili':'#009A49', 'ameliyathane_yesili':'00995a',
  'pembe':'#ffcbdb', 'lila':'#c8a2c8', 'mor':'#660099 ', 'fuchsia':'#ff00ff', 'kirmizi':'#ec5353', 'siyah':'#000000', 'saks_mavisi':'#657f84', 'fistik_yesili':'#dfff00',
  'bordo':'#800000', 'nar_cicegi':'#6688c1 ', 'fume':'#757a80', 'murdum':'#cc8899', 'acik_petrol_yesili':'#008080', 'avci_yesili':'#355e3b', 'ozel_mor':'#BA55D3',
  'su_yesili':'#addfad', 'visne':'#800000', 'leylak':'#c8a2c8', 'sari':'#ffff00', 'hardal':'#ffdb58', 'kiremit':'#8a3324', 'gul_kurusu':'#c08081', 'somon':'#fa8072',
  'haki':'#bdb76b', 'menekse':'#8b00ff', 'kot_mavisi':'#1560BD', 'bej':'#F5F5DC', 'kahverengi':'#964B00', 'kum_rengi':'#f4a460', 'turuncu_turkuaz':'#08e8de',
  'mint_yesili':'#cfffe5', 'mavi':'#00133d','krem':'#fffdd0','antep_fistigi':'#dfff00'
}

const fakeSlides = [
  'https://images.wallpaperscraft.com/image/single/lion_art_colorful_122044_1600x900.jpg',
  'https://images.wallpaperscraft.com/image/single/boat_mountains_lake_135258_1920x1080.jpg',
  'https://images.wallpaperscraft.com/image/single/laptop_keyboard_glow_170138_1600x900.jpg',
  'https://images.wallpaperscraft.com/image/single/drone_camera_technology_171576_1600x900.jpg',
  'https://images.wallpaperscraft.com/image/single/code_programming_text_140050_1600x900.jpg',
];

const messages = [
  {
    first_name: 'Can',
    stars: 4, 
    message: 'cok güzel bir ürün'
  },
  {
    first_name: 'İrem',
    stars: 4, 
    message: 'cok kötü bir ürün'
  },
  {
    first_name: 'Vural',
    stars: 1, 
    message: 'bu ne ammuğa goim'
  },
]




const ASingleProduct = ({ isLoggedIn , getNumberOfProductsInCart }) => {

  
  const [slides , setSlides] = useState([]);
  const navigate = useNavigate();
  const [errorM, setErrorM] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentFeatureId, setCurrentFeatureId] = useState(0);
  const [currentProduct , setCurrentProduct] = useState({});
  const [originalProducts, setOriginalProducts] = useState([])
  //const [filteredProducts, setFilteredProducts] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const { product_id } = useParams();
  const [transformedData, setTransformedData] = useState([]);
  const [transformedDataTwo, setTransformedDataTwo] = useState([]);

  const [selectedSize, setSelectedSize] = useState('');
  const [addToCartSuccessfull, setAddToCartSuccessfull] = useState('');
  const [totalAmount, setTotalAmount] = useState(quantity * currentProduct.price);
  const [selectedColor , setSelectedColor] = useState('');
  const [currentUniqueColors, setCurrentUniqueColors] = useState([]);
  const [selectedSizeQuantity , setSelectedSizeQuantity] = useState(0);

  const location = useLocation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  //product hakkındaki genel bilgileri state'den al
  useEffect(() => {
    const {product} = location.state || {};
    setCurrentProduct(product);
    console.log('suanki productabi', product);
  }, []);

  // most-saled , same-category ya da product-oftheweek'ten bir ürüne tıklandığı zaman refresh atılmadan aynı sayfada yeni ürünü yansıtma işlemi
  useEffect(() => {
    const {product} = location.state || {};
    setCurrentProduct(product);
    console.log('suanki productabi', product);
    scrollToTop();
  }, [location.state]);

  // tüm ürünleri fetch etme işlemi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/shop/');
        if (response.ok) {
          const { data } = await response.json();
          setOriginalProducts(data);
          
          //const filteredTempProducts = data.filter((product) => product.category_id === currentProduct.category_id);
          //setFilteredProducts(filteredTempProducts);
          //console.log('FİLTRELENMİŞ ÜRÜN' , filteredTempProducts);
          
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
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/shop/products/${product_id}`);
        if (response.ok) {
          const { transformedData} = await response.json();
          setTransformedData(transformedData);
          setTransformedDataTwo(transformedData);
          
          console.log("deneme", transformedData);
          if (transformedData.length > 0) {
            const initialColor = transformedData[0].color;
            console.log('suanki initial color' , initialColor);
            const sizesForInitialColor = transformedData.filter((product) => product.color === initialColor);

            const uniqueColors = [];

            transformedData.map((item) => {
              if (!uniqueColors.includes(item.color)) {
                uniqueColors.push(item.color);
              }
            });

            console.log('suanki unique colors ' , uniqueColors);
            setCurrentUniqueColors(uniqueColors);

            

            
            
            handleColorClick(initialColor);
            setAvailableSizes(sizesForInitialColor);
            //handleSizeButtonClick(sizesForInitialColor[0].size, sizesForInitialColor[0].feature_id);
          }
          
          
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
  }, [location.state]);

  useEffect(() =>{
    let colors = [];
    console.log('transformed DATA 2222222222222222222222222222222222222222222' , transformedDataTwo);
    transformedDataTwo.map((item) =>{
      console.log('suanki itemmmmmmmmmmmmmmmmmmmmm' , item);
      colors.push(item.color);

    })

    console.log('RENKLEERRRRRRRRRRRRRRRRRRRR' , colors);
    handleColorClick(colors[0])
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

  // const sameCategory = filteredProducts.filter((product) => product.category_id === currentProduct.category_id); // databaseden filtrelenmiş ürünler de gelecek. (6-8 tanE

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
    if (selectedColor === '') {
      setErrorM('Please select a color before adding to cart');
      return;
    }
    if (!isLoggedIn) {
      toast.warn('Ürünü sepete eklemek için giriş yapın')
      return; 
    }
    if(quantity > selectedSizeQuantity) {
      toast.warn('Bu bedene ait yeterli stok bulunamadi , lütfen daha az miktarda adet giriniz.');
      return;
    }

    const size = selectedSize;
    const product_id = currentProduct.product_id;
    console.log('suanki feaute id' , currentFeatureId);
    console.log('suanki color ' , selectedColor);
    console.log('suanki size ' , selectedSize);
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
          currentFeatureId,
          color:selectedColor
        }),
      });
      if (response.ok) {
        const { accessToken, message } = await response.json();

        localStorage.setItem('accessToken', accessToken);
        setAddToCartSuccessfull(message); // bu kaldırılabilir
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

  const handleSizeButtonClick = (size , feature_id, selectedSizeQuantity) => {
    if (selectedSize === size) {
      setSelectedSize('');
      setCurrentFeatureId(0);
      setSelectedSizeQuantity(0);
    } else {
      setSelectedSize(size);
      setCurrentFeatureId(feature_id)
      setSelectedSizeQuantity(selectedSizeQuantity)
    }
  };


  const handleColorClick = (color) => {
    
    if (selectedColor === color) {
      setSelectedColor('');
      setAvailableSizes([]);
      setSlides([]); 
    } else {
      setSlides([]); 
      
      setSelectedColor(color);
      const tempSlides = [];
      const sizesForSelectedColor = transformedDataTwo.filter((product) => product.color === color)
      
      if(sizesForSelectedColor.length > 0){
        const selectedPhotoUrls = sizesForSelectedColor[0].photoUrls;
        console.log('suanki secilen photoUrlleri');
        selectedPhotoUrls.map((photoUrl) =>{
          tempSlides.push(photoUrl.url);
        })

        if(tempSlides.length > 0) {
          console.log('suanki tempSlides' , tempSlides);
          setSelectedImage(tempSlides[0]);
          setSlides(tempSlides);
          console.log('suanki temp slides' , tempSlides);
        }
        else{console.log('tempSlides da length yok');}

      }
      setAvailableSizes(sizesForSelectedColor);
      
    }
  };

  useEffect(() => {
    console.log('suanki available sizeler', availableSizes);
  }, [availableSizes]);
  


  return (
    <Container maxWidth="xl" style={{margin:'30px auto' , padding:'0px'}}>
      <Box mt={2}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          style={{
            marginLeft:'30px',
            background: 'linear-gradient(45deg, #AB6B8B 30%, #FF8E53 90%)',
            borderRadius: '10px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            transition: 'background 0.3s ease-in-out, transform 0.2s ease',
            border: 'none',
          }}
        >
          Anasayfa
        </Button>
        </Box>
      <Grid container spacing={3} style={{display:'flex-wrap' , flexWrap:'wrap' , margin:'30px'}}>
        <Grid item xs={12} md={4}>
          <div className="thumbnail-gallery">
            {slides.map((slide, index) => {
            return (
              <img
                key={index}
                src={slide}
                alt={slide.title}
                className={`thumbnail-image ${
                  slide === selectedImage ? 'active' : ''
                }`}
                onClick={() => handleThumbnailClick(slide)}
                style={{width:'200px' , height:'300px' , objectFit:'contain'}}
              />
            )})}
          </div>
          <div>
            {slides.length === 0 && <p>slides length'de uzunluk yok</p>}
              
          </div>
        </Grid>
        <Grid item xs={12} md={8} style={{display:'flex', flexWrap:'wrap', gap:'50px'}}>
          <div className="image-slider-container">
            <ImageSlider slides={slides} selectedImage={selectedImage} />
          </div>
          {loading ? (
            <CircularProgress />
          ) : (
            <Card style={{marginTop:'30px'}}>
              <CardContent>
                <div className="product-name-container">
                  <Typography variant="h3" gutterBottom>
                    {currentProduct.product_name} <Typography variant='h4'>{selectedColor}</Typography>
                  </Typography>
                </div>
                <Typography variant="h6" gutterBottom style={{color:'gray'}}>
                  RENK SEÇENEKLERİ
                </Typography> 
                <div className='color-container' style={{marginBottom:'20px'}}>
                  {currentUniqueColors.map((color) => {
                    let url = '';
                    const sameColorArray = transformedDataTwo.filter((item) => item.color === color);
                    const sameColorObject = sameColorArray[0];
                    const sameColorPhotoUrlsArray = sameColorObject.photoUrls;
                    const firstOfTheArray = sameColorPhotoUrlsArray[0];
                    if(firstOfTheArray === undefined){
                      url = 'https://i.ibb.co/tbRJ8N9/id-15.jpg'
                    } else {
                      url = firstOfTheArray.url;
                    }

                    
                    
                    return (
                      <Button
                      className={`color-button ${
                        selectedColor === color ? 'active' : ''
                      }`}
                      style={{
                        backgroundColor: colors[color],
                        
                        borderRadius: '20%',
                        marginLeft: '16px',
                        boxShadow: selectedColor === color ? '2px 2px 10px black' : 'none', 
                        marginTop:'10px',
                        border:'solid 1px gray'
                      }}
                      onClick={() => handleColorClick(color)}
                    >
                      <img src={url} style={{width:'80px' , borderRadius:'20px'}}></img>
                    
                    </Button>
                    )})}
                  </div>
                  
                
                {/*<Typography variant="body1" gutterBottom>
                  Desen: {currentProduct.fabric}
                  </Typography>*/}
                  
                <div className="sizes-container">
                  {
                    availableSizes.map((data, index) => (
                      <div style={{display:'block'}}>
                        <Button
                          key={index}
                          variant="outlined"
                          className={`size-button ${
                            selectedSize === data.size ? 'active' : ''
                          }`}
                          onClick={() => {
                            if (data.quantity === 0) {
                              
                              setSelectedSize('');
                            } else {
                              
                              handleSizeButtonClick(data.size, data.feature_id, data.quantity);
                            }
                          }}
                          disabled={data.quantity === 0}
                        >
                          {data.size}
                        </Button>
                        <Typography variant='h6' style={{color:'gray'}}>{(data.quantity <= 3 && data.quantity !== 0) && <p> // son {data.quantity} ürün!</p>}</Typography>
                      
                      </div>
                      
                    ))
                  }
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
                  style={{
                    marginTop:'30px',
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    borderRadius: '10px',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    color: 'white',
                    transition: 'background 0.3s ease-in-out, transform 0.2s ease',
                    border: 'none',
                  }}
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
      
      <div className='message-container' style={{marginTop:'40px' , maxHeight:'700px' , overflowY:'auto'}}>
      {messages.map((message, index) => (
        <Paper
          key={index}
          style={{
            padding: '16px',
            marginBottom: '16px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          <Typography
            variant="h6"
            style={{
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            {message.first_name}
          </Typography>
          <Rating
            value={message.stars}
            readOnly
            style={{
              marginTop: '8px',
              color: '#FFD700', // Yellow color for stars
            }}
          />
          <Typography
            variant="body1"
            style={{
              fontSize: '1rem',
            }}
          >
            {message.message}
          </Typography>
        </Paper>
      ))}
    </div>

      {/*filteredProducts.map((product) => (
        <p>{product.product_id}</p>
      )) ürünleri filtere ve samecateogry products a gönder*/}
      <ToastContainer position="top-right" autoClose={3000} />
      <SameCategoryProducts originalProducts={originalProducts} category_id={currentProduct.category_id} product_id={currentProduct.product_id}/>
      <ItemsOfTheWeek originalProducts={originalProducts}/>
      <MostSaled originalProducts={originalProducts}/>
    </Container>
  );
};

export default ASingleProduct;