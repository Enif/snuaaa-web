import React from 'react';
import { Link } from 'react-router-dom';
import DownloadFile from '../Post/DownloadFile';

const DocuList = ({ documents }) => {

    const makeDocuList = () => {
        let docuList = documents.map(doc => {
            let contentInfo = doc.content;
            let categoryInfo = doc.content.category;
            let attachedFileInfo = doc.content.AttachedFiles;
            return (
                <div className="doculist-body" key={contentInfo.content_id}>
                    <div className="docu-generation">{doc.generation}</div>
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

                            let fileTypeClass = '';
                            file.file_type === 'IMG' ? fileTypeClass = 'fa-file-image color-img'
                                : file.file_type === 'DOC' ? fileTypeClass = 'fa-file-word color-doc'
                                    : file.file_type === 'XLS' ? fileTypeClass = 'fa-file-excel color-xls'
                                        : file.file_type === 'PDF' ? fileTypeClass = 'fa-file-pdf color-pdf'
                                            : file.file_type === 'ZIP' ? fileTypeClass = 'fa-file-archive color-zip'
                                                : fileTypeClass = 'fa-file-alt';

                            return (
                                <DownloadFile key={file.file_id} content_id={file.parent_id} file_id={file.file_id}>
                                    <i className={`fas ${fileTypeClass} font-20 file-icon`}>
                                        <div className="file-name">{file.original_name}</div>
                                    </i>
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