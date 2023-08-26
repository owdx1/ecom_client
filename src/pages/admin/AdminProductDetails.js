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
import '../../styles/AdminProductDetails.css';
import { AttachEmail, DateRange } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminProductDetails = () => {

  const location = useLocation();
  const [currentProduct, setCurrentProduct] = useState({});
  const [productDetails, setProductDetails] = useState([]);
  
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken || adminToken === 'undefined') {
      navigate('/admin/login');
    } 
  }, []);




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

  const handleUpdateFeatureChange =  (event) => {
    const {name , value} = event.target;
    setUpdateFeature({
      ...updateFeature,
      [name]: value,
    });
  };

  const handleUpdateFeature = async (color , size , quantity) => {
    
    console.log('renk:' , color , 'size' , size , 'quantity' , quantity);
    const product_id = currentProduct.product_id;

    try {
      const adminToken = localStorage.getItem('adminToken')
      const response = await fetch(`http://localhost:5000/admin/update-feature` , {
      method:'POST',
      body: JSON.stringify({color , size , quantity , product_id}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      }
    })

    const data = await response.json();

    if (response.status === 200){
      const {message} =  data;
      console.log(message);
      toast.success(message);

    } else {
      const {message} = data;
      toast.error(message);
      console.log(message);
    }


      
    } catch (error) {
      console.error(error)
    }
      
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

  const handleAddFeature = async () => {
    
    console.log("Selected Size:", selectedSizeForNewFeature);
    console.log("Quantity:", quantityForNewFeature);
    console.log('Color:' , selectedColorForSizes );

    const adminToken = localStorage.getItem('adminToken');

    const product_id = updatedProduct.product_id;

    try {
      const response = await fetch(`http://localhost:5000/admin/add-feature/` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({product_id , quantity:quantityForNewFeature, color:selectedColorForSizes,  size:selectedSizeForNewFeature}),
      })

      const data = await response.json();
      const {message} = data;

      if(response.status === 200) {
        toast.success(message);
        console.log(message);
      } else{
        toast.warn(message);
        console.log(message);
      }


    } 
    
    catch (error) {
      console.error(error)
    }
  };

/******************************************************************************* */
   
   










