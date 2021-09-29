import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {showError,showSuccess} from '../../utils/notification/Notification'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userAction } from '../../../redux/action/authAction'
const initState ={
    email :'',
    password :'',
    err : '',
    success : ''
}

function Login() {
    const [user,setUser] = useState(initState)
    const {email,password,err,success} = user
    const history = useHistory()
    const dispatch = useDispatch()
    const handleOnChange =(e) =>{

        const {name,value} = e.target
        setUser({...user,[name]:value})
    }
    const handleOnSubmit = async (e) =>{
        e.preventDefault()
        try{
            const res = await axios.post('/api/login',{email,password})
            setUser({...user,err: '', success: res.data.msg})
            localStorage.setItem('fistItem',res.data.token)
            dispatch(userAction())
            history.push('/')
        }catch(err){
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
            console.log(err.response)
        }
    }
    return (
        <div className ="login_page">
            <h2>Login</h2>
            {err && showError(err)}
            {success && showSuccess(success)}
            <form onSubmit ={handleOnSubmit}>
                    <div>
                        <label>email</label>
                        <input type ='text' name ='email' id ='email' placeholder ='Enter email address' value ={email} onChange ={handleOnChange}/>
                    </div>
                    <div>
                        <label>password</label>
                        <input type ='password' name ='password' id ='password' placeholder ='Enter password' value ={password} onChange ={handleOnChange}/>
                    </div>
                    <div>
                       <button type ='submit'>login</button>
                    </div>
                    <div className ="hr">Or Login With</div>
                    <p>? New User <Link to="/register">Register</Link></p>
            </form>
        </div>
    );
}

export default Login;