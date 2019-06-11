import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from 'utils/convertDate'

const MyCommentList = ({comments}) => {

    const makeCommentList = () => {

        let commentList = comments.map(comment => {            
            let contentInfo = comment.content;
            let boardInfo = comment.content.board;
            let linkTo = '';
            if(contentInfo.type === "PO") {
                linkTo = `/post/${comment.parent_id}`
            }
            else if(contentInfo.type === "PH") {
                linkTo = `/photo/${comment.parent_id}`
            }

            return (
                <div className="my-cmt-wrapper" key={comment.comment_id}>
                    <div className="my-cmt-boardname">{boardInfo.board_name}</div>

                    <Link to={linkTo}>
                        <div className="my-cmt-contents">
                            <p>{contentInfo.title}</p>
                            <p className="my-cmt-cmt">{comment.text}</p>
                        </div>
                    </Link>
                    <div className="my-cmt-date">
                        <p>{convertDate(comment.createdAt)}</p>
                    </div>
                </div>
            )
        })
        return commentList
    }

    return (
        <div className="my-list-wrapper">
            <h4>등록한 댓글</h4>
            {makeCommentList()}
        </div>
    )
}

export default MyCommentList;