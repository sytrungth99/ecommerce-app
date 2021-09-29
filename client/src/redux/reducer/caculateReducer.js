import {ADD_PRODUCT_CART} from '../action/Type'
import {SUB_PRODUCT_CART} from '../action/Type'
import {DELETE_PRODUCT_CART} from '../action/Type'

const initState = {
    index:1
}

export const Caculate =(state = initState,action) =>{
    switch(action.type){
        case ADD_PRODUCT_CART:
            return{
                ...state
                
            }
        case SUB_PRODUCT_CART:
            return{
                ...state
            }
            case DELETE_PRODUCT_CART:
                return{
                    ...state
                }
        default:
            return{
                ...state
            }
    }
}