import React, { useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import{BrowserRouter as Router,Route} from 'react-router-dom';
import Cart from './components/body/cart/Cart';
import DetailProduct from './components/body/detailProduct/DetailProduct';
import Login from './components/body/login/Login';
import Products from './components/body/products/Products';
import Register from './components/body/register/Register';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { adminAction, getUserInfor, userAction } from './redux/action/authAction';
import Profile from './components/body/profile/Profile';
import Category from './components/body/categorys/Category';
import CreateProduct from './components/body/createProduct/CreateProduct';
import History from './components/body/history/History';
import NotFounrd from './components/body/notFound/NotFounrd';
import UserEdit from './components/body/userEdit/UserEdit';


function App() {
const dispatch = useDispatch()
const token = localStorage.getItem('fistItem')
const auth = useSelector(state =>state.Auth)
const {isAdmin} = auth
console.log('auth',auth)
useEffect(() =>{
  if(token){
    dispatch(userAction())
    const getUser = async () =>{
      const res = await axios.get('/api/getuser',{
          headers:{Authorization:token}
       })          
       console.log('res',res)
       if(res.data.user.role === 1){
        dispatch(getUserInfor(res))
        dispatch(adminAction())
       }else{
        dispatch(getUserInfor(res))
       }
       
   }
   getUser()
  }
},[auth.isLogger,dispatch,token])

  return (
    
    <div className ="App">
     
      <Router>
        <Header/>
        <Route path ='/' component ={Products} exact/>
        <Route path ='/product/:id' component ={DetailProduct} exact/>
        <Route path ='/login' component ={Login} exact/>
        <Route path ='/register' component ={Register} exact/>
        <Route path ='/cart' component ={Cart} exact/>
        <Route path ='/profile' component ={Profile} exact/>
        <Route path ='/category' component ={isAdmin?Category:NotFounrd} exact/>
        <Route path ='/history' component ={isAdmin?History:NotFounrd} exact/>
        <Route path ='/create_product' component ={isAdmin?CreateProduct:NotFounrd} exact/>
        <Route path ='/update_product/:id' component ={isAdmin?CreateProduct:NotFounrd} exact/>
        <Route path ='/user_edit' component ={isAdmin?UserEdit:NotFounrd} exact/>
        <Footer/>
      </Router>
      
    </div>
    
    

  );
}

export default App;

