import React from 'react';
import { downloadDocument } from '../../services';
import Download from './Download'
import { ReactComponent as Logo} from '../../assets/img/outline-attachment-24px.svg'

const TAG = 'DOCULIST'

class DocuList extends React.Component {

    constructor(props) {
        super(props);
    }


    retrieveDocuments = () => {
        let documents = this.props.documents;
        let docuList = documents.map(document => {
            return (
                <div className="doculist-body" key={document.object_id}>
                    <div className="docu-generation">{document.generation}</div>
                    <div className="docu-category">기타문서</div>
                    <div className="docu-memo">{document.title}</div>
                    <div className="docu-download">{this.retrieveFileList(document)}</div>
                    <div className="docu-comments">2</div>
                </div>
            )
        })
        return docuList
    }
    
    retrieveFileList = (document) => {
        let fileList = []
        for(let i = 0; i < document.file_path.length; i++) {
            fileList.push(<Download object_id={document.object_id} index={i}><Logo /></Download>)
        }
        return fileList;
    }


    render() {
        console.log('[%s] render', TAG)
        return (
                <div className="doculist-wrapper">
                    <div className="doculist-head">
                        <div className="docu-generation">회기</div>
                        <div className="docu-category">항목</div>
                        <div className="docu-memo">메모</div>
                        <div className="docu-download">다운로드</div>
                        <div className="docu-comments">댓글</div>
                    </div>
                    {this.retrieveDocuments()}
                </div>
            ) 
    }
}

export default DocuList;