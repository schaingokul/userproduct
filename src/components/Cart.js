
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import {remove} from '../store/cartSlice'

const Cart = () => {
    const productCart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const removeToCart =(id) => {
        dispatch(remove(id))
    }

    const card = productCart.map(product => (
        <div className='col-md-12' style={{marginBottom: "10px"}}>
            <Card className="h-100" key={product.id}>
                <div className='text-center'>
                    <Card.Img variant="top" src={product.image} style={{width: "100px", height: "130px"}}/>
                </div>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>INR: {product.price}</Card.Text>
                </Card.Body>
                <Card.Footer style={{backgroundColor: "white"}}>
                    <Button variant="danger" onClick={() => removeToCart(product.id)}>Remove Item</Button>
                </Card.Footer>
            </Card>
        </div>
    ));

  return (
    <div>
       <h1>Cart Products</h1>
       {card ? card : (<h1>...Loading Data</h1>)}
    </div>
  )
}

export default Cart


