import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as service from '../../services';

const TAG = 'CREATEPOST'

class CreatePost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            contents: '',
            editorState: EditorState.createEmpty()
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    createPost = async () => {
        console.log('[%s] postLogIn', TAG);
        let contents = this.state.editorState.getCurrentContent();

        let postInfo = {
            title: this.state.title,
            // contents: this.state.contents
            contents: draftToHtml(convertToRaw(contents))
        }

        await service.createPost(this.props.board_id, postInfo)
        .then((res) => {
            console.log('[%s] Save Post Success', TAG)
            this.props.retrievePosts();
            this.props.togglePopUp();
        })
        .catch((res) => {
            console.log('[%s] Save Post Fail', TAG)
            alert("게시글 저장에 실패했습니다.");
        })
    }

    onEditorStateChange = (editorState) => {

        this.setState({
            editorState
        })
    }

    render() {
        return (
            <div className="writepost-wrapper">
                <div className="writepost-title">
                    <input name="title" value={this.state.title} onChange={this.handleChange} placeholder="제목" />
                </div>
{/*                 <div className="writepost-content">
                    <textarea name="contents" value={this.state.contents} onChange={this.handleChange} />
                </div> */}
                <div>
                    <Editor editorState={this.state.editorState} onEditorStateChange={this.onEditorStateChange} wrapperClassName="editor-wrapper" toolbarClassName="editor-toolbar" editorClassName="editor-textarea"/>
                </div>
                <div className="btn-wrapper">
                    <button className="enif-btn-common enif-btn-cancel" onClick={() => this.props.togglePopUp()}> 취소 </button>
                    <button className="enif-btn-common enif-btn-ok" onClick={this.createPost}> 확인 </button>
                </div>
            </div>
        )
    }
}

export default CreatePost;