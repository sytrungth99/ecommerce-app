import {GET_TOKEN} from '../action/Type'
 
const initState ={
    token:''
}

export const tokenReducer = (state = initState,action) =>{
    switch(action.type){
        case GET_TOKEN:
            return {...state,token:action.payload}
        default:
            return {...state} 

    }
}