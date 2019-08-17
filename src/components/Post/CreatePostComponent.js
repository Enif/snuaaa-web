import React from 'react';
import { Prompt } from 'react-router';
import ReactQuill from 'react-quill';
import AttachFile from './AttachFile';


function CreatePostComponent({ title, text, attachedFiles, handleChange, handleEditor, close, createPost, attachFile, removeAttachedFile }) {

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
        <>
            <Prompt when={true} message="글 작성을 취소하시겠습니까?"></Prompt>
            <div className="writepost-wrapper">
                <div className="writepost-header">
                    <i className="material-icons pointer" onClick={close}>keyboard_backspace</i>
                    <h5>글쓰기</h5>
                </div>
                <div className="writepost-title">
                    <input name="title" value={title} maxLength={32} onChange={(e) => handleChange(e)} placeholder="제목을 입력하세요." />
                </div>
                <div className="writepost-content">
                    <ReactQuill className="writepost-quill" value={text} onChange={handleEditor} modules={modules} formats={formats} />
                </div>
                <AttachFile files={attachedFiles} attachFile={attachFile} removeFile={removeAttachedFile} />
                <div className="btn-wrapper">
                    <button className="enif-btn-common enif-btn-cancel" onClick={close}> 취소 </button>
                    <button className="enif-btn-common enif-btn-ok" onClick={createPost}> 확인 </button>
                </div>
            </div>
        </>
    )
}

export default CreatePostComponent;