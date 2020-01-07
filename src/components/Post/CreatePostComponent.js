import React from 'react';
import { Prompt } from 'react-router';
import AttachFile from './AttachFile';
import Editor from '../../containers/Common/Editor';

function CreatePostComponent({ title, text, attachedFiles, handleChange, handleEditor, close, createPost, attachFile, removeAttachedFile }) {

    return (
        <>
            <Prompt when={true} message="글 작성을 취소하시겠습니까?"></Prompt>
            <div className="writepost-wrapper">
                <div className="writepost-header">
                    <i className="ri-arrow-left-line enif-pointer" onClick={close}></i>
                    <h5>글쓰기</h5>
                </div>
                <div className="writepost-title">
                    <input name="title" value={title} maxLength={50} onChange={(e) => handleChange(e)} placeholder="제목을 입력하세요." />
                </div>
                <div className="writepost-content">
                    <Editor text={text} editText={handleEditor} />
                </div>
                <div className="writepost-file">
                    <AttachFile files={attachedFiles} attachFile={attachFile} removeFile={removeAttachedFile} />
                </div>
                <div className="btn-wrapper">
                    <button className="enif-btn-common enif-btn-cancel" onClick={close}> 취소 </button>
                    <button className="enif-btn-common enif-btn-ok" onClick={createPost}> 확인 </button>
                </div>
            </div>
        </>
    )
}

export default CreatePostComponent;