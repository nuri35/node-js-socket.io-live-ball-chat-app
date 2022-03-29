import React, { useEffect, useState } from 'react'

import SingleComment from './SingleComment';





function ReplyComment(props){

   
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {

        let commentNumber = 0;
        props.CommentLists.map((comment) => {

            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.CommentLists, props.parentCommentId])


    let renderReplyComment = (parentCommentId) =>
        props.CommentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '100%', marginLeft: '40px' }}>
                        <SingleComment comment={comment} postId={comment.postId} refreshFunction={props.refreshFunction}  editFunction={props.editFunction} deleteFunction={props.deleteFunction} />
                        <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} postId={comment.postId} refreshFunction={props.refreshFunction} editFunction={props.editFunction} deleteFunction={props.deleteFunction} />
                    </div>
                }
            </React.Fragment>
        ))

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    
    }


    return (
        <div>

            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: '#065FD4', left:"55px",
                position: "relative" }}
                    onClick={handleChange} >
                    View {ChildCommentNumber} replies
             </p>
            }

            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment