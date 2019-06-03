import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from 'utils/convertDate'

const MyCommentList = ({comments}) => {

    const retrieveComments = () => {

        let commentList = comments.map(comment => {

            let linkTo = '';
            if(comment.type === "PO") {
                linkTo = `/post/${comment.parent_id}`
            }
            else if(comment.type === "PH") {
                linkTo = `/photo/${comment.parent_id}`
            }

            return (
                <div className="my-cmt-wrapper" key={comment.comment_id}>
                    <div className="my-cmt-boardname">{comment.board_name}</div>

                    <Link to={linkTo}>
                        <div className="my-cmt-contents">
                            <p>{comment.title}</p>
                            <p className="my-cmt-cmt">{comment.contents}</p>
                        </div>
                    </Link>
                    <div className="my-cmt-date">
                        <p>{convertDate(comment.created_at)}</p>
                    </div>
                </div>
            )
        })
        return commentList
    }

    return (
        <div className="my-list-wrapper">
            <h4>등록한 댓글</h4>
            {retrieveComments()}
        </div>
    )
}

export default MyCommentList;