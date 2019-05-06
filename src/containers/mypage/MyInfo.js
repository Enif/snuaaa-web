import React from 'react';
import * as service from '../../services';
import Loading from '../../components/Common/Loading';
import MyProfile from '../../components/MyPage/MyProfile';
import MyPostList from '../../components/MyPage/MyPostList';
import MyPhotoList from '../../components/MyPage/MyPhotoList';
import MyCommentList from '../../components/MyPage/MyCommentList';

const TAG = 'MYPOST'

class MyInfo extends React.Component {

    constructor(props) {
        super(props);

        this.profile = null;
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

        await Promise.all([service.retrieveUserInfo(), service.retrieveUserPosts()]) 
        .then((response) => {

            this.profile = response[0].data.userInfo;
            this.postList = response[1].data.postList;
            this.photoList = response[1].data.photoList;
            this.commentList = response[1].data.commentList;

            this.setState({
                isShow: true
            })
        })
        .catch((err) => {
            console.error(err);
        })
    }


    render() {
        let { isShow } = this.state
        return (
            isShow ?
            <div className="my-wrapper">
                <MyProfile profileImg={this.profile.profile_path} nickname={this.profile.nickname} userDesc={this.profile.introduction} />
                <div className="my-objects-wrapper">
                    <div className="my-left">
                        <MyPostList posts={this.postList} />
                        <MyPhotoList photos={this.photoList} />
                    </div>
                    <div className="my-right">
                        <MyCommentList comments={this.commentList} />
                    </div>
                </div>
            </div>
            :
            <Loading />
        )
    }
}

export default MyInfo;