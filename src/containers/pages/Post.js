import React from 'react';
import { Redirect } from 'react-router'
import * as service from '../../services';
import PostStateEnum from '../../common/PostStateEnum';
import Loading from '../../components/Common/Loading';
import PostComponent from '../../components/Post/PostComponent';
import EditPost from '../../components/Post/EditPost';

const TAG = 'POST'

class Post extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);

        this.postData = undefined;

        this.state = {
            post_id: this.props.match.params.pNo,
            likeInfo: false,
            // isShow: false,
            // isEditting: false,
            postState: PostStateEnum.LOADING,
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
                postState: PostStateEnum.READY,
                editingPostData: {
                    title: res.data.postInfo.title,
                    contents: res.data.postInfo.contents
                }
            })
        })
        .catch((err) => {
            console.error(err);
            this.setPostState(PostStateEnum.ERROR);
        })
    }

    updatePost = async () => {

        await service.updatePost(this.state.post_id, this.state.editingPostData)
        .then((res) => {
            this.setisEditting(false);
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
                this.setPostState(PostStateEnum.DELETED);
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
        console.log('[%s] render', TAG)
        let { post_id, likeInfo, postState, editingPostData} = this.state;

        return (
            <>
            {
                (() => {
                    if(postState === PostStateEnum.LOADING) {
                        return <Loading/>;
                    }
                    else if(postState === PostStateEnum.READY) {
                        return (
                            <PostComponent
                                postData={this.postData}
                                post_id={post_id}
                                likeInfo={likeInfo}
                                likePost={this.likePost}
                                setPostState={this.setPostState}
                                deletePost={this.deletePost}/>
                        )
                    }
                    else if(postState === PostStateEnum.EDITTING)
                        return (
                            <EditPost
                                editingPostData={editingPostData}
                                handleEditting={this.handleEditting}
                                setPostState={this.setPostState}
                                updatePost={this.updatePost}/>
                    )
                    else if(postState === PostStateEnum.DELETED)
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

export default Post;