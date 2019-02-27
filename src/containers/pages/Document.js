import React from 'react';
import * as service from '../../services';
import Loading from '../../components/Common/Loading';
import DocuMenu from '../../components/Document/DocuMenu';
import DocuList from '../../components/Document/DocuList';
import CreateDocu from '../../components/Document/CreateDocu';

const TAG = 'DOCUMENT'

class Document extends React.Component {

    constructor(props) {
        super(props);
        this.documents = [];
        this.state = {
            isDocuListReady: false,
            popUpState: false
        }
        this.retrieveDocuments();
    }

    retrieveDocuments = async() => {
        this.setState({
            isDocuListReady: false
        })
        await service.retrieveDocuments()
        .then((res) => {
            this.documents = res.data;
            this.setState({
                isDocuListReady: true
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }

    retrieveDocumentsByGeneration = async(generation) => {
        this.setState({
            isDocuListReady: false
        })
        await service.retrieveDocumentsByGeneration(generation)
        .then((res) => {
            this.documents = res.data;
            this.setState({
                isDocuListReady: true
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    render() {
        let { isDocuListReady } = this.state
        return(
            <>
                <h2>문서게시판</h2>
                <DocuMenu retrieveDocumentsByGeneration={this.retrieveDocumentsByGeneration} />
                {(() => {
                    if(isDocuListReady) {
                        return(
                            <>
                                <DocuList documents={this.documents} />
                                <button className="enif-btn-circle" onClick={() => this.togglePopUp()}>+</button>
                                {
                                    this.state.popUpState && <CreateDocu retrieveDocuments={this.retrieveDocuments} togglePopUp={this.togglePopUp} />
                                }
                            </>           
                        )
                    }
                    else {
                        return(
                            <Loading />
                        )
                    }
                })()}
            </>
        )
    }
}

export default Document;