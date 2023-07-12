import React, { useState, useEffect } from 'react';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/shop/');
        if (response.ok) {
          const { data } = await response.json();
          setProducts(data);
          console.log(data);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      
      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default Shop;
