import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {DataContext} from '../../../GlobalState';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

const initState = {
    title:'',
    price:0,
    description:'Discount 400,000 VND when buying Online',
    category:'',
    id:''
}
function CreateProduct() {
    const state = useContext(DataContext)
    const [product,setProduct] = useState(initState)
    console.log('product',product)
    const [categories] = state.categoriesAPI.categories
    const [products] = state.productAPI.products
    const [onEdit,setOnEdit] = useState(false)
    const [images,setImages] = useState(false)
    const token =  localStorage.getItem('fistItem')
    const auth = useSelector(state =>state.Auth)
    const{isAdmin} = auth
    const history = useHistory()
    const param = useParams()
    const [callback,setCallback] = state.productAPI.callback

    useEffect(()=>{
        if(param.id){
            setOnEdit(true)
            products.forEach(product=>{
                if(product._id===param.id){
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initState)
            setImages(false)
        }
    },[param.id,products])
    const handleChanceInput =e=>{
        setProduct({...product,[e.target.name]:e.target.value})
        
    }
    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
    
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleUpload = async e =>{
        e.preventDefault()
        try{
            if(!isAdmin) return alert('you must a admin')
            const file = e.target.files[0]
            if(!file) return alert('file not exist')
            if(file.size> 1024*1024)
                return alert("size too larget")
            if(file.type !=='image/jpeg'&& file.type !=='image/png')
                return alert("file format is incorrect.")
            console.log('file',file)
            let formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setImages(res.data)
        }catch(err){
            alert(err.response.data.msg)
        }
    }
    const handleSubmit =async e =>{
        e.preventDefault()
        try{
            if(!isAdmin) return alert('you must a admin')
            if(!images) return alert('No image upload')

            if(onEdit){
                await axios.put(`/api/products/${product._id}`,{...product,images},{
                    headers:{Authorization:token}
                })
            }else{
                await axios.post('/api/products',{...product,images},{
                    headers:{Authorization:token}
                })
            }
            history.push("/")
            setCallback(!callback)
        }catch(err){
            alert(err.response.data.msg)
        }
    }
    const styleupload ={
        display: images?"block":"none"
    }
    return (
        <div className="create_product">
            <div className='upload'>
                <input type ='file' name='file' id='file_up' onChange={handleUpload} />
                <div id='file_img' style={styleupload}>
                    <img src={images?images.url:''} alt=''/>
                    <span onClick={handleDestroy}>X</span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                    <div className='rows'>
                        <label htmlFor='title'>Title</label>
                        <input type='text'name='title' id='title' required
                        value={product.title} onChange={handleChanceInput}/>
                    </div>
                    <div className='rows'>
                        <label htmlFor='title'>Price</label>
                        <input type='number'name='price' id='price' required
                        value={product.price} onChange={handleChanceInput}/>
                    </div> 
                    <div className='rows'>
                        <label htmlFor='title'>Description</label>
                        <textarea type='number'name='description' id='description' required
                        value={product.description} rows='3' onChange={handleChanceInput}/>
                    </div>
                    <div className='rows'>
                        <label htmlFor='title' style={{marginRight: 10}}>Category</label>
                        <select name='category' value={product.category} onChange={handleChanceInput}>
                            <option value=''>Please select a category</option>
                            {
                                categories.map(category =>(
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>   
                    <button type='submit'>{onEdit?"Update Product":"Create Product"}</button>                  
                </form>
        </div>
    );
}

export default CreateProduct;
