import {ADMIN_LOGGER, GET_USER, USER_LOGGER} from './Type'

export const userAction = () =>{
    return {type:USER_LOGGER}
}
export const adminAction = () =>{
    return {type:ADMIN_LOGGER}
}

export const getUserInfor = (res) =>{
    return {type:GET_USER,payload:res.data.user}
}