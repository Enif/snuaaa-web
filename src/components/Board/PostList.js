import React from 'react';
import * as service from '../../services';
import Loading from '../Common/Loading';

const TAG = 'POSTLIST'

class PostList extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);

        this.state = {
            boardNo: this.props.boardNo,
            isShow: false
        }
        this.retrievePosts(this.state.boardNo);
    }

    posts = [];    

    static getDerivedStateFromProps(props, state) {
        console.log('[%s] getDerivedStateFromProps', TAG);
        return {
            boardNo: props.boardNo,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[%s] shouldComponentUpdate', TAG)
        if(this.state.boardNo !== nextState.boardNo){
            nextState.isShow = false;
            this.retrievePosts(nextState.boardNo)
            return true;
        }

        if(nextState.isShow === true) {
            return true;
        }
    }

    clickPostTitle = (postId, e) => {
        e.preventDefault();
        this.props.setPostId(postId)
        this.props.setBoardState(2);
    }

    retrievePosts = async (boardNo) => {
        console.log('[%s] Retrieve Posts', TAG);

        await service.retrievePostsInBoard(boardNo)
        .then((res) => {
            console.log('[%s] Retrieve Posts Success', TAG);
            console.log(res.data)
            const postData = res.data;
            let posts = postData.map(post => {
                return (
                    <div className="post-wrapper">
                        <div className="post-number">
                            {post.post_no}
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
            this.posts = posts;
            this.setState({
                isShow: true
            })
        })
        .catch((res) => {
            console.log('[%s] Retrieve Posts Fail', TAG);
        })
    }

    render() {
        console.log('[%s] render', TAG)
        
        let { isShow } = this.state
        return (
            <React.Fragment>
            {
                isShow ?
                (
                    <div>
                        <div className="post-list">
                        {this.posts}
                    </div>
                        <button onClick={() => this.props.setBoardState(1)}>글쓰기</button>
                    </div>       
                )
                :
                (
                    <Loading/>
                )

            }
            </React.Fragment>
        ) 
    }

    componentDidMount() {
        console.log('[%s] componentDidMount', TAG)
    }
}

export default PostList;