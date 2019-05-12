import React from 'react';
import { Link } from 'react-router-dom';
import ContentStateEnum from '../../common/ContentStateEnum';
import Comment from '../../containers/Comment';
import ProfileMini from '../Common/ProfileMini';
import { convertFullDate } from '../../utils/convertDate';
import { breakLine } from '../../utils/breakLine';

const PostComponent = ({postData, post_id, my_id, likeInfo, likePost, setPostState, deletePost}) => {

    return (

        <div className="post-wrapper">
            <div className="post-title">
                <Link to={`/board/${postData.board_id}`}>
                    <i className="material-icons">keyboard_backspace</i>
                </Link>
                <h5>{postData.title}</h5>
            </div>
            <div className="post-info-other">
                <div className="post-author">
                    {postData.nickname}
                </div>
                <div className="post-date">
                    {convertFullDate(postData.created_at)}
                </div>
            </div>
            <div className="post-content">
                {breakLine(postData.contents)}
            </div>
            <ProfileMini profileImg={postData.profile_path} nickname={postData.nickname} userDesc={postData.introduction}/>
            <div className="enif-divider"></div>
            <div className="actions-wrapper">
                {
                    (my_id === postData.author_id) &&
                    <div className="edit-delete-wrapper">
                        <div className="edit-wrapper">
                            <i className="material-icons pointer" onClick={() => setPostState(ContentStateEnum.EDITTING)}>edit</i>
                        </div>
                        <div className="delete-wrapper">
                            <i className="material-icons pointer" onClick={() => deletePost()}>delete</i>
                        </div>
                    </div>
                }
                <div className="like-comment-num-wrapper">
                    <div className="like-num-wrapper">
                        <i className="material-icons pointer" onClick={() => likePost()}>
                            { likeInfo ? 'favorite' : 'favorite_border'}
                        </i>
                        {postData.like_num}                  
                    </div>
                    <div className="comment-num-wrapper">
                        <i className="material-icons">comment</i>
                        {postData.comment_num}
                    </div>
                </div>
            </div>
            <Comment parent_id={post_id}/>
        </div>
    )
}

export default PostComponent;