/******file upload */

  const handleFileChange = (event) => {
    const imageFile = event.target.files[0];

    if(imageFile){
      setSelectedFile(imageFile);
    }
    
  };
  useEffect(()=>{
    console.log(selectedFile);
  } , [selectedFile])


  const handleAddImage = async () =>{
    const formData = new FormData();

    if (selectedFile) {
      const modifiedFileName = `${currentProduct.category_id}-${currentProduct.product_name}-${selectedColorForSizes}-${Date.now()}.${selectedFile.type.split('/')[1]}`;
      console.log('suanki modified file name:' , modifiedFileName);
      const modifiedFile = new File([selectedFile], modifiedFileName, { type: selectedFile.type });
      
    
      formData.append('file', modifiedFile);
    }

    try {
      const response = await fetch('http://localhost:5000/foto/file', {
      method: 'POST',
      body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        toast.success('File uploaded successfully')
      } else {
        console.error('Failed to upload file');
        toast.error('Failed to upload file')
      }
    } 
    catch (error) {
      console.error('Error uploading file:', error);
    }


  }




/*********** */








  
  const [selectedColorForSizes, setSelectedColorForSizes] = useState('');
  const [currentDetails, setCurrentDetails] = useState([]);
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

 
  


  useEffect(() => {
    const filteredSizes = productDetails.filter(
      (product) => product.color === selectedColorForSizes
    );

  
    
    if (filteredSizes.length > 0) {
      const selectedPhotoUrls = filteredSizes[0].photoUrls;
  
      console.log('suanki filteredsize', filteredSizes);
      setCurrentDetails(filteredSizes);
  
      setCurrentPhotos(selectedPhotoUrls);
  
      console.log('suanki current photos', currentPhotos);
    }
    else if (filteredSizes.length === 0){
      setUpdateFeature({
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

      setCurrentDetails(filteredSizes);
      setCurrentPhotos([]);

    }
  }, [selectedColorForSizes]);

  

  
  const handleColorClick = (color) => {
    setSelectedColorForSizes(color);
  };




  const updateProduct = async () => {
    const adminToken = localStorage.getItem('adminToken');
    console.log(updatedProduct);
    const productId = updatedProduct.product_id;
    const product_name = updatedProduct.product_name;
    const isproductoftheweek = updatedProduct.isproductoftheweek;
    const price = updatedProduct.price;
    const description = updatedProduct.description;
    const discount = updatedProduct.discount;

    try {
      const response = await fetch(`http://localhost:5000/admin/update-product/${productId}` , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ product_name, isproductoftheweek, price , description, discount }),
      })

      const data = await response.json();
      const {message} = data;

      if(response.status === 200) {
        toast.success(message);
        console.log(message);
      } else{
        toast.warn(message);
        console.log(message);
      }


    } 


    
    
    
    catch (error) {
      console.error(error)
    }
  };

  const handleDeleteClick = (photoIndex) => {
    setPhotoToDelete(photoIndex);
    setShowModal(true);
  };

  const handleConfirmation = async (confirmed , photoName , category_id) => {
    if (confirmed) {
      
      const updatedPhotos = currentPhotos.filter((_, index) => index !== photoToDelete);
      setCurrentPhotos(updatedPhotos);

      try {
        const adminToken = localStorage.getItem('adminToken')
        const response = await fetch(`http://localhost:5000/admin/delete-photo` , {
        method:'DELETE',
        body: JSON.stringify({photoName , category_id}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        }
      })

      const data = await response.json();

      if (response.status === 200){
        const {message} =  data;
        console.log(message);
        toast.success(message);

      } else {
        const {message} = data;
        toast.error(message);
        console.log(message);
      }


        
      } catch (error) {
        console.error(error)
      }


      

      
    }
    setShowModal(false);
    setPhotoToDelete(null);
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

        <div style={{margin:'30px'}}>
          <Typography variant="h4" gutterBottom>
            Şuanki renk: {selectedColorForSizes}
          </Typography>
          <Typography variant='h3'> Bu renge ait fotoğraflar</Typography>
          
          {currentPhotos.map((photoUrl, index) => {

            const name = photoUrl.name;
            
          
          
          return (
            <div>
              <img
                key={index} 
                src={`${photoUrl.url}`}
                
                alt={`Product ${index + 1}`}
                style={{width:'350px' , borderRadius:'20px', margin:'10px'}}
              />
              <DeleteIcon
              style={{cursor:'pointer'}}
              onClick={() => handleDeleteClick(index)}
              >
              </DeleteIcon>

              {showModal && (
                <div
                  style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.5)', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '999', 
                  }}
                >
                  <div
                    style={{
                      background: 'white',
                      padding: '20px',
                      borderRadius: '10px',
                      boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)', 
                    }}
                  >
                    <Typography variant='h4'>Fotoğrafı silmek istediğinizden emin misiniz?</Typography>
                    <div className="modal-button-container">
                      <Button onClick={() => handleConfirmation(true, name, currentProduct.category_id)}>EVET</Button>
                      <Button onClick={() => handleConfirmation(false)}>HAYIR</Button>
                    </div>
                  </div>
                </div>
              )}


            </div>
          )})}
        </div>


        <div>
          
          
          {selectedColorForSizes && (
            <div>
              <Typography>
                Bu renk için fotoğraf yükleyiniz
              </Typography>

              <input
                  type="file"
                  name={`photo1`}
                  style={{marginLeft:'40px' , marginTop:'25px'}}
                  onChange={handleFileChange}
                  
                />
                <Button onClick={handleAddImage}>Bu resimi yükle</Button>
            </div>
          )}


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

        
        {currentDetails.length > 0 && currentDetails.map((product) => (
        
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
      <ToastContainer/>
    </Container>
  );
};

export default AdminProductDetails;
