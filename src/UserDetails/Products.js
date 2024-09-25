import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Products = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [products, setProduct] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get('http://localhost:5001/in', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProduct(response.data.product);
        setRole(response.data.role);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [token]);
  return (
    <div className='productheader'>
      {role === 'admin' && (
        <div onClick={() => navigate(`/in/add`)} style={{ cursor: 'pointer' }}>Add Product</div>
      )}
      <div className='productcontainer'>
            {products.map((product) => (
                <div className='pcontainer' key={product.id}>
                    <h4>Title: {product.title}</h4>
                    <p>Image: {product.imageUrl}</p>
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    {role === 'admin' ? (<button onClick={ (e) => alert(`${product.title} is Deleted`)}>Delete</button>) : (<button onClick={ (e) => alert(`${product.title} Added to Cart`)}>Add to Card</button>) }
                </div>
            ))}
      </div>
    </div>
  )
}

export default Products;
