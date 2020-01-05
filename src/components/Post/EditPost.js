import React from 'react';
import ContentStateEnum from 'common/ContentStateEnum';
import Editor from '../../containers/Common/Editor';

function EditPost({ editingPostData, handleEditting, handleEdittingText, setPostState, updatePost }) {
    return (
        <div className="writepost-wrapper">
            <div className="writepost-header">
                <i className="ri-arrow-left-line enif-pointer" onClick={() => setPostState(ContentStateEnum.READY)}></i>
                <h5>글수정</h5>
            </div>
            <div className="writepost-title">
                <input name="title" value={editingPostData.title} onChange={(e) => handleEditting(e)} placeholder="제목" />
            </div>
            <div className="writepost-content">
                <Editor text={editingPostData.text} editText={handleEdittingText} />
            </div>
            <div className="btn-wrapper">
                <button className="enif-btn-common enif-btn-cancel" onClick={() => setPostState(ContentStateEnum.READY)}> 취소 </button>
                <button className="enif-btn-common enif-btn-ok" onClick={() => updatePost()} > 확인 </button>
            </div>
        </div>
    )
}

export default EditPost;
