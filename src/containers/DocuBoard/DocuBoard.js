import React from 'react';
import { connect } from 'react-redux';

import * as service from 'services';
import Loading from 'components/Common/Loading';
import SelectBox from 'components/Common/SelectBox';
import Paginator from 'components/Common/Paginator';
import DocuList from 'components/Document/DocuList';
import CreateDocu from 'containers/DocuBoard/CreateDocu';
import BoardStateEnum from 'common/BoardStateEnum';
import history from 'common/history';
import BoardName from '../../components/Board/BoardName';

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
            category: (hisState && hisState.category) ? hisState.category : '',
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
            category: (hisState && hisState.category) ? hisState.category : '',
            generation: (hisState && hisState.generation) ? hisState.generation : 0,
            pageIdx: (hisState && hisState.page) ? hisState.page : 1
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`[${TAG}] shouldComponentUpdate`);
        console.log(this.state);
        console.log(nextState);
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
        if (!pageIdx) pageIdx = this.state.pageIdx;

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
        const { category, generation } = this.state;
        if (e.target.name === 'category') {
            history.push({
                state: {
                    category: e.target.value,
                    generation: generation,
                    page: 1
                }
            })
        }
        if (e.target.name === 'generation') {
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
        const { board_id, boardInfo, categories, level } = this.props;
        const { pageIdx, boardState } = this.state;

        const categoryOptions = categories.map((category) => {
            return {
                id: category.category_id,
                name: category.category_name
            }
        });

        const generationOptions = [];
        const today = new Date();
        let currentGen = 2 * (today.getFullYear() - 1980);
        if (today.getMonth() > 5) currentGen++;

        for (let i = currentGen; i > 0; i--) {
            generationOptions.push({
                id: i,
                name: i + '대'
            });
        }

        return (
            <div className="board-wrapper">
                <BoardName board_id={boardInfo.board_id} board_name={boardInfo.board_name} />
                {/* <div className="docboard-top-menu-wrapper"> */}
                <div className="board-search-wrapper">
                    <div className="doc-select-wrapper">
                        <SelectBox selectName="category" optionList={categoryOptions} onSelect={this.handleChange} selectedOption={this.state.category} />
                        <SelectBox selectName="generation" optionList={generationOptions} onSelect={this.handleChange} selectedOption={this.state.generation} />
                    </div>
                    {
                        level >= boardInfo.lv_write &&
                        <button className="board-btn-write" onClick={() => this.setBoardState(BoardStateEnum.WRITING)}>
                            <i className="ri-file-add-line enif-f-1p2x"></i>문서생성
                            </button>
                    }
                </div>
                {/* </div> */}
                {(() => {
                    if (boardState === BoardStateEnum.LOADING) {
                        return <Loading />
                    }
                    else if (boardState === BoardStateEnum.READY || boardState === BoardStateEnum.WRITING) {
                        return (
                            <>
                                <DocuList documents={this.documents} />
                                {this.docCount > 0 && <Paginator pageIdx={pageIdx} pageNum={Math.ceil(this.docCount / DOCROWNUM)} clickPage={this.clickPage} />}
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

const mapStateToProps = (state) => {
    return {
        level: state.authentication.level,
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(DocuBoard);