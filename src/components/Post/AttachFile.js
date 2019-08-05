import React from 'react';

function AttachFile({ files, attachFile, removeFile }) {

    const makeFileList = () => {
        if (files && files.length > 0) {
            return files.map((file, index) => {
                return (
                    <li key={index}>
                        <p>{file.name}</p>
                        <i className="material-icons pointer" onClick={() => removeFile(index)}>remove_circle_outline</i>
                    </li>)
            })
        }
    }

    const acceptFileList = ['.jpg', '.jpeg', '.png', '.docx', 'xlsx', 'pptx', '.hwp', '.zip']

    return (
        <div className="attach-file-wrapper">
            <div className="file-list">
                <ul>
                    {makeFileList()}
                </ul>
            </div>
            <label htmlFor="attach_file" >
                <div className="attach-btn-wrapper">
                    <i className="material-icons pointer">attach_file</i>
                    파일첨부
                </div>
            </label>
            <input type="file" multiple accept={acceptFileList} id="attach_file" onChange={attachFile} />
        </div>
    )
}

export default AttachFile;