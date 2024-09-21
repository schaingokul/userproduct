import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';

const Products = () => {
  const navigate = useNavigate();
  const {role} = useParams();
  const [products, setProduct] = useState([]);

  useEffect(()=>{
    const fetchProduct = async() => {
      try {
        const response = await Axios.get(`http://localhost:5001/in/:${role}`);
        setProduct(response.data.product);
      } catch (error) {
        console.log("fetchProduct error message", error);
      }
    }
    fetchProduct();
  },[role]);
    
  return (
    <div className='productheader'>
      {role === 'admin' && (
        <div onClick={() => navigate(`/in/${role}/add`)} style={{ cursor: 'pointer' }}>Add Product</div>
      )}
      <div className='productcontainer'>
            {products.map((product) => (
                <div className='pcontainer' key={product.id}>
                    <h4>Title: {product.title}</h4>
                    <p>Image: {product.imageUrl}</p>
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    <button onClick={ (e) => alert(`${product.title} is Deleted`)}>Delete</button>
                </div>
            ))}
      </div>
    </div>
  )
}

export default Products;
