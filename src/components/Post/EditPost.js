import React from 'react';
import ContentStateEnum from '../../common/ContentStateEnum';

function EditPost({editingPostData, handleEditting, setPostState, updatePost}) {

    return (
        <div className="writepost-wrapper">
            <div className="writepost-title">
                <input name="title" value={editingPostData.title} onChange={(e) => handleEditting(e)} placeholder="제목" />
            </div>
            <div className="writepost-content">
                <textarea name="contents" value={editingPostData.contents} onChange={(e) => handleEditting(e)} placeholder="내용을 입력하세요" />
            </div>
            <div className="btn-wrapper">
                <button className="enif-btn-common enif-btn-cancel" onClick={() => setPostState(ContentStateEnum.READY)}> 취소 </button>
                <button className="enif-btn-common enif-btn-ok" onClick={() => updatePost()} > 확인 </button>
            </div>
        </div>
    )
}

export default EditPost;