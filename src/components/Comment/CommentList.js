import React from 'react';
import Image from '../Common/Image';
import { breakLine } from 'utils/breakLine';
import defaultProfile from 'assets/img/profile.png';

const CommentList = ({my_id, comments, commentInEdit, editingContents, editingContentsChange, setCommentInEdit, updateComment, deleteComment}) => {

    const makeCommentList = () => {
        let commentList = comments.map(comment => {
            let user = comment.user;
            return (
                <div key={comment.comment_id} className="comment-wrapper">
                    <div className="profile">
                        <Image imgSrc={user.profile_path} defaultImgSrc={defaultProfile} />
                    </div>
                    <div className="com-cont-wrp">
                        <h5>{user.nickname}</h5>
                        {
                            comment.comment_id === commentInEdit ?
                            <>
                                <textarea value={editingContents} onChange={editingContentsChange}>
                                </textarea>
                                <button onClick={(e) => updateComment(comment.comment_id)}>ENTER</button>
                            </>
                            :
                            <p>
                                {breakLine(comment.text)}
                            </p>
                        }
                    </div>
                    {
                        my_id === comment.author_id &&
                        <div className="actions-wrapper">
                            <div className="edit-wrapper">
                                <i className="material-icons pointer" onClick={() => setCommentInEdit(comment.comment_id, comment.text)}>edit</i>
                            </div>
                            <div className="delete-wrapper">
                                <i className="material-icons pointer" onClick={() => deleteComment(comment.comment_id)}>delete</i>
                            </div>
                        </div>
                    }
                </div>
            )
        })
        return commentList
    }

    return (
        <div className="comment-list-wrapper">
            {makeCommentList()}
        </div>            
    )
}

export default CommentList;