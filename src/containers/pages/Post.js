import React from 'react';
import * as service from '../../services';
import Loading from '../../components/Common/Loading';
import PostComponent from '../../components/Post/PostComponent';

const TAG = 'POST'

class Post extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);

        this.postData = undefined;

        this.state = {
            post_id: this.props.match.params.pNo,
            likeInfo: false,
            isShow: false
        }
    }

    componentDidMount() {
        this.retrievePost();
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[%s] getDerivedStateFromProps', TAG);
        return {
            post_id: props.match.params.pNo
        }
    }

    retrievePost = async () => {
        console.log('[%s] Retrieve Post', TAG);

        await service.retrievePost(this.state.post_id)
        .then((res) => {
            console.log('[%s] Retrieve Post Success', TAG);
            this.postData = res.data.postInfo;
            this.setState({
                likeInfo: res.data.likeInfo,
                isShow: true
            })
        })
        .catch((res) => {
            console.log('[%s] Retrieve Post Fail', TAG);
        })
    }

    likePost = async() => {
        await service.likeObject(this.state.post_id)
        .then(() => {
            if(this.state.likeInfo) {
                this.postData.like_num--;
            }
            else {
                this.postData.like_num++;
            }
            this.setState({
                likeInfo: !this.state.likeInfo
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }

    render() {
        console.log('[%s] render', TAG)
        let { isShow, post_id, likeInfo} = this.state;

        return (
            <>
            {
                isShow ?
                (
                    <PostComponent postData={this.postData} post_id={post_id} likeInfo={likeInfo} likePost={this.likePost}/>
                )
                :
                (
                    <Loading/>
                )
            }
            </>
        )
    }
}

export default Post;