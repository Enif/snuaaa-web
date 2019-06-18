import React from 'react';
import ReactQuill from 'react-quill';
import * as service from 'services';

const TAG = 'CREATEPOST'

class CreatePost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            text: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleEditor = (value) => {
        this.setState({
            text: value
        })
    }

    createPost = async () => {
        console.log('[%s] postLogIn', TAG);


        if (!this.state.title) {
            alert("제목을 입력해 주세요.");
        }
        else {
            let postInfo = {
                title: this.state.title,
                text: this.state.text
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

        const modules = {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ],
        }

        const formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
        ]


        return (
            <div className="writepost-wrapper">
                <div className="writepost-title">
                    <input name="title" value={this.state.title} maxLength={32} onChange={this.handleChange} placeholder="제목을 입력하세요." />
                </div>
                <div className="writepost-content">
                    <ReactQuill className="writepost-quill" value={this.state.text} onChange={this.handleEditor} modules={modules} formats={formats}/>
                    {/* <textarea name="text" value={this.state.text} onChange={this.handleChange} placeholder="내용을 입력하세요" /> */}
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