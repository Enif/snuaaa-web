import React, { ChangeEvent } from 'react';
import Image from '../Common/AaaImage';
import { breakLine } from '../../utils/breakLine';
import { convertFullDate } from '../../utils/convertDate';
import defaultProfile from 'assets/img/common/profile.png';
import UserActionDrawer from '../../components/Common/UserActionDrawer';
import CommentType from '../../types/CommentType';

type CommnetListProps = {
    my_id: number;
    comments: CommentType[];
    commentInEdit: number;
    editingContents: string;
    editingContentsChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    setCommentInEdit: (commnet_id: number, text: string) => void;
    updateComment: (commnet_id: number) => void;
    deleteComment: (commnet_id: number) => void;
}

const CommentList = ({ my_id, comments, commentInEdit, editingContents, editingContentsChange,
    setCommentInEdit, updateComment, deleteComment }: CommnetListProps) => {

    const makeCommentList = () => {
        if (comments && comments.length > 0) {
            let commentList = comments.map(comment => {
                let user = comment.user;
                return (
                    <div key={comment.comment_id} className="comment-wrapper">
                        <UserActionDrawer userInfo={user} className="profile">
                            <Image className="comment-profile-img" imgSrc={user.profile_path} defaultImgSrc={defaultProfile} />
                        </UserActionDrawer>
                        <div className="com-cont-wrp">
                            <div className="com-cont-top">
                                <h5>{user.nickname}</h5>
                                <p className="com-date">{convertFullDate(comment.createdAt)}</p>
                            </div>
                            <div className="com-cont-bot">
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
                                {
                                    my_id === comment.author_id &&
                                    <div className="actions-wrapper">
                                        <div className="edit-wrapper">
                                            <i className="ri-edit-fill enif-pointer action-icons"
                                                onClick={() => setCommentInEdit(comment.comment_id, comment.text)}></i>
                                        </div>
                                        <div className="delete-wrapper">
                                            <i className="ri-delete-bin-fill enif-pointer action-icons"
                                                onClick={() => deleteComment(comment.comment_id)}></i>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                )
            })
            return commentList
        }
    }

    return (
        <div className="comment-list-wrapper">
            {makeCommentList()}
        </div>
    )
}

export default CommentList;