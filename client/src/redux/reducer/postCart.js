import { ADD_TO_CART } from "../action/Type"

const initState = {
    cartnumber:0,
    items : JSON.parse(localStorage.getItem("item") || "[]")
}

export const postCart = (state = initState,action) =>{
    switch(action.type){
        case ADD_TO_CART:
            return{
                ...state,
                cartnumber: state.cartnumber+1,
                items:action.payload
            }
        default:
            return{...state}
    }
}