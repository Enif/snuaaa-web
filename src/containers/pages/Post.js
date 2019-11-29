import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import ContentStateEnum from 'common/ContentStateEnum';
import Comment from 'containers/Comment';
import Loading from 'components/Common/Loading';
import PostComponent from 'components/Post/PostComponent';
import EditPost from 'components/Post/EditPost';
import history from 'common/history';
import BoardName from '../../components/Board/BoardName';
import PostService from 'services/PostService';
import ContentService from 'services/ContentService';

const TAG = 'POST'

class Post extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);

        this.postData = undefined;
        this.fileInfo = undefined;

        this.state = {
            post_id: this.props.match.params.post_id,
            likeInfo: false,
            postState: ContentStateEnum.LOADING,
            editingPostData: {
                title: '',
                text: ''
            }
        }
    }

    componentDidMount() {
        this.fetch();
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[%s] getDerivedStateFromProps', TAG);
        return {
            post_id: props.match.params.post_id
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

    handleEdittingText = (value) => {
        const { editingPostData } = this.state

        this.setState({
            editingPostData: {
                ...editingPostData,
                text: value
            }
        })
    }

    fetch = async () => {

        await PostService.retrievePost(this.state.post_id)
            .then((res) => {
                this.postData = res.data.postInfo;
                this.fileInfo = res.data.fileInfo;

                this.setState({
                    likeInfo: res.data.likeInfo,
                    postState: ContentStateEnum.READY,
                    editingPostData: {
                        title: res.data.postInfo.title,
                        text: res.data.postInfo.text
                    }
                })
            })
            .catch((err) => {
                console.error(err);
                if (err.response && err.response.data && err.response.data.code === 4001) {
                    alert("권한이 없습니다.")
                    history.goBack();
                }
                else {
                    this.setPostState(ContentStateEnum.ERROR);
                }
            })
    }

    updatePost = async () => {

        await PostService.updatePost(this.state.post_id, this.state.editingPostData)
            .then((res) => {
                this.fetch();
            })
            .catch((err) => {
                console.error(err);
                alert('업데이트 오류');
            })
    }

    deletePost = async () => {

        let goDrop = window.confirm("정말로 삭제하시겠습니까? 삭제한 게시글은 다시 복원할 수 없습니다.");
        if (goDrop) {
            await PostService.deletePost(this.state.post_id)
                .then(() => {
                    this.setPostState(ContentStateEnum.DELETED);
                })
                .catch((err) => {
                    console.error(err);
                    alert("삭제 실패");
                })
        }
    }

    likePost = async () => {
        await ContentService.likeContent(this.state.post_id)
            .then(() => {
                if (this.state.likeInfo) {
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
        const { post_id, likeInfo, postState, editingPostData } = this.state;
        const { my_id, my_level } = this.props;

        let boardData = this.postData && this.postData.board;

        return (
            <>
                {
                    (() => {
                        if (postState === ContentStateEnum.LOADING) {
                            return <Loading />;
                        }
                        else if (postState === ContentStateEnum.READY) {
                            return (
                                <>
                                    <BoardName
                                        board_id={boardData.board_id}
                                        board_name={boardData.board_name}
                                    />
                                    <PostComponent
                                        postData={this.postData}
                                        post_id={post_id}
                                        my_id={my_id}
                                        likeInfo={likeInfo}
                                        fileInfo={this.fileInfo}
                                        likePost={this.likePost}
                                        setPostState={this.setPostState}
                                        deletePost={this.deletePost} />
                                    {
                                        (my_level > 0) &&
                                        <Comment parent_id={this.postData.content_id} />
                                    }
                                </>

                            )
                        }
                        else if (postState === ContentStateEnum.EDITTING)
                            return (
                                <EditPost
                                    editingPostData={editingPostData}
                                    handleEditting={this.handleEditting}
                                    handleEdittingText={this.handleEdittingText}
                                    setPostState={this.setPostState}
                                    updatePost={this.updatePost} />
                            )
                        else if (postState === ContentStateEnum.DELETED)
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
        my_id: state.authentication.user_id,
        my_level: state.authentication.level
    }
}

export default connect(mapStateToProps, null)(Post);