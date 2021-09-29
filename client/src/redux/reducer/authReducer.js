import {ADMIN_LOGGER, GET_USER, USER_LOGGER} from '../action/Type'

const initState ={
    isLogger : false,
    isAdmin : false,
    user: [],
    role: 1
}
export const Auth = (state = initState,action) =>{
    switch(action.type){
        case USER_LOGGER :
            return{
                ...state,isLogger:true
            }
        case ADMIN_LOGGER :
            return{
                ...state,isAdmin:true
            }
        case GET_USER:
            return{
                ...state,user:action.payload
            }
        default:
            return{...state}
    }
}