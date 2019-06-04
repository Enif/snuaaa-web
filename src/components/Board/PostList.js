import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from 'utils/convertDate'

const PostList = ({posts, togglePopUp}) => {

    const makePostList = () => {

        let postList = posts.map(post => {
            return (
                <div className="post-list-unit" key={post.object_id}>
                    <div className="post-list-unit-left">
                        <div className="post-title">
                            <Link to={`/post/${post.object_id}`}>
                                <h5>{post.title}</h5>                    
                            </Link>
                        </div>
                        <div className="post-author">
                            {post.nickname}
                        </div>
                        <div className="post-created">
                            {convertDate(post.created_at)}
                        </div>
                    </div>
                    <div className="post-list-unit-right">
                        <div className="post-comment-num">
                            <span className="color-pink">
                                <i className="material-icons md-18">favorite</i>
                                {post.like_num}
                            </span>
                            <span className="color-gray1">
                                <i className="material-icons md-18 md-dark">comment</i>
                                {post.comment_num}
                            </span>                        
                        </div>
                    </div>
                </div>
            )
        });
        return postList    
    }
        
    return (
            <>
                <div className="post-list-wrapper">
                    {makePostList()}
                </div>
                <button className="enif-btn-circle enif-pos-sticky" onClick={togglePopUp}>
                    <i className="material-icons">create</i>
                </button>
            </>
    )
}

export default PostList;