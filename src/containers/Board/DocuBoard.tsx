import React, { ChangeEvent } from 'react';
import { Location } from 'history';

import Loading from '../../components/Common/Loading';
import SelectBox from '../../components/Common/SelectBox';
import Paginator from '../../components/Common/Paginator';
import DocuList from '../../components/Document/DocuList';
import CreateDocu from '../DocuBoard/CreateDocu';
import BoardStateEnum from '../../common/BoardStateEnum';
import history from '../../common/history';
import BoardName from '../../components/Board/BoardName';
import DocuService from '../../services/DocuService';
import BoardType from '../../types/BoardType';
import ContentType from '../../types/ContentType';
import AuthContext from '../../contexts/AuthContext';

const TAG = 'DOCUBOARD'
const DOCROWNUM = 10;

type DocuBoardProps = {
    boardInfo: BoardType;
    location: Location;
}

type DocuBoardState = {
    boardState: number
}

class DocuBoard extends React.Component<DocuBoardProps, DocuBoardState> {

    documents: ContentType[];
    docCount: number;

    constructor(props: DocuBoardProps) {
        super(props);
        console.info('[%s] constructor', TAG);
        this.documents = [];
        this.docCount = 0;
        // const hisState = history.location.state;

        this.state = {
            boardState: BoardStateEnum.LOADING,

            // category: (hisState && hisState.category) ? hisState.category : '',
            // generation: (hisState && hisState.generation) ? hisState.generation : 0,
            // pageIdx: (hisState && hisState.page) ? hisState.page : 1,
        }
    }

    componentDidMount() {
        // const { category, generation, pageIdx } = this.state;
        // this.fetch(category, generation, pageIdx);
        this.fetch();
    }

    componentDidUpdate(prevProps: DocuBoardProps) {
        if (prevProps.location.state !== this.props.location.state) {
            this.fetch();
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log(`[${TAG}] getDerivedStateFromProps`);
    //     const hisState = history.location.state;
    //     return {
    //         category: (hisState && hisState.category) ? hisState.category : '',
    //         generation: (hisState && hisState.generation) ? hisState.generation : 0,
    //         pageIdx: (hisState && hisState.page) ? hisState.page : 1
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(`[${TAG}] shouldComponentUpdate`);
    //     console.log(this.state);
    //     console.log(nextState);
    //     if (this.state.category !== nextState.category ||
    //         this.state.generation !== nextState.generation ||
    //         this.state.pageIdx !== nextState.pageIdx) {
    //         this.fetch(nextState.category, nextState.generation, nextState.pageIdx);
    //         return false;
    //     }
    //     return true
    // }

    setBoardState = (state: number) => {
        this.setState({
            boardState: state
        })
    }

    fetch = async () => {
        // if(!category) category = this.state.category;
        // if(!generation) generation = this.state.generation;
        const { location } = this.props;
        let category = (location.state && location.state.category) ? location.state.category : '';
        let generation = (location.state && location.state.generation) ? location.state.generation : 0;
        let pageIdx = (location.state && location.state.page) ? location.state.page : 1;
        // if (!pageIdx) pageIdx = this.state.pageIdx;

        this.setBoardState(BoardStateEnum.LOADING);
        await DocuService.retrieveDocuments(pageIdx, category, generation)
            .then((res) => {
                this.docCount = res.data.docCount;
                this.documents = res.data.docInfo;
                this.setBoardState(BoardStateEnum.READY);
            })
            .catch((err) => {
                console.error(err)
            })
    }

    clickCategory = (ctg_id: string) => {
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

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // const { category, generation } = this.state;
        const { location } = this.props;
        let category = (location.state && location.state.category) ? location.state.category : '';
        let generation = (location.state && location.state.generation) ? location.state.generation : 0;

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

    clickPage = (idx: number) => {
        // const { category, generation } = this.state;
        const { location } = this.props;
        let category = (location.state && location.state.category) ? location.state.category : '';
        let generation = (location.state && location.state.generation) ? location.state.generation : 0;

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
        const { boardInfo, location } = this.props;
        const { boardState } = this.state;

        let category = (location.state && location.state.category) ? location.state.category : '';
        let generation = (location.state && location.state.generation) ? location.state.generation : 0;
        let pageIdx = (location.state && location.state.page) ? location.state.page : 1;

        const categoryOptions = boardInfo.categories.map((category) => {
            return {
                id: category.category_id,
                name: category.category_name
            }
        });

        const generationOptions: {id: number, name: string}[] = [];
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
            <AuthContext.Consumer>
                {
                    authContext => (
                        <div className="board-wrapper">
                        <BoardName board_id={boardInfo.board_id} board_name={boardInfo.board_name} />
                        {/* <div className="docboard-top-menu-wrapper"> */}
                        <div className="board-search-wrapper">
                            <div className="doc-select-wrapper">
                                <SelectBox
                                    selectName="category"
                                    optionList={categoryOptions}
                                    onSelect={this.handleChange}
                                    selectedOption={category} />
                                <SelectBox
                                    selectName="generation"
                                    optionList={generationOptions}
                                    onSelect={this.handleChange}
                                    selectedOption={generation} />
                            </div>
                            {
                                authContext.authInfo.user.level >= boardInfo.lv_write &&
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
                                        {this.docCount > 0 &&
                                            <Paginator
                                                pageIdx={pageIdx}
                                                pageNum={Math.ceil(this.docCount / DOCROWNUM)}
                                                clickPage={this.clickPage} />}
                                        {
                                            boardState === BoardStateEnum.WRITING &&
                                            <CreateDocu
                                                board_id={boardInfo.board_id}
                                                fetch={this.fetch}
                                                categories={boardInfo.categories}
                                                close={() => this.setBoardState(BoardStateEnum.READY)} />
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
            </AuthContext.Consumer>
        )
    }
}

export default DocuBoard;
