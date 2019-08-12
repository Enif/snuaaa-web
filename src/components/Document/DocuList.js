import React from 'react';
import { Link } from 'react-router-dom';
import Download from './Download'
import DownloadFile from '../Post/DownloadFile';

const DocuList = ({ documents }) => {

    const makeDocuList = () => {
        let docuList = documents.map(document => {
            let contentInfo = document.content;
            let categoryInfo = document.content.category;
            let attachedFileInfo = document.content.AttachedFiles;
            return (
                <div className="doculist-body" key={contentInfo.content_id}>
                    <div className="docu-generation">{document.generation}</div>
                    <div className="docu-category">{categoryInfo && categoryInfo.category_name}</div>
                    <div className="docu-memo">
                        <Link to={`/document/${contentInfo.content_id}`}>{contentInfo.title}</Link>
                    </div>
                    <div className="docu-download">{makeFileList(attachedFileInfo)}</div>
                    {/* <div className="docu-comments">
                        <div className="post-comment-num">
                            <span className="color-pink">
                                <i className="material-icons md-18">favorite</i>
                                {contentInfo.like_num}
                            </span>
                            <span className="color-gray1">
                                <i className="material-icons md-18 md-dark">comment</i>
                                {contentInfo.comment_num}
                            </span>
                        </div>
                    </div> */}
                </div>
            )
        })
        return docuList
    }

    const makeFileList = (files) => {

        if (files && files.length > 0) {
            return (
                <>
                    {
                        files.map((file) => {
                            return (
                                <DownloadFile content_id={file.parent_id} file_id={file.file_id}>
                                    {/* <i className="material-icons">insert_drive_file</i> */}
                                    {(() => {
                                        if (file.file_type === 'IMG') {
                                            return (
                                                <i className="fas fa-file-image font-20 file-icon color-img">
                                                    <div className="file-name">{file.original_name}</div>
                                                </i>
                                            )
                                        }
                                        else if (file.file_type === 'DOC') {
                                            return (
                                                <i className="fas fa-file-word font-20 file-icon color-doc">
                                                    <div className="file-name">{file.original_name}</div>
                                                </i>
                                            )
                                        }
                                        else if (file.file_type === 'XLS') {
                                            return (
                                                <i className="fas fa-file-excel font-20 file-icon color-xls">
                                                    <div className="file-name">{file.original_name}</div>
                                                </i>
                                            )
                                        }
                                        else if (file.file_type === 'PDF') {
                                            return (
                                                <i className="fas fa-file-pdf font-20 file-icon color-pdf">
                                                    <div className="file-name">{file.original_name}</div>
                                                </i>
                                            )
                                        }
                                        else if (file.file_type === 'ZIP') {
                                            return (
                                                <i className="fas fa-file-archive font-20 file-icon color-zip">
                                                    <div className="file-name">{file.original_name}</div>
                                                </i>
                                            )
                                        }
                                        else {
                                            return (
                                                <i className="fas fa-file-alt font-20 file-icon">
                                                    <div className="file-name">{file.original_name}</div>
                                                </i>
                                            )
                                        }
                                    })()}

                                    {/* {file.original_name} */}
                                </DownloadFile>
                            )
                        })
                    }
                </>
            )
        }

        // let fileList = []
        // let contentInfo = document.content;
        // for (let i = 0; i < document.file_path.length; i++) {
        //     fileList.push(
        //         <Download content_id={contentInfo.content_id} index={i} key={contentInfo.content_id + '_' + i}>
        //             <i className="material-icons">insert_drive_file</i>
        //         </Download>)
        // }
        // return fileList;
    }

    return (
        <div className="doculist-wrapper">
            <div className="doculist-head">
                <div className="docu-generation">회기</div>
                <div className="docu-category">항목</div>
                <div className="docu-memo">제목</div>
                <div className="docu-download">다운로드</div>
                {/* <div className="docu-comments">댓글</div> */}
            </div>
            {makeDocuList()}
        </div>
    )
}

export default DocuList;