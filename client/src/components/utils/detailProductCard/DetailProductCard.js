import React from 'react';
import './DetailProductCard.css';
import Rating from '../rating/Rating';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addToCart} from '../../../redux/action/addToCart';
function DetailProductCard({product}) {
    const dispatch = useDispatch()
    const handleOnClick = (product) =>{
        dispatch(addToCart(product))
    }
    return (
        <div className="detail_product_card">
            <img src={product.images.url} alt=""/>

            <div className="detail_product_card_content">
                <h2>{product.title}</h2>
                <span>$ {product.price}</span>
                <p>{product.description}</p>
                <Link to ='/cart'><button onClick ={() =>handleOnClick(product)}>By now</button></Link>

                <div>
                    <h3 style={{margin: '10px 0'}}>Rating: {product.numReviews} reviews</h3>
                    <Rating props = {product}/>
                </div>
            </div>
        </div>
    )
}

export default DetailProductCard;