import React from 'react'
import { Link } from 'react-router-dom';
import { convertDate } from 'utils/convertDate';

const NewPosts = ({ posts }) => {

    const makePostList = () => {
        return posts.map(post => {
            let content = post.content;
            let boardInfo = post.content.board;
            return (
                <div className="new-post-list" key={content.content_id}>
                    <div className="new-post-boardname">
                        <Link to={`/board/${boardInfo.board_id}`}>
                            {boardInfo.board_name}
                        </Link>
                    </div>
                    <div className="new-post-title">
                        <Link to={`/post/${content.content_id}`}>
                            <h5>{`${content.title} `}</h5>
                        </Link>
                    </div>
                    <p>{`[${content.comment_num}]`}</p>
                    <div className="new-post-date">{convertDate(content.createdAt)}</div>
                </div>
            )
        })
    }

    return (
        <div className="new-posts-wrapper">
            <Link to={'/posts/all'}>
                <h4>New Posts</h4>
            </Link>
            {makePostList()}
        </div>
    )
}

export default NewPosts;
