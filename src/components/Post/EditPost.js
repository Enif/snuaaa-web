import React, { useState } from 'react';
// import { EditorState, ContentState } from 'draft-js';
// import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';

function EditPost({postData, editorState, onEditorStateChange, post_id, likeInfo, likePost, setisEditting}) {

    // const blocksFromHtml = htmlToDraft(postData.contents);
    // const { contentBlocks, entityMap } = blocksFromHtml;
    // const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

    // const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));

    return (
        <div className="writepost-wrapper">
            <div className="writepost-title">
                <input name="title" value={postData.title} onChange={this.handleChange} placeholder="제목" />
            </div>
            <div>
                <Editor editorState={editorState} onEditorStateChange={onEditorStateChange} wrapperClassName="editor-wrapper" toolbarClassName="editor-toolbar" editorClassName="editor-textarea"/>
            </div>
            <div className="btn-wrapper">
                <button className="enif-btn-common enif-btn-cancel" onClick={() => this.props.togglePopUp()}> 취소 </button>
                <button className="enif-btn-common enif-btn-ok" onClick={this.createPost}> 확인 </button>
            </div>
        </div>
    )
}

export default EditPost;