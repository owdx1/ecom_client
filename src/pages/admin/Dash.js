import React, {useEffect ,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import dummyImage from '../../images/cat.jpg'
import '../../styles/Dash.css'


const Dash = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [admin , setAdmin] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const adminToken = localStorage.getItem('adminToken');
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/dashboard', {
                headers: {
                    Authorization:`Bearer ${adminToken}`,
                    'Content-Type':'Application/json',
                }
            });

            if(response.ok) {
                const data = await response.json();
                
                await setProducts(data.products);
                await setAdmin(data.admin.id);
                console.log(admin);
                console.log("products:ahahahah" , products[1]);
                
                
                
            } else {
                setErrorMessage('An error occured')
            }



        } catch (error) {
            setErrorMessage('Service unavalible');
            console.error(error)
        }
    }


    const navigateToAddAProduct = () => {
        navigate("/admin/add-a-product");
      };

      return (
        <div className="container">
          <h1 className="heading">{admin}</h1>
          <button className="button" onClick={navigateToAddAProduct}>
            Yeni ürün ekle
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div>
            {products.map((product) => (
              <Link
                key={product.product_id}
                to={`/admin/products/${product.product_id}`}
                className="product-container"
              >
                <div className="product-info">
                  <img
                    src={dummyImage}
                    alt={product.product_id}
                    className="product-image"
                  />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Fiyat: {product.price} TL</p>
      
                  {product.category_id === 2 ? (
                    <p>Beden: {product.size_i}</p>
                  ) : (
                    <p>Beden: {product.size}</p>
                  )}
                  <p>Renk: {product.color}</p>
                  <h5>Adet: {product.quantity}</h5>
                </div>
                <div className="product-actions">
                  <Link
                    key={product.product_id}
                    to={`/admin/products/${product.product_id}`}
                  >
                    Fiyatı Güncelle
                  </Link>
                  <Link>Ürünü sil</Link>
                  <Link>Ürüne ekleme yap</Link>
                </div>
                
              </Link>
            ))}
          </div>
        </div>
      );
      
};


export default Dash;