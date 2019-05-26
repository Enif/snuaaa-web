import React from 'react'
import { Link } from 'react-router-dom';
import { convertDate } from '../../utils/convertDate';

const NewComments = ({comments}) => {

    const makeCommentList = () => {
        return comments.map(comment => {

            let linkTo = '';
            if(comment.type === "PO") {
                linkTo = `/post/${comment.parent_id}`
            }
            else if(comment.type === "PH") {
                linkTo = `/photo/${comment.parent_id}`
            }

            return (
                <div className="new-comment-list" key={comment.comment_id}>
                    <div className="new-comment-boardname">{comment.board_name}</div>
                    <div className="new-comment-contents">
                        <Link to={linkTo}>
                            <p>{comment.title ? comment.title : "제목없음"}</p>
                        </Link>
                        <div className="new-comment-contents-bot">
                            <p className="new-comment-comment">{comment.contents}</p>
                            <div className="new-comment-date">{convertDate(comment.created_at)}</div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return(
        <div className="new-comments-wrapper">
            <h4>New Comments</h4>
            {makeCommentList()}
        </div>
    )
}

export default NewComments;
