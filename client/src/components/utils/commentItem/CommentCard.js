import React from 'react'
import Rating from '../rating/Rating'
import moment from 'moment'
import './CommentCard.css'

function CommentCard(props) {
   const {comment} =props
    return (  
        <div className="comment_card">
        <div className="comment_card_row">
            <h3>{comment.username}</h3>
            {
                comment.rating !== 0 && <Rating props={comment} />
            }
        </div>

        <span>{moment(comment.createdAt).fromNow()}</span>

        <span>{new Date(comment.createdAt).toLocaleString()}</span>

        <p dangerouslySetInnerHTML={{__html: comment.content}} />

        
        
    </div>
    );
}

export default CommentCard;