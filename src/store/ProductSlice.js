import {createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';


const initialState ={
    data: [],
}

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProducts(state, action){
            state.data = action.payload
        }
    }
});

export const {fetchProducts} = ProductSlice.actions;
export default ProductSlice.reducer;

export async function getProduct(){
    return async function getProductThunk(dispatch, getState){
        const response = await Axios.get('https://fakestoreapi.com/products').catch((err) => {
            console.log(`err ${err}`)});
            dispatch(fetchProducts(response.data));
    }
}


