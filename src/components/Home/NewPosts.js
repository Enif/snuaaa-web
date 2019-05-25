import React from 'react'
import { Link } from 'react-router-dom';
import { convertDate } from '../../utils/convertDate';

const NewPosts = ({posts}) => {

    const makePostList = () => {
        return posts.map(post => {
            return (
                <div className="new-post-list" key={post.object_id}>
                    <div className="new-post-boardname">{post.board_name}</div>
                    <div className="new-post-title">
                        <Link to={`/post/${post.object_id}`}>
                            <h5>{post.title}</h5>
                        </Link>
                    </div>
                    <div className="new-post-date">{convertDate(post.created_at)}</div>
                </div>
            )
        })
    }

    return(
        <div className="new-posts-wrapper">
            <h4>New Posts</h4>
            {makePostList()}
        </div>
    )
}

export default NewPosts;
