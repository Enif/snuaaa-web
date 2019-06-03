import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from 'utils/convertDate'

const MyPostList = ({posts}) => {

    const retrievePosts = () => {

        let postList = posts.map(post => {
            return (
                <div className="my-post-wrapper" key={post.object_id}>
                    <div className="my-post-boardname">{post.board_name}</div>
                    <div className="my-post-title">
                        <Link to={`/post/${post.object_id}`}>
                            <h5>{post.title}</h5>
                        </Link>
                    </div>
                    <div className="my-post-date">
                        {convertDate(post.created_at)}
                    </div>
                </div>
            )
        });
        return postList
    }

    return (
        <div className="my-list-wrapper">
            <h4>등록한 게시글</h4>
            {retrievePosts()}
        </div>
    )
}

export default MyPostList;