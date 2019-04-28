import React from 'react';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import * as service from '../../services';
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
            isShow: false,
            isEditting: false,
            editorState: null
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

    setisEditting = (isEditting) => {
        this.setState({
            isEditting: isEditting
        })
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    retrievePost = async () => {
        console.log('[%s] Retrieve Post', TAG);

        await service.retrievePost(this.state.post_id)
        .then((res) => {
            console.log('[%s] Retrieve Post Success', TAG);
            this.postData = res.data.postInfo;

            const blocksFromHtml = htmlToDraft(this.postData.contents);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);

            this.setState({
                likeInfo: res.data.likeInfo,
                isShow: true,
                editorState: editorState
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
        let { isShow, post_id, likeInfo, isEditting, editorState} = this.state;

        return (
            <>
            {
                isShow ?
                (
                    isEditting ?
                    (
                        <EditPost postData={this.postData} editorState={editorState} onEditorStateChange={this.onEditorStateChange}/>
                    )
                    :
                    (
                        <PostComponent postData={this.postData} editorState={editorState} post_id={post_id} likeInfo={likeInfo} likePost={this.likePost} setisEditting={this.setisEditting}/>
                    )
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