import React from 'react'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import {add} from '../store/cartSlice';

const Product = () => {

    const [allProducts, setAllProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect( () => {
        const fetchData = async() => {
            const response = await Axios.get('https://fakestoreapi.com/products').catch((err) => {
                console.log(`err ${err}`);
            })
                setAllProducts(response.data);
        }
        fetchData();
    },[allProducts])

    const addToCart = (product) => {
        dispatch(add(product));
    }

    const card = allProducts.map((product) => 
    <div className='col-md-3'>
        <Card className="h-100" key={product.id}>
            <div className='text-center'>
                <Card.Img variant="top" src={product.image} style={{width: "100px", height: "130px"}}/>
            </div>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>INR: {product.price}</Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "white"}}>
                <Button variant="primary" onClick={() => addToCart(product)}>Add to Card</Button>
            </Card.Footer>
        </Card>
    </div>)

  return (
    <div>
      <div className='row'>
        <h1>Product Dashboard</h1>
        {card ? card : (<h1>...Loading Data</h1>)}
      </div>
    </div>
  )
}

export default Product



