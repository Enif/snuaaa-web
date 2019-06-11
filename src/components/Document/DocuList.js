import React from 'react';
import { Link } from 'react-router-dom';
import Download from './Download'

const DocuList = ({documents}) => {

    const makeDocuList = () => {
        let docuList = documents.map(document => {
            let contentInfo = document.content;
            return (
                <div className="doculist-body" key={contentInfo.content_id}>
                    <div className="docu-generation">{document.generation}</div>
                    <div className="docu-category">{contentInfo.category_name}</div>
                    <div className="docu-memo">
                        <Link to={`/document/${contentInfo.content_id}`}>{contentInfo.title}</Link>
                    </div>
                    <div className="docu-download">{makeFileList(document)}</div>
                    <div className="docu-comments">
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
                    </div>
                </div>
            )
        })
        return docuList
    }

    const makeFileList = (document) => {
        let fileList = []
        let contentInfo = document.content;
        for(let i = 0; i < document.file_path.length; i++) {
            fileList.push(
            <Download object_id={contentInfo.content_id} index={i} key={contentInfo.content_id + '_' + i}>
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