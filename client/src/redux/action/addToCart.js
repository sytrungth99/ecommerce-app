import {ADD_TO_CART} from './Type'

export const addToCart =(item) =>{ 
    return (dispatch,getState) =>{
        const cartItem = getState().postCart.items
        const check = cartItem.every(product =>{
            return product._id !== item._id
        })
        if(check){
            cartItem.push({...item,quantity:1})
            localStorage.setItem('item',JSON.stringify(cartItem))
        }else{
            alert('product has been in cart')
        }

            dispatch({type:ADD_TO_CART,payload:cartItem}) 
        console.log('cartItem',cartItem)

    }
}