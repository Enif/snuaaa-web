import React from 'react';
import * as service from '../../services';
import Loading from '../../components/Common/Loading';
import MyPostList from '../../components/MyPage/MyPostList';
import MyPhotoList from '../../components/MyPage/MyPhotoList';
import MyCommentList from '../../components/MyPage/MyCommentList';

const TAG = 'MYPOST'

class MyPost extends React.Component {

    constructor(props) {
        super(props);

        this.postList = [];
        this.photoList = [];
        this.commentList = [];
        this.state = {
            isShow: false
        }
    }

    componentDidMount() {
        this.getUserPost();
    }


    getUserPost = async () => {
        this.setState({
            isShow: false
        })

        await service.retrieveUserPosts()
        .then((response) => {
            this.postList = response.data.postList;
            this.photoList = response.data.photoList;
            this.commentList = response.data.commentList;

            this.setState({
                isShow: true
            })
        })
        .catch((err) => {
        })
    }


    render() {
        let { isShow } = this.state
        return (
            isShow ?
            <div className="my-wrapper">
                <div className="my-left">
                    <MyPostList posts={this.postList} />
                    <MyPhotoList photos={this.photoList} />
                </div>
                <div className="my-right">
                    <MyCommentList comments={this.commentList} />
                </div>
            </div>
            :
            <Loading />
        )
    }
}

export default MyPost;