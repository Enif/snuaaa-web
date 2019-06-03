import React from 'react';
import * as service from 'services';

const TAG = 'CREATEPOST'

class CreatePost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            contents: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    createPost = async () => {
        console.log('[%s] postLogIn', TAG);


        if (!this.state.title) {
            alert("제목을 입력해 주세요.");
        }
        else {
            let postInfo = {
                title: this.state.title,
                contents: this.state.contents
            }

            await service.createPost(this.props.board_id, postInfo)
                .then((res) => {
                    console.log('[%s] Save Post Success', TAG)
                    this.props.retrievePosts();
                    this.props.togglePopUp();
                })
                .catch((err) => {
                    console.error(err);
                    alert("게시글 저장에 실패했습니다.");
                })
        }
    }

    render() {
        return (
            <div className="writepost-wrapper">
                <div className="writepost-title">
                    <input name="title" value={this.state.title} onChange={this.handleChange} placeholder="제목을 입력하세요." />
                </div>
                <div className="writepost-content">
                    <textarea name="contents" value={this.state.contents} onChange={this.handleChange} placeholder="내용을 입력하세요" />
                </div>
                {/* <div>
                    <Editor editorState={this.state.editorState} onEditorStateChange={this.onEditorStateChange} wrapperClassName="editor-wrapper" toolbarClassName="editor-toolbar" editorClassName="editor-textarea"/>
                </div> */}
                <div className="btn-wrapper">
                    <button className="enif-btn-common enif-btn-cancel" onClick={() => this.props.togglePopUp()}> 취소 </button>
                    <button className="enif-btn-common enif-btn-ok" onClick={this.createPost}> 확인 </button>
                </div>
            </div>
        )
    }
}

export default CreatePost;