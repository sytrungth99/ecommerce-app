import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductAPI() {
    const [products,setProducts] = useState([])
    const [callback,setCallback] = useState(false)
    const [category,setCategory] = useState('')
    const [sort,setSort] = useState('')
    const [search,setSearch] = useState('')
    const [page,setPage] = useState(1)
    const [result,setResult] = useState(0)
    useEffect(()=>{
        const getProducts =async() =>{
            const res = await axios.get(`/api/products?${category}&${sort}&title[regex]=${search}`)
            setProducts(res.data.products)
        }
        getProducts()
    },[callback,category,sort,search])
    return{
        products:[products,setProducts],
        callback:[callback,setCallback],
        categorys: [category,setCategory],
        sort:[sort,setSort],
        search:[search,setSearch],
        page:[page,setPage],
        result:[result,setResult]
    }
}

export default ProductAPI;