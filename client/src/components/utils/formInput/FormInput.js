import React, { useRef } from 'react';
import './FormInput.css';
import {patchData} from '../fetchData';
import { useSelector } from 'react-redux';
function FormInput(props) {
    const auth = useSelector(state =>state.Auth)
    const {isLogger,user} = auth
    const contentRef = useRef()
    const {id,rating,socket} = props
    const commentSubmit = () =>{
        if(isLogger) {
            const content = contentRef.current.innerHTML
            const username = user.username
            if(contentRef.current.textContent.trim().length<20)
            return alert('Content too short, must be at least 20 characters')
            const createdAt = new Date().toISOString()
    
            socket.emit('createComment',{
                username, content, product_id: id, createdAt, rating
            })
    
            if(rating && rating !==0){
                patchData(`http://localhost:3000/api/products/${id}`,{rating})
                .then(res => console.log(res))
            }
            contentRef.current.innerHTML=''
        }else{
            alert('you must login !')
        }

    }
    return (
<div className="form_input">


            <p>Content</p>
            <div ref={contentRef} 
                contentEditable="true"
                style={{
                    height: '100px',
                    border: '1px solid #ccc',
                    padding: '5px 10px',
                    outline: 'none'
                }}
            />

            <button onClick ={commentSubmit}>Send</button>
        </div>
    );
}

export default FormInput