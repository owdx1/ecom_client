import React from 'react'
import { useLocation } from 'react-router-dom'

const ASingleProduct = () => {
  const location = useLocation();
  const {product} = location.state;

  console.log(product);
  
  return (
    <>
    <p>{product.description}</p>
    </>
  )
}

export default ASingleProduct