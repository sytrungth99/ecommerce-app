import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
    const auth = useSelector(state =>state.Auth)
    const{isLogger,isAdmin,user} = auth
    const logout = () =>{
        try{
            localStorage.removeItem('fistItem')
            window.location.href = "/"
        }catch{
            window.location.href = "/"
        }
    }
    const UserLogger =() =>{
        return <li className="drop-nav">
            <img className="avatar" src={user.avatar} alt=""/>
            <Link to="#" > {user.username} </Link>
            <ul className ='dropdown'>
                <li><Link to ='/profile'>profile</Link></li>
                <li><Link to ='/' onClick ={logout}>logout</Link></li>
            </ul>
        </li>
    }
    const AdminLogger = () =>{
        return(
            <>
            <li><Link to ='/create_product'>Create Product</Link></li>
            <li><Link to ='/category'>Category</Link></li> 
            <li><Link to ='/'>Products</Link></li> 
            <li><Link to ='/history'>History</Link></li> 
            <li><Link to ='/user_edit'>User</Link></li> 
            </>
        )
    }
    return (
        <div className ="header">
            <div className ='wrap-header'>
            <div className ="logo"><Link to = "/">{isAdmin?'Dashboard':'PT ShopLap'}</Link></div>
        
        <div className = "list">
            <ul>
                {isAdmin && AdminLogger()}
                {isAdmin?'':<li><Link to ="/cart"><i className='fas fa-cart-plus'></i>Cart</Link></li>}
                {isLogger?UserLogger():<li><Link to ="/login"> <i className='fas fa-user-tie'></i>Login</Link></li>}
                
            </ul>
        </div>
            </div>
        </div>
    );
}

export default Header;