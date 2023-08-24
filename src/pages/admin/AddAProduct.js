import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { Button, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import '../../styles/AddAProduct.css';
import { ToastContainer , toast } from "react-toastify";


const AddAProduct = () => {
  const navigate = useNavigate();
  const [backEndMessage, setBackEndMessage] = useState('');
  const [product_name, setProduct_name] = useState('');
  const [description, setdescription] = useState('');
  const [quantity, setquantity] = useState(0);
  const [price, setprice] = useState(0);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [size_i, setSize_i] = useState('');
  const [pattern, setPattern] = useState('');
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [footSole , setFootSole] = useState('');
  const adminToken = localStorage.getItem('adminToken');


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  useEffect(()=>{
    console.log(selectedFile);
  } , [selectedFile])

  

  const categories = {
    'takim': 1,
    'tek-ust': 2,
    'tek-alt': 3,
    'tesettur': 4,
    'bone': 5,
    'terlik': 6,
  };
  const colors = [
    'beyaz', 'acik_mavi', 'parlament_mavisi', 'turkuaz', 'duman_grisi', 'gri', 'lacivert',
    'petrol_mavisi', 'petrol_yesili', 'kuf_yesili', 'benetton_yesili', 'ameliyathane_yesili',
    'pembe', 'lila', 'mor', 'fuchsia', 'kirmizi', 'siyah', 'saks_mavisi', 'fistik_yesili',
    'bordo', 'nar_cicegi', 'fume', 'murdum', 'acik_petrol_yesili', 'avci_yesili', 'ozel_mor',
    'su_yesili', 'visne', 'leylak', 'sari', 'hardal', 'kiremit', 'gul_kurusu', 'somon',
    'haki', 'menekse', 'kot_mavisi', 'bej', 'kahverengi', 'kum_rengi', 'turuncu_turkuaz',
    'mint_yesili', 'mavi', 'krem', 'antep_fistigi'
  ];
  const sizes = ['bos','XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
  const sizes_i = [0,35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
  const patterns = ['likrali soft', 'likrali koroflex', 'trikoton', 'alpaka'];
  const footsole = ['düz taban', 'yumusak taban', 'airmax'];

  const handleAddProduct = async (event) => {
    const selectedSize = category === 'terlik' ? size_i : size;
    event.preventDefault();
    const formData = new FormData();

   





    try {
      const response = await fetch('http://localhost:5000/admin/add-a-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          product_name,
          category_id: categories[category],
          price,
          quantity,
          color,
          size,
          pattern,
          description,
          selectedSize,
          footSole
          
        }),
      });
      const data = await response.json();
      setBackEndMessage(data.message);

      if (response.status === 200) {
        localStorage.setItem('adminToken' , data.adminToken);
        
      } else {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
    } catch (error) {
      setError(`Failed to add product: ${error.message}`);
    }


    if (selectedFile) {
      const modifiedFileName = `${categories[category]}-${product_name}-${color}-${Date.now()}.${selectedFile.type.split('/')[1]}`;
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
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
      
  };

  const handleImageChange = () => {

  }

  useEffect(() => {
    if (backEndMessage !== '') toast.warn(backEndMessage);
  }, [backEndMessage]);


  return (
    <>
      <NavLink to='/admin/denemeDashboard'>
          <Button variant="contained" color="primary">
              Admin Anasayfa
          </Button>
      </NavLink>
      <NavLink to='/admin/products'>
          <Button variant="contained" color="primary">
              Ürünler
          </Button>
      </NavLink>
      <div className="container-addproduct">
        <h1>Ürün ekle</h1>
        <form className="form" onSubmit={handleAddProduct}>
        <div className="form-group">
        <input type="file" onChange={handleFileChange} />
        </div>
        <div className="form-group">
            <FormControl style={{width:'300px'}}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {Object.keys(categories).map((category) => (
                  <MenuItem value={category} key={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="form-group">
            <TextField style={{width:'300px'}}
              label="Product Name"
              value={product_name}
              onChange={(e) => setProduct_name(e.target.value)}
            />
          </div>
          <div className="form-group">
            <TextField style={{width:'300px'}}
              label="Description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <TextField style={{width:'300px'}}
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setquantity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <TextField style={{width:'300px'}}
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <FormControl style={{width:'300px'}}>
              <InputLabel>Color</InputLabel>
              <Select
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                {colors.map((color) => (
                  <MenuItem value={color} key={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          
          
          {category === 'terlik' && (
            <>
              <div className="form-group">
                <FormControl style={{width:'300px'}}>
                  <InputLabel>Size_i</InputLabel>
                  <Select
                    value={size_i}
                    onChange={(e) => setSize_i(e.target.value)}
                  >
                    {sizes_i.map((size_i) => (
                      <MenuItem value={size_i} key={size_i}>
                        {size_i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              
            </>
          )}
          {category !== 'terlik' && (
          <>
            <div className="form-group">
              <FormControl style={{width:'300px'}}>
                <InputLabel>Pattern</InputLabel>
                <Select
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                >
                  {patterns.map((pattern) => (
                    <MenuItem value={pattern} key={pattern}>
                      {pattern}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="form-group">
              <FormControl style={{width:'300px'}}>
                <InputLabel>Size</InputLabel>
                <Select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {sizes.map((size) => (
                    <MenuItem value={size} key={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </>

          )}
          {category === 'terlik' && (
            <div className="form-group">
              <FormControl style={{width:'300px'}}>
                <InputLabel>Foot Sole</InputLabel>
                <Select
                  value={footSole}
                  onChange={(e) => setFootSole(e.target.value)}
                >
                  {footsole.map((sole) => (
                    <MenuItem value={sole} key={sole}>
                      {sole}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
          <Button type="submit" variant="contained" color="primary">
            Add Product
          </Button>
        </form>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
        <ToastContainer/>      
      </div>
    </>
  );
};

export default AddAProduct;
