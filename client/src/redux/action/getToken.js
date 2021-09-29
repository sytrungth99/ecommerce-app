import { GET_TOKEN } from './Type'

export const getToken  = (res) =>{
    return {type:GET_TOKEN,payload:res.data.token }
}