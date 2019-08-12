import React from 'react';
import ReactQuill from 'react-quill';
import ContentStateEnum from 'common/ContentStateEnum';

function EditPost({ editingPostData, handleEditting, handleEdittingText, setPostState, updatePost }) {

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
            <div className="writepost-header">
                <i className="material-icons pointer" onClick={() => setPostState(ContentStateEnum.READY)}>keyboard_backspace</i>
                <h5>글수정</h5>
            </div>
            <div className="writepost-title">
                <input name="title" value={editingPostData.title} onChange={(e) => handleEditting(e)} placeholder="제목" />
            </div>
            <div className="writepost-content">
                <ReactQuill className="writepost-quill" value={editingPostData.text} onChange={handleEdittingText} modules={modules} formats={formats} />
                {/* <textarea name="text" value={editingPostData.text} onChange={(e) => handleEditting(e)} placeholder="내용을 입력하세요" /> */}
            </div>
            <div className="btn-wrapper">
                <button className="enif-btn-common enif-btn-cancel" onClick={() => setPostState(ContentStateEnum.READY)}> 취소 </button>
                <button className="enif-btn-common enif-btn-ok" onClick={() => updatePost()} > 확인 </button>
            </div>
        </div>
    )
}

export default EditPost;