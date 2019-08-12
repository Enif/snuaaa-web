import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from 'utils/convertDate'

const PostList = ({ posts, clickCrtBtn }) => {

    const makePostList = () => {

        let postList = posts.map(post => {
            let content = post.content;
            let user = post.content.user;

            return (
                <div className="post-list" key={content.content_id}>
                    <div className="post-list-unit-left">
                        <div className="post-list-unit-title">
                            <Link to={`/post/${content.content_id}`}>
                                <h5>{content.title}</h5>
                            </Link>
                        </div>
                        <div className="post-list-unit-left-bot">
                            <div className="post-list-unit post-list-unit-2">
                                {user.nickname}
                            </div>
                            <div className="post-list-unit post-list-unit-2">
                                {convertDate(content.createdAt)}
                            </div>
                        </div>
                    </div>

                    <div className="post-list-unit post-list-unit-3">
                        <span className="color-pink icon-wrapper">
                            <i className="material-icons md-18">favorite</i>
                            {content.like_num}
                        </span>
                    </div>
                    <div className="post-list-unit post-list-unit-3">
                        <span className="color-gray1 icon-wrapper">
                            <i className="material-icons md-18 md-dark">comment</i>
                            {content.comment_num}
                        </span>
                    </div>
                    {/* <div className="post-list-unit-left">
                        <div className="post-title">

                        </div>
                        <div className="post-author">

                        </div>
                        <div className="post-created">
                        </div>
                    </div>
                    <div className="post-list-unit-right">
                        <div className="post-comment-num">
                            <span className="color-pink">
                                <i className="material-icons md-18">favorite</i>
                                {content.like_num}
                            </span>
                            <span className="color-gray1">
                                <i className="material-icons md-18 md-dark">comment</i>
                                {content.comment_num}
                            </span>
                        </div>
                    </div> */}
                </div>
            )
        });
        return postList;
    }

    return (
        <>
            <div className="post-list-wrapper">
                <div className="post-list-header">
                    <div className="post-list-header-unit post-list-header-1">제목</div>
                    <div className="post-list-header-unit post-list-header-2">작성자</div>
                    <div className="post-list-header-unit post-list-header-2">작성일</div>
                    <div className="post-list-header-unit post-list-header-3">추천</div>
                    <div className="post-list-header-unit post-list-header-3">댓글</div>
                </div>
                {makePostList()}
            </div>

        </>
    )
}

export default PostList;