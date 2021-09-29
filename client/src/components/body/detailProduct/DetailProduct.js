import axios from 'axios';
import React,{useContext,useEffect,useRef,useState} from 'react';
import {DataContext} from '../../../GlobalState';
import DetailProductCard from '../../utils/detailProductCard/DetailProductCard';
import FormInput from '../../utils/formInput/FormInput';
import CommentItem from '../../utils/commentItem/CommentItem';
import Loading from '../../utils/loading.gif';
import ProductCard from '../../utils/productCard/ProductCard';
function DetailProduct({match}) {
    const state = useContext(DataContext)
    const [products] = state.productAPI.products // change by redux
    const [ProductDetail,setProductDetail] = useState([])
    const [rating,setRating] = useState(0)
    const [comments,setComments] = useState([])
    const [loading,setLoading] = useState(false)
    const {id} = match.params
    const socket = state.socket //chance by redux
    const [page,setPage] = useState(1)
    const pageEnd = useRef()
    const [relate,setRelate] = useState([])
   
    //get product detail
    useEffect(()=>{
        setProductDetail(products.filter((product) => product._id===id))
        products.forEach(product => {
            if(product._id === id) setRelate(product)
        })
    },[id,products])

    //get comments in data base
    useEffect(() =>{
        const getproduct = async()=>{
            setLoading(true)
            const getData = await axios.get(`/api/comments/${id}`)
            setComments(getData.data.comments)
            setLoading(false)
        }
        getproduct()
    },[id,page])

    // send id room
    useEffect(() =>{
        if(socket){
            socket.emit('joinRoom',id)
        }
    },[socket,id])
    // receive comments
    useEffect(() =>{
        if(socket){
            socket.on('sendCommentToClient',msg =>{
                setComments([msg,...comments])
            })
            return () => socket.off('sendCommentToClient')
        }
    },[socket,comments])

    //panigation
    useEffect(() =>{
        const observer = new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting){
                setPage(prev => prev +1)
            }
        },{
            threshold: 0.1
        })
        observer.observe(pageEnd.current)
    },[])
    return (
        <div className="detail-product-page">
            {
                ProductDetail.map(product => (
                    <DetailProductCard key={product._id} product={product} />
                ))
            }
        <div className ='related'>
            <h2 className = 'app-title'>
                    Related Products
            </h2>
            {
                products.map(product =>{
                    return product.category === relate.category?<ProductCard key={product._id} product ={product}/>:null
                })
            }
        </div>
            <div className ="comment">
                <h2 className = 'app-title'>
                    Realtime website ( chat, comment ...) with MERN and socket.io
                </h2>
                <div className ='reviews'>
                    <input type ='radio' name ='rate' id ="rd-5" onChange = {() =>setRating(5)}/>
                    <label htmlFor ='rd-5' className ='fas fa-star'></label>
                    <input type ='radio' name ='rate' id ="rd-4" onChange = {() =>setRating(4)}/>
                    <label htmlFor ='rd-4' className ='fas fa-star'></label>
                    <input type ='radio' name ='rate' id ="rd-3" onChange = {() =>setRating(3)}/>
                    <label htmlFor ='rd-3' className ='fas fa-star'></label>
                    <input type ='radio' name ='rate' id ="rd-2" onChange = {() =>setRating(2)}/>
                    <label htmlFor ='rd-2' className ='fas fa-star'></label>
                    <input type ='radio' name ='rate' id ="rd-1" onChange = {() =>setRating(1)}/>
                    <label htmlFor ='rd-1' className ='fas fa-star'></label>
                </div>

                <FormInput id ={id} socket ={socket} rating ={rating}/>
                <div className ='comments_list'>
                    {
                        comments.map(comment =>{
                            return (
                                <CommentItem key = {comment._id} comment ={comment}/>
                            )
                        })
                    }
                </div>
            </div>
            {loading && <div className ='loading'><img src ={Loading} alt ='' style ={{maxWidth:225}}></img></div>}
            <button ref={pageEnd} style ={{opacity:0}}>Load more</button>    
        </div>
    );
}

export default DetailProduct;