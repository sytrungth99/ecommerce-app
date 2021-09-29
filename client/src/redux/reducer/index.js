import { combineReducers } from "redux"
import { Auth } from "./authReducer"
import { tokenReducer } from "./tokenReducer"
import { postCart } from './postCart'
import {Caculate} from './caculateReducer'
export const reducer = combineReducers({
    Auth,
    tokenReducer,
    postCart,
    Caculate
})