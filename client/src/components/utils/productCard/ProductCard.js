import React from 'react';
import { useDispatch } from 'react-redux';
import{Link} from 'react-router-dom'
import { addToCart } from '../../../redux/action/addToCart';
import './ProductCard.css';
function ProductCard({product,isAdmin,handleCheck,handleDelete}) {
    const dispatch = useDispatch()
    const handleOnClick = (product) =>{
        dispatch(addToCart(product))
    }

    return (
        <div className ="product_card">
            {isAdmin && <input type ='checkbox' checked={product.checked}
            onChange={()=>handleCheck(product._id)} />}
            <img src ={product.images.url} alt =''/>
            <h3>{product.title}</h3>
            <span>${product.price}</span>
            <p>{product.description}</p>
            <div className ="product_card_row">
                {isAdmin?
                <>
                <button onClick={()=>handleDelete(product._id,product.images.public_id)} >Delete</button>
                <Link to ={`/update_product/${product._id}`}>Update</Link>
                </>
                :
                <>
                <Link to ={`/product/${product._id}`}>View Detail</Link>
                <Link to ='/cart' onClick ={() =>handleOnClick(product)}>Buy Now</Link>
                </>
                
            }
            </div>
        </div>
    );
}

export default ProductCard;