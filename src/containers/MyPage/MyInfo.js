import React from 'react';
import Loading from 'components/Common/Loading';
import MyProfile from 'components/MyPage/MyProfile';
import MyPostList from 'components/MyPage/MyPostList.tsx';
import MyPhotoList from 'components/MyPage/MyPhotoList.tsx';
import MyCommentList from 'components/MyPage/MyCommentList';
import MyPageSelector from 'components/MyPage/MyPageSelector';
import MyPageViewEnum from 'common/MyPageViewEnum';
import UserService from 'services/UserService';

const TAG = 'MYPOST'

class MyInfo extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] Constructor`)
        super(props);

        this.profile = null;
        this.postList = [];
        this.photoList = [];
        this.commentList = [];
        this.state = {
            isShow: false,
            myPageView: MyPageViewEnum.POST
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = async () => {
        const { myPageView } = this.state
        this.setIsShow(false);


        if (!this.userInfo) {
            await Promise.all([UserService.retrieveUserInfo(), UserService.retrieveUserPosts()])
                .then((res) => {
                    console.log(res[0].data)
                    this.userInfo = res[0].data;
                    this.postList = res[1].data.postList;
                    this.setIsShow(true);
                })
        }
        else {
            if (myPageView === MyPageViewEnum.POST) {
                await UserService.retrieveUserPosts()
                    .then((res) => {
                        this.postList = res.data.postList;
                        this.setIsShow(true);
                    })
            }
            if (myPageView === MyPageViewEnum.PHOTO) {
                await UserService.retrieveUserPhotos()
                    .then((res) => {
                        this.photoList = res.data.photoList;
                        this.setIsShow(true);
                    })
            }
            if (myPageView === MyPageViewEnum.COMMENT) {
                await UserService.retrieveUserComments()
                    .then((res) => {
                        this.commentList = res.data.commentList;
                        this.setIsShow(true);
                    })
            }
        }
    }

    setIsShow = (isShow) => {
        this.setState({
            isShow: isShow
        })
    }

    setMyPageView = (selected) => {
        this.setState({
            myPageView: selected
        }, this.fetch)
    }

    makeMyContentsList = () => {
        const { myPageView } = this.state
        if (myPageView === MyPageViewEnum.POST) {
            return (
                <MyPostList posts={this.postList} />
            )
        }
        else if (myPageView === MyPageViewEnum.PHOTO) {
            return (
                <MyPhotoList photos={this.photoList} />
            )
        }
        else if (myPageView === MyPageViewEnum.COMMENT) {
            return (
                <MyCommentList comments={this.commentList} />
            )
        }
        else {
            return;
        }
    }

    render() {
        const { setMyPageView, makeMyContentsList } = this;
        const { isShow, myPageView } = this.state

        return (
            <>
                {!isShow && <Loading />}
                <div className="my-wrapper">
                    <div className="my-title-wrapper">
                        <h3>My Page</h3>
                    </div>
                    {this.userInfo && <MyProfile userInfo={this.userInfo} isCanEdit={true}/>}

                    <MyPageSelector
                        selected={myPageView}
                        selectPost={() => setMyPageView(MyPageViewEnum.POST)}
                        selectPhoto={() => setMyPageView(MyPageViewEnum.PHOTO)}
                        selectComment={() => setMyPageView(MyPageViewEnum.COMMENT)}
                    />
                    {makeMyContentsList()}
                </div>
            </>
        )
    }
}

export default MyInfo;