import React from 'react';
import * as service from '../../services';

const TAG = 'POSTLIST'

class PostList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }

        this.retrievePosts();
    }

    clickPostTitle = (postId, e) => {
        e.preventDefault();
        this.props.setPostId(postId)
        this.props.setBoardState(2);
    }

    retrievePosts = async () => {
        console.log('[%s] Retrieve Posts', TAG);

        await service.retrievePosts()
        .then((res) => {
            console.log('[%s] Retrieve Posts Success', TAG);
            console.log(res.data)
            const postData = res.data;
            let posts = postData.map(post => {
                return(
                    <div className="post-wrapper">
                        <div className="post-number">
                            300
                        </div>
                        <div className="post-title">
                            <h5 onClick={(e) => this.clickPostTitle(post._id, e)}>{post.title}</h5>
                        </div>
                        <div className="post-author">
                            {post.author_name}
                        </div>
                    </div>
                )
            });
            this.setState({
                posts: posts
            })
        })
        .catch((res) => {
            console.log('[%s] Retrieve Posts Fail', TAG);
        })
    }

    render() {
        return (
            <div>
                <div className="post-list">
                {this.state.posts}
            </div>
                <button onClick={() => this.props.setBoardState(1)}>글쓰기</button>
            </div>
        )
    }
}

export default PostList;