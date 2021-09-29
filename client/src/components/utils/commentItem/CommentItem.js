import React from 'react';
import CommentCard from './CommentCard'

function CommentItem(props) {
    const {comment} = props
    return (
        <>
            <CommentCard comment = {comment}>


            </CommentCard>
        </>
    );
}

export default CommentItem;