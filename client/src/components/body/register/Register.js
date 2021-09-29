import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {showError,showSuccess} from '../../utils/notification/Notification'
import {isEmpty,isEmail,isLength,isMatch} from '../../utils/validation/Validation'
const initState ={
    username:'',
    email :'',
    password :'',
    err:'',
    success:''
}

function Register() {
    const [user,setUser] = useState(initState)
    const {username,email,password,cf_password,err,success} = user
    console.log('user',user)
    const handleOnChange =(e) =>{

        const {name,value} = e.target
        setUser({...user,[name]:value})
    }
    const handleOnSubmit = async(e) =>{
        e.preventDefault()
        if(isEmpty(username) || isEmpty(password))
        return setUser({...user, err: "Please fill in all fields in client.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Password did not match.", success: ''})
        try{

            const res = await axios.post('/api/register',{username,email,password})
            setUser({...user,err:'',success:res.data.msg})
        }catch(err){
            err.response.data.msg &&
            setUser({...user,err:err.response.data.msg,success:''})
            console.log(err.response)
        }
    }
    return (
        <div className ="login_page">
            <h2>Register</h2>
            {err && showError(err)}
            {success && showSuccess(success)}
            <form onSubmit ={handleOnSubmit}>
                    <div>
                        <label>name</label>
                        <input type ='text' name ='username' id ='name' placeholder ='Enter your name' value ={username} onChange ={handleOnChange}/>
                    </div>
                    <div>
                        <label>email</label>
                        <input type ='text' name ='email' id ='email' placeholder ='Enter email address' value ={email} onChange ={handleOnChange}/>
                    </div>
                    <div>
                        <label>password</label>
                        <input type ='password' name ='password' id ='password' placeholder ='Enter password' value ={password} onChange ={handleOnChange}/>
                    </div>
                    <div>
                        <label>confirm password</label>
                        <input type ='password' name ='cf_password' id ='cf_password' placeholder ='Comfirm password' value ={cf_password} onChange ={handleOnChange}/>
                    </div>
                    <div>
                       <button type ='submit'>Register</button>
                    </div>
                    <div className ='row'>
                        <div className ="hr">Or Login With</div>
                        <div>? New User <Link to="/login">Login</Link></div>
                    </div>
            </form>
        </div>
    );
}

export default Register;