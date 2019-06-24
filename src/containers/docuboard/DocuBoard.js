import React from 'react';
import * as service from 'services';
import Loading from 'components/Common/Loading';
import SelectBox from 'components/Common/SelectBox';
import Paginator from 'components/Common/Paginator';
// import DocuMenu from 'components/Document/DocuMenu';
import DocuList from 'components/Document/DocuList';
import CreateDocu from 'containers/DocuBoard/CreateDocu';

const TAG = 'DOCUMENT'
const DOCROWNUM = 10;

class DocuBoard extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);
        this.documents = [];
        this.docCount = 0;
        this.state = {
            isDocuListReady: false,
            popUpState: false,
            category: null,
            generation: 0,
            pageIdx: 1,
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = async () => {
        this.setState({
            isDocuListReady: false
        })
        await service.retrieveDocuments(this.state.pageIdx, this.state.category, this.state.generation)
            .then((res) => {
                this.docCount = res.data.docCount;
                this.documents = res.data.docInfo;
                this.setState({
                    isDocuListReady: true
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }

    retrieveDocumentsByGeneration = async (generation) => {
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

    clickCategory = (ctg_id) => {
        this.setState({
            category: ctg_id
        },
            this.fetch
        )
    }

    clickAll = () => {
        this.setState({
            category: null
        },
            this.fetch
        )
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        },
            this.fetch
        )
    }

    clickPage = (idx) => {
        this.setState({
            pageIdx: idx
        },
            this.fetch
        )
    }

    render() {

        const { board_id, boardInfo, categories } = this.props;
        const { isDocuListReady, pageIdx } = this.state;

        const categoryOptions = categories.map((category) => {
            return {
                id: category.category_id,
                name: category.category_name
            }
        });
        const generationOptions = [];
        let currentGen = 2 * ((new Date()).getFullYear() - 1980)
        for (let i = currentGen; i > 0; i--) {
            generationOptions.push({
                id: i,
                name: i + '대'
            });
        }

        return (

            <div className="board-wrapper">
                <h2>{boardInfo.board_name}</h2>
                {/* <Category categories={categories} selected={category} clickCategory={this.clickCategory} clickAll={this.clickAll} /> */}
                <div className="doc-select-wrapper">
                    <SelectBox selectName="category" optionList={categoryOptions} onSelect={this.handleChange} />
                    <SelectBox selectName="generation" optionList={generationOptions} onSelect={this.handleChange} />
                </div>
                {this.docCount > 0 && <Paginator pageIdx={pageIdx} pageNum={Math.ceil(this.docCount / DOCROWNUM)} clickPage={this.clickPage} />}
                {/* <DocuMenu retrieveDocumentsByGeneration={this.retrieveDocumentsByGeneration} /> */}
                {(() => {
                    if (isDocuListReady) {
                        return (
                            <>
                                <DocuList documents={this.documents} />
                                <button className="enif-btn-circle enif-pos-sticky" onClick={() => this.togglePopUp()}>
                                    <i className="material-icons">note_add</i>
                                </button>
                                {
                                    this.state.popUpState && <CreateDocu board_id={board_id} fetch={this.fetch} categories={categories} togglePopUp={this.togglePopUp} />
                                }
                            </>
                        )
                    }
                    else {
                        return (
                            <Loading />
                        )
                    }
                })()}
            </div>
        )
    }
}

export default DocuBoard;