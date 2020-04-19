import React, { ChangeEvent } from 'react';
import Image from '../Common/AaaImage';
import { breakLine } from '../../utils/breakLine';
import { convertFullDate } from '../../utils/convertDate';
import defaultProfile from 'assets/img/common/profile.png';
import UserActionDrawer from '../../components/Common/UserActionDrawer';
import CommentType from '../../types/CommentType';

type CommentListProps = {
    my_id: number;
    comments: CommentType[];
    commentInEdit: number;
    editingContents: string;
    parentCommentId: number;
    text: string;
    editingContentsChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    setCommentInEdit: (comment_id: number, text: string) => void;
    // setParentCommentId: (comment_id: number) => void;
    handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onClickSubComment: (comment_id: number) => void;
    createComment: () => void;
    updateComment: (comment_id: number) => void;
    deleteComment: (comment_id: number) => void;
}

const CommentList = ({ my_id, comments, commentInEdit, editingContents, parentCommentId, text, editingContentsChange, handleChange,
    setCommentInEdit, onClickSubComment, createComment, updateComment, deleteComment }: CommentListProps) => {

    const makeCommentList = (comments: CommentType[]) => {
        if (comments && comments.length > 0) {
            let commentList = comments.map(comment => {
                let user = comment.user;
                return (
                    <>
                        <div key={comment.comment_id} className="comment-wrapper">
                            <UserActionDrawer userInfo={user} className="profile">
                                <Image className="comment-profile-img" imgSrc={user.profile_path} defaultImgSrc={defaultProfile} />
                            </UserActionDrawer>
                            <div className="com-cont-wrp">
                                <div className="com-cont-top">
                                    <h5>{user.nickname}</h5>
                                    {
                                        my_id === comment.author_id &&
                                        <div className="actions-wrapper">
                                            <div className="edit-wrapper">
                                                <i className="ri-edit-2-line enif-pointer action-icons"
                                                    onClick={() => setCommentInEdit(comment.comment_id, comment.text)}></i>
                                            </div>
                                            <div className="delete-wrapper">
                                                <i className="ri-delete-bin-line enif-pointer action-icons"
                                                    onClick={() => deleteComment(comment.comment_id)}></i>
                                            </div>
                                        </div>
                                    }
                                    <p className="com-date">{convertFullDate(comment.createdAt)}</p>
                                </div>
                                <div className="com-cont-mid">
                                    {
                                        comment.comment_id === commentInEdit ?
                                            <>
                                                <textarea value={editingContents} onChange={editingContentsChange}>
                                                </textarea>
                                                <button onClick={() => updateComment(comment.comment_id)}>ENTER</button>
                                            </>
                                            :
                                            <p>
                                                {breakLine(comment.text)}
                                            </p>
                                    }
                                </div>
                                <div className="com-cont-bot">
                                    <div className="cmt-like-wrp">
                                        <i className="ri-heart-line"></i>
                                        <p>3</p>
                                    </div>
                                    {
                                        parentCommentId === comment.comment_id
                                            ?
                                            <p className="enif-pointer" onClick={() => onClickSubComment(0)}>답글 달기 취소</p>
                                            :
                                            <p className="enif-pointer" onClick={() => onClickSubComment(comment.comment_id)}>답글 달기</p>
                                    }
                                </div>
                            </div>
                        </div>
                        {makeSubCommentList(comment.children)}
                        {
                            parentCommentId === comment.comment_id
                            &&
                            <div className="comment-write sub">
                                <textarea placeholder="댓글을 입력하세요" name="text" value={text} onChange={handleChange}></textarea>
                                <button onClick={createComment}>ENTER</button>
                            </div>
                        }
                    </>
                )
            })
            return commentList
        }
    }

    const makeSubCommentList = (comments: CommentType[]) => {
        return comments.map((comment) => {
            return (
                <div key={comment.comment_id} className="comment-wrapper sub">
                    <UserActionDrawer userInfo={comment.user} className="profile">
                        <Image className="comment-profile-img" imgSrc={comment.user.profile_path} defaultImgSrc={defaultProfile} />
                    </UserActionDrawer>
                    <div className="com-cont-wrp">
                        <div className="com-cont-top">
                            <h5>{comment.user.nickname}</h5>
                            {
                                my_id === comment.author_id &&
                                <div className="actions-wrapper">
                                    <div className="edit-wrapper">
                                        <i className="ri-edit-2-line enif-pointer action-icons"
                                            onClick={() => setCommentInEdit(comment.comment_id, comment.text)}></i>
                                    </div>
                                    <div className="delete-wrapper">
                                        <i className="ri-delete-bin-line enif-pointer action-icons"
                                            onClick={() => deleteComment(comment.comment_id)}></i>
                                    </div>
                                </div>
                            }
                            <p className="com-date">{convertFullDate(comment.createdAt)}</p>
                        </div>
                        <div className="com-cont-mid">
                            {
                                comment.comment_id === commentInEdit ?
                                    <>
                                        <textarea value={editingContents} onChange={editingContentsChange}>
                                        </textarea>
                                        <button onClick={() => updateComment(comment.comment_id)}>ENTER</button>
                                    </>
                                    :
                                    <p>
                                        {breakLine(comment.text)}
                                    </p>
                            }
                        </div>
                        <div className="com-cont-bot">
                            <div className="cmt-like-wrp">
                                <i className="ri-heart-line"></i>
                                <p>3</p>
                            </div>
                            {
                                parentCommentId === comment.parent_comment_id
                                    ?
                                    <p className="enif-pointer" onClick={() => onClickSubComment(0)}>답글 달기 취소</p>
                                    :
                                    <p className="enif-pointer" onClick={() => onClickSubComment(comment.parent_comment_id)}>답글 달기</p>
                            }
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="comment-list-wrapper">
            {makeCommentList(comments)}
        </div>
    )
}

export default CommentList;