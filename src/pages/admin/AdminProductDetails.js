import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Checkbox,
  Button,
  FormGroup,
  FormControlLabel,
  Typography,
  Paper,
  Grid,
  IconButton,
  Select,
  MenuItem
  
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import dummyImage from '../../images/tomy1.jpg';
import dummyImage2 from '../../images/tek-alt_1.jpg';
import dummyImage3 from '../../images/tesettur_1.jpg';
import { NavLink } from 'react-router-dom';

const AdminProductDetails = () => {
  const location = useLocation();
  const [currentProduct, setCurrentProduct] = useState({});
  const [productDetails, setProductDetails] = useState([]);
  const [currentProductImages, setCurrentProductImages] = useState([
    dummyImage,
    dummyImage2,
    dummyImage3,
  ]);
  
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = {
    1: 'takim',
    2: 'tek-ust',
    3: 'tek-alt',
    4: 'tesettur',
    5: 'bone',
    6: 'terlik',
  };

  


  const colors = {
    'beyaz':'#fff', 'acik_mavi':'#add8e6', 'parlament_mavisi':'#0437F2', 'turkuaz':'#30d5c8', 'duman_grisi':'#636969', 'gri':'#ccc', 'lacivert':'"#000080',
    'petrol_mavisi':'#216477', 'petrol_yesili':'#008080', 'kuf_yesili':'#78866b', 'benetton_yesili':'#009A49', 'ameliyathane_yesili':'00995a',
    'pembe':'#ffcbdb', 'lila':'#c8a2c8', 'mor':'#660099 ', 'fuchsia':'#ff00ff', 'kirmizi':'#ec5353', 'siyah':'#000000', 'saks_mavisi':'#657f84', 'fistik_yesili':'#dfff00',
    'bordo':'#800000', 'nar_cicegi':'#6688c1 ', 'fume':'#757a80', 'murdum':'#cc8899', 'acik_petrol_yesili':'#008080', 'avci_yesili':'#355e3b', 'ozel_mor':'#BA55D3',
    'su_yesili':'#addfad', 'visne':'#800000', 'leylak':'#c8a2c8', 'sari':'#ffff00', 'hardal':'#ffdb58', 'kiremit':'#8a3324', 'gul_kurusu':'#c08081', 'somon':'#fa8072',
    'haki':'#bdb76b', 'menekse':'#8b00ff', 'kot_mavisi':'#1560BD', 'bej':'#F5F5DC', 'kahverengi':'#964B00', 'kum_rengi':'#f4a460', 'turuncu_turkuaz':'#08e8de',
    'mint_yesili':'#cfffe5', 'mavi':'#00133d','krem':'#fffdd0','antep_fistigi':'#dfff00'
  }



  const [updatedProduct, setUpdatedProduct] = useState({
    product_name: '',
    category_id: '',
    price: '',
    discount: 0.0,
    bestseller: '',
    description: '',
    isproductoftheweek: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  /**************************************************************  UPDATE FETURE BLOCK */

  const handleUpdateFeatureChange = (event) => {
    const {name , value} = event.target;
    setUpdateFeature({
      ...updateFeature,
      [name]: value,
    });
  };

  const handleUpdateFeature = (color , size , quantity) => {
    console.log('renk:' , color , 'size' , size , 'quantity' , quantity);

  }



  const [updateFeature, setUpdateFeature] = useState({
    size36:0,
    size37:0,
    size38:0,
    size39:0,
    size40:0,
    size41:0,
    size42:0,
    size43:0,
    size44:0,
    size45:0,
    XXS:0,
    XS:0,
    S:0,
    M:0,
    L:0,
    XL:0,
    XXL:0,
  })

  useEffect(() => {
    console.log('feature  güncelleniyor:', updateFeature);
  }, [updateFeature]);


  /*************************************************************** */




  //*************************************************************** NEW FEATURE BLOCK

  const sizes = [
    "36", "37", "38", "39", "40", "41", "42", "43", "44", "45",
    "XXS", "XS", "S", "M", "L", "XL", "XXL"
  ];
  

  const [selectedSizeForNewFeature, setSelectedSizeForNewFeature] = useState("");
  const [quantityForNewFeature, setQuantityForNewFeature] = useState(1);

  const handleSizeChange = (event) => {
    setSelectedSizeForNewFeature(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantityForNewFeature(event.target.value);
  };

  const handleAddFeature = () => {
    
    console.log("Selected Size:", selectedSizeForNewFeature);
    console.log("Quantity:", quantityForNewFeature);
    console.log('Color:' , selectedColorForSizes);

  };

/******************************************************************************* */
   
   










/******file upload */

  function handleFileUpload(event) {
    const file = event.target.files[0];
    setSelectedImage(file);
    console.log('suanki selected image', selectedImage);
    console.log('secildiği beden' , selectedColorForSizes);
  } 




/*********** */








  
  const [selectedColorForSizes, setSelectedColorForSizes] = useState('');
  const [currentDetails, setCurrentDetails] = useState([]);
  const [currentPhotos, setCurrentPhotos] = useState([]);

 
  


  useEffect(() =>{
    const filteredSizes = productDetails.filter(
      (product) => product.color === selectedColorForSizes
    );
    console.log('suanki filteredsize' , filteredSizes);

    setCurrentDetails(filteredSizes);
    setCurrentPhotos(filteredSizes.photoUrls);

    console.log('suanki current photos' , currentPhotos);

  },[selectedColorForSizes])

  

  
  const handleColorClick = (color) => {
    setSelectedColorForSizes(color);
  };




  const updateProduct = () => {
    console.log(updatedProduct);
  };

  




  useEffect(() => {
    console.log('ürün güncelleniyor:', updatedProduct);
  }, [updatedProduct]);

  
  useEffect(() => {
    
    const { product } = location.state;
    setCurrentProduct(product);
    setUpdatedProduct(product);

    const fetchAdminDetailedProduct = async () => {
      const adminToken = localStorage.getItem('adminToken');
      try {
        const response = await fetch(`http://localhost:5000/admin/products/${product.product_id}`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProductDetails(data.productDetails);
          console.log('suanki details' , data.productDetails);
        } else {
          throw new Error('An error occurred while fetching the products');
        }
      } catch (error) {
        console.error(error);
      }
    };


    fetchAdminDetailedProduct();
  }, [location.state]);

  const handleImageSelect = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      setSelectedImage(imageFile);
    }
  };

  const handleAddImage = () => {
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setCurrentProductImages([...currentProductImages, imageUrl]);
      setSelectedImage(null);
    }
  };

  return (
    <Container>
      
      <div>
        <Typography variant="h3">Ürün ID: {currentProduct.product_id}</Typography>
        <Typography variant="h3">Ürün İsmi: {currentProduct.product_name}</Typography>
        <Typography variant="h5">Ürün Kategorisi: {categories[currentProduct.category_id]}</Typography>
        <Typography variant="h5">Ürün Fiyatı: {currentProduct.price}</Typography>
        <Typography variant="h5">Ürünün İndirimi: {currentProduct.discount}</Typography>
        <Typography variant="h5">Toplam Satılan Miktar: {currentProduct.bestseller}</Typography>
        <Typography variant="h5">Ürün Açıklaması: {currentProduct.description}</Typography>
      </div>

      <div>
        <h2>Ana bilgiler</h2>
        <form>
          <Paper elevation={3} sx={{ padding: '16px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Ürün İsmi"
                  name="product_name"
                  value={updatedProduct.product_name}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Fiyat"
                  name="price"
                  value={updatedProduct.price}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="İndirim (not: burada girilen indirim dummy price için, yani buraya %100 indirim de girsem, kullanıcıya gözükecek bir üstteki fiyat kısmıdır)"
                  name="discount"
                  value={updatedProduct.discount}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Açıklama"
                  name="description"
                  value={updatedProduct.description}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isproductoftheweek"
                        checked={updatedProduct.isproductoftheweek}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, isproductoftheweek: e.target.checked })}
                      />
                    }
                    label="Haftanın Ürünü"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Paper>

          <Button variant="contained" onClick={updateProduct} sx={{ marginTop: '16px' }}>
            Güncelle
          </Button>
        </form>

        <div className='color-container'>
        
        {Object.keys(colors).map((color) => (
          <Button
            key={color}
            variant="outlined"
            className={`color-button ${
              selectedColorForSizes === color ? 'active' : ''
            }`}
            style={{
              backgroundColor: colors[color],
              width: '30px',
              height: '30px',
              borderRadius: '20%',
              marginLeft: '10px',
              marginTop:'10px',
              boxShadow:
              selectedColorForSizes === color ? '2px 2px black' : 'none',
              border:'none'
              
            }}
            onClick={() => handleColorClick(color)}
          ></Button>
        ))}
        
        <div>
          <Typography variant="h4" gutterBottom>
            Şuanki renk: {selectedColorForSizes}
          </Typography>
          
          {selectedColorForSizes && (<div>
            <Typography>
              Bu renk için fotoğraf yükleyiniz
            </Typography>

            <input
                type="file"
                name={`photo1`}
                style={{marginLeft:'40px' , marginTop:'25px'}}
                onChange={handleFileUpload}
                
              />
          </div>)}


          <div>
            <Select
              value={selectedSizeForNewFeature}
              onChange={handleSizeChange}
              displayEmpty
              style={{margin:'30px auto'}}
            >
              <MenuItem value="" disabled>
                Beden Seçiniz
              </MenuItem>
              {sizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>

              ))}
            </Select>
            <Button variant="contained" onClick={handleAddFeature} style={{marginLeft:'35px'}}>
              Özellik Ekle
            </Button>
          </div>

        <div>
          <TextField
            label="Adet"
            type="number"
            value={quantityForNewFeature}
            onChange={handleQuantityChange}
            inputProps={{
              min: 1,
            }}
          />
        </div>
      </div>
      </div>
      <div>
        
        <Typography variant="h5" gutterBottom style={{marginTop:'40px'}}>
          Bedenler
        </Typography>

        {/*currentPhotos.map((photo) => (
          <img src={`${photo.url}`}></img>
        ))*/}
        
        {currentDetails.map((product) => (
        
          <div key={product.feature_id}> 
            <form key={product.feature_id} variant="outlined">
              <p>{product.size}</p>
              <TextField
                  name={product.size}
                  placeholder={product.quantity}
                  value={updateFeature.size}
                  onChange={handleUpdateFeatureChange}
                  margin="normal"
                />               
              
            </form>
            <Button onClick={() => handleUpdateFeature(selectedColorForSizes, product.size , updateFeature[product.size])}>Bedeni Güncelle</Button>
          </div>
        ))}
        
      </div>
        
      </div>
    </Container>
  );
};

export default AdminProductDetails;
