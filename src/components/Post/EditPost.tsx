import React, { ChangeEvent } from 'react';
import Editor from '../../containers/Common/Editor';
import ContentType from '../../types/ContentType';
import AttachFile from './AttachFile';

type EditPostProps = {
    postInfo: ContentType;
    isBtnDisabled: boolean;
    handleEditting: (e: ChangeEvent<HTMLInputElement>) => void;
    handleEdittingText: (text: string) => void;
    attachedFiles: File[];
    attachFile: (e: ChangeEvent<HTMLInputElement>) => void;
    removeAttachedFile: (index: number) => void;
    cancel: () => void;
    confirm: () => void;
}

function EditPost(props: EditPostProps) {

    return (
        <div className="writepost-wrapper">
            <div className="writepost-header">
                <i className="ri-arrow-left-line enif-pointer" onClick={props.cancel}></i>
                <h5>글수정</h5>
            </div>
            <div className="writepost-title">
                <input name="title" value={props.postInfo.title} onChange={props.handleEditting} placeholder="제목" />
            </div>
            <div className="writepost-content">
                <Editor text={props.postInfo.text} editText={props.handleEdittingText} />
            </div>
            <div className="writepost-file">
                <AttachFile
                    existedFiles={props.postInfo.attachedFiles}
                    files={props.attachedFiles}
                    attachFile={props.attachFile}
                    removeFile={props.removeAttachedFile} />
            </div>
            <div className="btn-wrapper">
                <button className="enif-btn-common enif-btn-cancel" onClick={props.cancel}> 취소 </button>
                <button className="enif-btn-common enif-btn-ok" disabled={props.isBtnDisabled} onClick={props.confirm} > 확인 </button>
            </div>
        </div>
    )
}

export default EditPost;
