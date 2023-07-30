import React, { useState, useEffect } from 'react';



const ProductDetails = ({ featureId }) => {
  const [product, setProduct] = useState(null);

  // Fetch product details and photoUrl from the server
  useEffect(() => {
    // Replace this with your API call to fetch product details
    // Make sure your server sends the 'photoUrl' as part of the response
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/foto/photos/${featureId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [featureId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const {imageName,photoUrl } = product;

  return (
    <div>
      <h2>{imageName}</h2>
      <img src={photoUrl} alt="Product" />
      <h3>test</h3>
    </div>
  );
};

export default ProductDetails;
