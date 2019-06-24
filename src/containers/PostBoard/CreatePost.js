import React from 'react';
import * as service from 'services';
import CreatePostComponent from '../../components/Post/CreatePostComponent';

const TAG = 'CREATEPOST'
const MAX_SIZE = 20 * 1024 * 1024;

class CreatePost extends React.Component {

    constructor(props) {
        super(props);

        this.currentSize = 0;

        this.state = {
            title: '',
            text: '',
            attachedFiles: []
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

    attachFile = (e) => {
        const { attachedFiles } = this.state;
        if (e.target.files.length + attachedFiles.length > 3) {
            alert("파일은 최대 3개까지만 첨부해주세요.")
            e.target.value = null;
        }
        else if (e.target.files) {
            let tmpSize = this.currentSize;
            for (let i = 0; i < e.target.files.length; i++) {
                tmpSize += e.target.files[i].size;
            }
            if(tmpSize > MAX_SIZE) {
                alert("한 번에 20MB 이상의 파일은 업로드 할 수 없습니다.")
            }
            else {
                this.currentSize = tmpSize;
                this.setState({
                    attachedFiles: attachedFiles.concat(...e.target.files)
                })
            }
        }
    }

    removeAttachedFile = (index) => {
        const { attachedFiles } = this.state;
        this.setState({
            attachedFiles: attachedFiles.filter((file, i) => {
                return index !== i
            })
        })
    }

    createPost = async () => {
        console.log('[%s] postLogIn', TAG);
        const { title, text, attachedFiles } = this.state

        if (!title) {
            alert("제목을 입력해 주세요.");
        }
        else {
            const postInfo = new FormData();
            postInfo.append('title', title);
            postInfo.append('text', text);
            for (let i = 0, max = attachedFiles.length; i < max; i++) {
                postInfo.append('attachedFiles', attachedFiles[i]);
            }

            await service.createPost(this.props.board_id, postInfo)
                .then(() => {
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

        const { title, text, attachedFiles } = this.state;
        const { togglePopUp } = this.props;
        const { handleChange, handleEditor, createPost, attachFile, removeAttachedFile } = this;


        return (
            <CreatePostComponent
                title={title}
                text={text}
                attachedFiles={attachedFiles}
                handleChange={handleChange}
                handleEditor={handleEditor}
                togglePopUp={togglePopUp}
                createPost={createPost}
                attachFile={attachFile}
                removeAttachedFile={removeAttachedFile}
            />
            // <div className="writepost-wrapper">
            //     <div className="writepost-title">
            //         <input name="title" value={this.state.title} maxLength={32} onChange={this.handleChange} placeholder="제목을 입력하세요." />
            //     </div>
            //     <div className="writepost-content">
            //         <ReactQuill className="writepost-quill" value={this.state.text} onChange={this.handleEditor} modules={modules} formats={formats}/>
            //         {/* <textarea name="text" value={this.state.text} onChange={this.handleChange} placeholder="내용을 입력하세요" /> */}
            //     </div>
            //     {/* <div>
            //         <Editor editorState={this.state.editorState} onEditorStateChange={this.onEditorStateChange} wrapperClassName="editor-wrapper" toolbarClassName="editor-toolbar" editorClassName="editor-textarea"/>
            //     </div> */}
            //     <div className="btn-wrapper">
            //         <button className="enif-btn-common enif-btn-cancel" onClick={() => this.props.togglePopUp()}> 취소 </button>
            //         <button className="enif-btn-common enif-btn-ok" onClick={this.createPost}> 확인 </button>
            //     </div>
            // </div>
        )
    }
}

export default CreatePost;