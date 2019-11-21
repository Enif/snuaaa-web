import React from 'react';

function AttachFile({ files, attachFile, removeFile }) {

    const makeFileList = () => {
        if (files && files.length > 0) {
            return files.map((file, index) => {
                return (
                    <li key={index}>
                        <p>{file.name}</p>
                        <i className="ri-close-circle-line ri-icons enif-pointer" onClick={() => removeFile(index)}></i>
                    </li>)
            })
        }
    }

    const acceptFileList = [
        '.jpg', '.jpeg', '.png',
        '.docx', '.doc',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.xlsx', '.xls',
        '.pptx', '.ppt',
        '.pdf',
        '.hwp',
        '.zip', '.txt'
    ];


    return (
        <div className="attach-file-wrapper">
            <div className="file-list">
                <ul>
                    {makeFileList()}
                </ul>
            </div>
            <label htmlFor="attach_file" >
                <div className="attach-btn-wrapper">
                    <i className="ri-upload-2-fill enif-pointer"></i>&nbsp;
                    파일첨부
                </div>
            </label>
            <input type="file" multiple accept={acceptFileList} id="attach_file" onChange={attachFile} />
        </div>
    )
}

export default AttachFile;