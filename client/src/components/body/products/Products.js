import axios from 'axios';
import React,{useContext, useState} from 'react';
import { useSelector } from 'react-redux';
import { DataContext } from '../../../GlobalState';
import Slide from '../../slide/slideShow';
import ProductCard from '../../utils/productCard/ProductCard';
import Fillters from './Fillters';


function Products() {
    const state = useContext(DataContext)
    const [products,setProducts] = state.productAPI.products
    const [callback,setCallback] = state.productAPI.callback
    const [check,setCheck] =useState(false)
    const auth = useSelector(state =>state.Auth)
    const {isAdmin} = auth
    const token = localStorage.getItem('fistItem')


    const handleDelete =async(id,public_id)=>{
        await axios.post('/api/destroy', {public_id}, {

            headers: {Authorization: token}
        })
        await axios.delete(`/api/products/${id}`,{headers:{
            Authorization:token
        }})
        setCallback(!callback)
    }
    const handleCheck =(id)=>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
        
    }
    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !check
        })
        setProducts([...products])
        setCheck(!check)
    }
    const deleteAll =()=>{
        if(window.confirm("You want delete product?")){
            products.forEach((product)=>{
                if(product.checked) handleDelete(product._id,product.images.public_id) 
            })
        }
    }
    return (
        <>
        <Fillters/>
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={check} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }
        <div className ='products_page'>
            {
                products.map((product) =>(
                    <ProductCard key={product._id} product ={product} isAdmin ={isAdmin}
                    handleDelete={handleDelete} handleCheck={handleCheck}
                    />
                ))
            }
        </div>
        </>
    );
}

export default Products;