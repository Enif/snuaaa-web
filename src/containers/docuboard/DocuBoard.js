import React from 'react';
import * as service from 'services';
import Loading from 'components/Common/Loading';
import SelectBox from 'components/Common/SelectBox';
import Paginator from 'components/Common/Paginator';
import DocuList from 'components/Document/DocuList';
import CreateDocu from 'containers/DocuBoard/CreateDocu';
import BoardStateEnum from 'common/BoardStateEnum';
import history from 'common/history';

const TAG = 'DOCUBOARD'
const DOCROWNUM = 10;

class DocuBoard extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);
        this.documents = [];
        this.docCount = 0;
        const hisState = history.location.state;
        this.state = {
            boardState: BoardStateEnum.LOADING,
            // isDocuListReady: false,
            // popUpState: false,
            category: (hisState && hisState.category) ? hisState.category : null,
            generation: (hisState && hisState.generation) ? hisState.generation : 0,
            pageIdx: (hisState && hisState.page) ? hisState.page : 1,
        }
    }

    componentDidMount() {
        const { category, generation, pageIdx } = this.state;
        this.fetch(category, generation, pageIdx);
    }

    static getDerivedStateFromProps(props, state) {
        console.log(`[${TAG}] getDerivedStateFromProps`);
        const hisState = history.location.state;
        return {
            category: (hisState && hisState.category) ? hisState.category : null,
            generation: (hisState && hisState.generation) ? hisState.generation : 0,
            pageIdx: (hisState && hisState.page) ? hisState.page : 1
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`[${TAG}] shouldComponentUpdate`);
        if (this.state.category !== nextState.category ||
            this.state.generation !== nextState.generation ||
            this.state.pageIdx !== nextState.pageIdx) {
            this.fetch(nextState.category, nextState.generation, nextState.pageIdx);
            return false;
        }
        return true
    }

    setBoardState = (state) => {
        this.setState({
            boardState: state
        })
    }

    fetch = async (category, generation, pageIdx) => {
        // if(!category) category = this.state.category;
        // if(!generation) generation = this.state.generation;
        if(!pageIdx) pageIdx = this.state.pageIdx;

        this.setBoardState(BoardStateEnum.LOADING);
        await service.retrieveDocuments(pageIdx, category, generation)
            .then((res) => {
                this.docCount = res.data.docCount;
                this.documents = res.data.docInfo;
                this.setBoardState(BoardStateEnum.READY);
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
        history.push({
            state: {
                category: ctg_id,
                page: 1
            }
        })
    }

    clickAll = () => {
        history.push({
            state: {
                category: '',
                page: 1
            }
        })
    }

    handleChange = (e) => {
        console.log(e.target.name)
        const { category, generation } = this.state;
        if(e.target.name === 'category') {
            history.push({
                state: {
                    category: e.target.value,
                    generation: generation,
                    page: 1
                }
            })            
        }
        if(e.target.name === 'generation') {
            history.push({
                state: {
                    category: category,
                    generation: e.target.value,
                    page: 1
                }
            })            
        }
    }

    clickPage = (idx) => {
        const { category, generation } = this.state;
        history.push({
            state: {
                category: category,
                generation: generation,
                page: idx
            }
        })
    }

    render() {
        console.log('[%s] render', TAG);
        const { board_id, boardInfo, categories } = this.props;
        const { pageIdx, boardState } = this.state;

        const categoryOptions = categories.map((category) => {
            return {
                id: category.category_id,
                name: category.category_name
            }
        });

        const generationOptions = [];
        let currentGen = 2 * ((new Date()).getFullYear() - 1980);
        if ((new Date()).getMonth() > 5) currentGen++;

        for (let i = currentGen; i > 0; i--) {
            generationOptions.push({
                id: i,
                name: i + '대'
            });
        }

        return (
            <div className="board-wrapper">
                <h2>{boardInfo.board_name}</h2>
                <div className="doc-select-wrapper">
                    <SelectBox selectName="category" optionList={categoryOptions} onSelect={this.handleChange} selectedOption={this.state.category}/>
                    <SelectBox selectName="generation" optionList={generationOptions} onSelect={this.handleChange} selectedOption={this.state.generation}/>
                </div>
                {this.docCount > 0 && <Paginator pageIdx={pageIdx} pageNum={Math.ceil(this.docCount / DOCROWNUM)} clickPage={this.clickPage} />}

                {(() => {
                    if (boardState === BoardStateEnum.LOADING) {
                        return <Loading />
                    }
                    else if (boardState === BoardStateEnum.READY || boardState === BoardStateEnum.WRITING) {
                        return (
                            <>
                                <DocuList documents={this.documents} />
                                <button className="enif-btn-circle enif-pos-sticky" onClick={() => this.setBoardState(BoardStateEnum.WRITING)}>
                                    <i className="material-icons">note_add</i>
                                </button>
                                {
                                    boardState === BoardStateEnum.WRITING &&
                                    <CreateDocu board_id={board_id} fetch={this.fetch} categories={categories} close={() => this.setBoardState(BoardStateEnum.READY)} />
                                }
                            </>
                        )
                    }
                    else {
                        return (
                            <div>ERROR PAGE</div>
                        )
                    }
                })()}
            </div>
        )
    }
}

export default DocuBoard;