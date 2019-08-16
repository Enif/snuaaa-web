import React from 'react';
import ContentStateEnum from 'common/ContentStateEnum';

function EditDocu({ editingDocData, handleEditting, setDocState, updateDoc }) {

    return (
        <div className="writepost-wrapper">
            <div className="writepost-header">
                <i className="material-icons pointer" onClick={() => setDocState(ContentStateEnum.READY)}>keyboard_backspace</i>
                <h5>글수정</h5>
            </div>
            <div className="writepost-title">
                <input name="title" value={editingDocData.title} onChange={(e) => handleEditting(e)} placeholder="제목" />
            </div>
            <div className="writepost-content">
                {/* <ReactQuill className="writepost-quill" value={editingPostData.text} onChange={handleEdittingText} modules={modules} formats={formats} /> */}
                <textarea name="text" value={editingDocData.text} onChange={(e) => handleEditting(e)} placeholder="내용을 입력하세요" />
            </div>
            <div className="btn-wrapper">
                <button className="enif-btn-common enif-btn-cancel" onClick={() => setDocState(ContentStateEnum.READY)}> 취소 </button>
                <button className="enif-btn-common enif-btn-ok" onClick={() => updateDoc()} > 확인 </button>
            </div>
        </div>
    )
}

export default EditDocu;