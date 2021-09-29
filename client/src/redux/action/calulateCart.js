import {ADD_PRODUCT_CART} from './Type'
import {SUB_PRODUCT_CART} from './Type'
import {DELETE_PRODUCT_CART} from './Type'

export const addProduct = (product) =>{
    return (dispatch,getState) =>{
        const cartItem = getState().postCart.items
        cartItem.forEach(item =>{
            if(item._id===product._id){
                item.quantity +=1
                localStorage.setItem('item', JSON.stringify(cartItem));
            }
            
        })
        dispatch({type:ADD_PRODUCT_CART})
    }
}
export const subProduct = (product) =>{
    return (dispatch,getState) =>{
        const cartItem = getState().postCart.items
        cartItem.forEach(item =>{
            if(item._id===product._id){
                item.quantity ===1? item.quantity = 1: item.quantity -=1
            }
            localStorage.setItem('item', JSON.stringify(cartItem));
        })
        dispatch({type:SUB_PRODUCT_CART})
    }
}

export const removeProduct = (product) =>{
    return (dispatch,getState) =>{
        if(window.confirm('Do you want delete this product?')){
            const cartItem = getState().postCart.items
            cartItem.forEach((item,index)=>{
                if(product._id===item._id){
                    cartItem.splice(index,1)
                }
                localStorage.setItem('item', JSON.stringify(cartItem));
            })
            dispatch({type:DELETE_PRODUCT_CART})
        }
    }
}