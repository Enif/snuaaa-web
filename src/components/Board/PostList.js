import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from '../../utils/convertDate'

const TAG = 'POSTLIST'

class PostList extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);
 
    }


    retrievePosts = () => {
        console.log('[%s] Retrieve Posts', TAG);

        let posts = this.props.posts;
        let postList = posts.map(post => {
            return (
                <div className="post-wrapper">
                    {/* <div className="post-number">
                        {post.post_no}
                    </div> */}
                    <div className="post-title">
                        <Link to={`/post/${post.object_id}`}>
                            <h5>{post.title}</h5>                    
                        </Link>
                    </div>
                    <div className="post-author">
                        {post.nickname}
                    </div>
                    <div className="post-number">
                        {convertDate(post.created_at)}
                    </div>
                </div>
            )
        });
        return postList
    
    }

    render() {
        console.log('[%s] render', TAG)
        
        return (
            <React.Fragment>
                <div>
                    <div className="post-list">
                        {this.retrievePosts()}
                    </div>
                    <button className="enif-btn-circle" onClick={() => this.props.togglePopUp()}>+</button>
                </div>       
            </React.Fragment>
        ) 
    }

    componentDidMount() {
        console.log('[%s] componentDidMount', TAG)
    }
}

export default PostList;