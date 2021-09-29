import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct, subProduct } from '../../../redux/action/calulateCart';
import Infor from '../../utils/inforUser/getInfor';


function Cart() {
    const {items} = useSelector(state => state.postCart)
    console.log(items)
    const dispatch = useDispatch()
    const handleClick1 = (product) =>{
        dispatch(subProduct(product))
    }
    const handleClick2 = (product) =>{
        dispatch(addProduct(product))
    }
    const handleClick3 = (product) =>{
        dispatch(removeProduct(product))
    }
    const listItem = items.map((product) =>(
        <>
            <div className = 'card-store' key ={product._id}>
               <img className ='img-store' src ={product.images.url} alt =''/>
               <div className ='card-store-right'>
                   <div className  ='name-product-store'>
                       Name: {product.title}
                   </div>
                   <div className  ='cost-product-store'>
                      Price: {product.price*product.quantity}
                   </div>
                   <div className  ='caculator-product-store'>
                       <button type ='button' onClick ={() =>handleClick1(product)}>-</button>
                       <input type ='text' readOnly ='readOnly' value ={product.quantity} placeholder ='0'></input>
                       <button type ='button' onClick ={() =>handleClick2(product)}>+</button>
                   </div>
                   <div className='delete-product' onClick ={() =>handleClick3(product)}>X</div>
               </div>
            </div>
        </>
    ))
 
    return (
        <div className ='wrap-store'>
            {listItem}
            {<Infor/>}
        </div>
        
    );
}

export default Cart;