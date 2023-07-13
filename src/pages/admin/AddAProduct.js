import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/AddAProduct.css';

const AddAProduct = () => {
  const navigate = useNavigate();
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

  const adminToken = localStorage.getItem('adminToken');

  const categories = {
    takim: 1,
    'tek-ust': 2,
    'tek-alt': 3,
    tesettur: 4,
    bone: 5,
    terlik: 6,
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
  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
  const sizes_i = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
  const patterns = ['likrali soft', 'likrali koroflex', 'trikoton', 'alpaka'];

  const handleAddProduct = async (event) => {
    event.preventDefault();

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
          size_i,
          pattern,
          description,
        }),
      });

      if (response.ok) {
        const { message } = await response.json();
        setMessage(message);
        navigate('/admin/dashboard');
      } else {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
    } catch (error) {
      setError(`Failed to add product: ${error.message}`);
    }
  };

  return (
    <div className="container-addproduct">
      <h1>Add A Product</h1>
      <form className="form" onSubmit={handleAddProduct}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={product_name}
            onChange={(e) => setProduct_name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setquantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            {colors.map((color) => (
              <option value={color} key={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Object.keys(categories).map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {sizes.map((size) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Size_i</label>
          <select
            value={size_i}
            onChange={(e) => setSize_i(e.target.value)}
          >
            {sizes_i.map((size_i) => (
              <option value={size_i} key={size_i}>
                {size_i}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Pattern</label>
          <select
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          >
            {patterns.map((pattern) => (
              <option value={pattern} key={pattern}>
                {pattern}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn">
          Add Product
        </button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddAProduct;
