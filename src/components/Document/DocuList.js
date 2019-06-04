import React from 'react';
import { Link } from 'react-router-dom';
import Download from './Download'

const DocuList = ({documents}) => {

    const makeDocuList = () => {
        let docuList = documents.map(document => {
            return (
                <div className="doculist-body" key={document.object_id}>
                    <div className="docu-generation">{document.generation}</div>
                    <div className="docu-category">{document.category_name}</div>
                    <div className="docu-memo">
                        <Link to={`/document/${document.object_id}`}>{document.title}</Link>
                    </div>
                    <div className="docu-download">{makeFileList(document)}</div>
                    <div className="docu-comments">
                        <div className="post-comment-num">
                            <span className="color-pink">
                                <i className="material-icons md-18">favorite</i>
                                {document.like_num}
                            </span>
                            <span className="color-gray1">
                                <i className="material-icons md-18 md-dark">comment</i>
                                {document.comment_num}
                            </span>                        
                        </div>
                    </div>
                </div>
            )
        })
        return docuList
    }

    const makeFileList = (document) => {
        let fileList = []
        for(let i = 0; i < document.file_path.length; i++) {
            fileList.push(
            <Download object_id={document.object_id} index={i} key={document.object_id + '_' + i}>
                <i className="material-icons">insert_drive_file</i>
            </Download>)
        }
        return fileList;
    }

    return (
        <div className="doculist-wrapper">
            <div className="doculist-head">
                <div className="docu-generation">회기</div>
                <div className="docu-category">항목</div>
                <div className="docu-memo">제목</div>
                <div className="docu-download">다운로드</div>
                <div className="docu-comments">댓글</div>
            </div>
            {makeDocuList()}
        </div>
    )
}

export default DocuList;