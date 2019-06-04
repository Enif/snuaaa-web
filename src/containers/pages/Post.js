import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as service from 'services';
import ContentStateEnum from 'common/ContentStateEnum';
import Loading from 'components/Common/Loading';
import PostComponent from 'components/Post/PostComponent';
import EditPost from 'components/Post/EditPost';

const TAG = 'POST'

class Post extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);

        this.postData = undefined;

        this.state = {
            post_id: this.props.match.params.pNo,
            likeInfo: false,
            postState: ContentStateEnum.LOADING,
            editingPostData: {
                title: '',
                contents: ''
            }
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

    setPostState = (state) => {
        this.setState({
            postState: state
        })
    }

    handleEditting = (e) => {
        const { editingPostData } = this.state

        this.setState({
            editingPostData: {
                ...editingPostData,
                [e.target.name]: e.target.value
            }
        })
    }

    retrievePost = async () => {

        await service.retrievePost(this.state.post_id)
        .then((res) => {
            console.log(`[${TAG}] Retrieve Post Success`);
            this.postData = res.data.postInfo;

            this.setState({
                likeInfo: res.data.likeInfo,
                postState: ContentStateEnum.READY,
                editingPostData: {
                    title: res.data.postInfo.title,
                    contents: res.data.postInfo.contents
                }
            })
        })
        .catch((err) => {
            console.error(err);
            this.setPostState(ContentStateEnum.ERROR);
        })
    }

    updatePost = async () => {

        await service.updatePost(this.state.post_id, this.state.editingPostData)
        .then((res) => {
            this.retrievePost();
        })
        .catch((err) => {
            console.error(err);
            alert('업데이트 오류');
        })
    }

    deletePost = async () => {

        let goDrop = window.confirm("정말로 삭제하시겠습니까? 삭제한 게시글은 다시 복원할 수 없습니다.");
        if(goDrop) {
            await service.deletePost(this.state.post_id)
            .then(() => {
                alert("게시글이 삭제되었습니다.");
                this.setPostState(ContentStateEnum.DELETED);
            })
            .catch((err) => {
                console.error(err);
                alert("삭제 실패");
            })
        }
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
        console.log(`[${TAG}] render..`);
        const { post_id, likeInfo, postState, editingPostData} = this.state;
        const { my_id } = this.props;

        return (
            <>
            {
                (() => {
                    if(postState === ContentStateEnum.LOADING) {
                        return <Loading/>;
                    }
                    else if(postState === ContentStateEnum.READY) {
                        return (
                            <PostComponent
                                postData={this.postData}
                                post_id={post_id}
                                my_id={my_id}
                                likeInfo={likeInfo}
                                likePost={this.likePost}
                                setPostState={this.setPostState}
                                deletePost={this.deletePost}/>
                        )
                    }
                    else if(postState === ContentStateEnum.EDITTING)
                        return (
                            <EditPost
                                editingPostData={editingPostData}
                                handleEditting={this.handleEditting}
                                setPostState={this.setPostState}
                                updatePost={this.updatePost}/>
                    )
                    else if(postState === ContentStateEnum.DELETED)
                        return (
                            <Redirect to={`/board/${this.postData.board_id}`} />
                        )
                    else {
                        return (
                            <div>ERROR PAGE</div>
                        )
                    }
                })()
            }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        my_id: state.authentication.user_id
    }
}

export default connect(mapStateToProps, null)(Post);