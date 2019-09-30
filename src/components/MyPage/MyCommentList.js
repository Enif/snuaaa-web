import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from 'utils/convertDate'

const MyCommentList = ({ comments }) => {

    const makeCommentList = () => {

        if (comments && comments.length > 0) {
            return comments.map(comment => {
                let contentInfo = comment.content;
                let boardInfo = comment.content.board;
                let linkTo = '';
                if (contentInfo.type === "PO") {
                    linkTo = `/post/${comment.parent_id}`
                }
                else if (contentInfo.type === "PH") {
                    linkTo = {
                        pathname: `/photo/${comment.parent_id}`,
                        state: { modal: true }
                    }
                }
                else if (contentInfo.type === "DO") {
                    linkTo = `/document/${comment.parent_id}`
                }

                return (
                    <div className="my-cmt-wrapper" key={comment.comment_id}>
                        <div className="my-cmt-boardname">
                            <Link to={`/board/${boardInfo.board_id}`}>
                                {boardInfo.board_name}
                            </Link>
                        </div>

                        <Link to={linkTo} className="my-cmt-contents-link">
                            <div className="my-cmt-contents">
                                <p className="my-cmt-title">{contentInfo.title}</p>
                                <p className="my-cmt-cmt">{comment.text}</p>
                            </div>
                        </Link>
                        <div className="my-cmt-date">
                            <p>{convertDate(comment.createdAt)}</p>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <div className="my-list-wrapper">
            {/* <h4>등록한 댓글</h4> */}
            {makeCommentList()}
        </div>
    )
}

export default MyCommentList;