import React from 'react';
import { connect } from 'react-redux';
import Loading from 'components/Common/Loading';
import PostList from 'components/Post/PostList.tsx';
import Paginator from 'components/Common/Paginator';
import CreatePost from 'containers/PostBoard/CreatePost';
import BoardStateEnum from 'common/BoardStateEnum';
import history from 'common/history';
import BoardName from '../../components/Board/BoardName';
import SearchTypeEnum from 'common/SearchTypeEnum';
import BoardService from 'services/BoardService';
import SelectBox from '../../components/Common/SelectBox';

const TAG = 'POSTBOARD'
const POSTROWNUM = 10;
const searchOptions = [{
    id: SearchTypeEnum.ALL,
    name: '제목+내용'
}, {
    id: SearchTypeEnum.TITLE,
    name: '제목'
}, {
    id: SearchTypeEnum.TEXT,
    name: '내용'
}, {
    id: SearchTypeEnum.USER,
    name: '글쓴이'
}]

class PostBoard extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] Constructor`)
        super(props);
        this.posts = [];
        this.postCount = 0;
        const hisState = props.location.state;
        this.state = {
            boardState: BoardStateEnum.LOADING,
            searchInfo: (hisState && hisState.searchInfo) ?
                hisState.searchInfo :
                {
                    type: SearchTypeEnum.ALL,
                    keyword: ''
                }
        }
    }

    componentDidMount() {
        this.fetch()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location !== this.props.location) {
            this.fetch();
        }
    }

    setBoardState = (state) => {
        this.setState({
            boardState: state
        })
    }

    clickPage = (idx) => {
        history.push({
            state: {
                ...history.location.state,
                page: idx
            }
        })
    }

    fetch = async () => {
        const { board_id, location } = this.props;
        let searchInfo = location.state && location.state.searchInfo;
        let pageIdx = location.state && location.state.page;

        if (!pageIdx) {
            pageIdx = 1;
        }
        try {
            this.setBoardState(BoardStateEnum.LOADING)
            let res;
            if (searchInfo && searchInfo.keyword) {
                res = await BoardService.searchPostsInBoard(board_id, searchInfo.type, searchInfo.keyword, 0)
            }
            else {
                res = await BoardService.retrievePostsInBoard(board_id, pageIdx)
            }
            this.posts = res.data.postInfo;
            this.postCount = res.data.postCount;
            this.setBoardState(BoardStateEnum.READY);
        }
        catch (err) {
            console.error(err);
        }
    }

    handleSearchOption = (e) => {
        const { searchInfo } = this.state;
        this.setState({
            searchInfo: {
                ...searchInfo,
                type: e.target.value
            }
        })
    }

    search = async () => {
        const { searchInfo } = this.state;
        if (!searchInfo || !searchInfo.keyword || searchInfo.keyword.length < 2) {
            alert("2글자 이상 입력해주세요.")
        }
        else {
            history.push({
                state: {
                    ...history.location.state,
                    page: 1,
                    searchInfo: searchInfo
                }
            })
        }
    }

    handleSearchKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.search();
        }
    }

    handleSearchKeyword = (e) => {
        const { searchInfo } = this.state;
        this.setState({
            searchInfo: {
                ...searchInfo,
                keyword: e.target.value
            }
        })
    }

    makeCategoryList = () => {
        if (this.props.categories.length > 0) {
            return (
                <select>
                    {this.props.categories.map((cate) => (<option>{cate.category_name}</option>))}
                </select>
            )
        }
    }

    render() {
        console.log(`[${TAG}] render.. `)

        const { handleSearchKeyword, handleSearchOption, handleSearchKeyDown } = this
        const { board_id, boardInfo, level } = this.props;
        const { boardState, searchInfo } = this.state;
        let pageIdx = history.location.state && history.location.state.page ? history.location.state.page : 1;

        return (
            <>
                {
                    (() => {
                        if (boardState === BoardStateEnum.LOADING) {
                            return <Loading />
                        }
                        else if (boardState === BoardStateEnum.READY || boardState === BoardStateEnum.WRITING) {
                            return (
                                <div className="board-wrapper postboard-wrapper">
                                    <BoardName board_id={boardInfo.board_id} board_name={boardInfo.board_name} />
                                    <div className="board-desc">
                                        {boardInfo.board_desc}
                                    </div>
                                    {
                                        boardState === BoardStateEnum.READY &&
                                        <>
                                            {this.makeCategoryList()}
                                            <div className="board-search-wrapper">
                                                <div className="board-search-input">
                                                    <SelectBox
                                                        selectName={"searchOption"}
                                                        optionList={searchOptions}
                                                        onSelect={handleSearchOption}
                                                        selectedOption={searchInfo.type} />
                                                    <i className="ri-search-line enif-f-1x" onClick={this.search}></i>
                                                    <input type="text" onChange={handleSearchKeyword} value={searchInfo.keyword} onKeyDown={handleSearchKeyDown} />
                                                </div>
                                                <div>
                                                    {
                                                        level >= boardInfo.lv_write &&
                                                        <button className="board-btn-write" onClick={() => this.setBoardState(BoardStateEnum.WRITING)}>
                                                            <i className="ri-pencil-line enif-f-1p2x"></i>글쓰기
                                                        </button>
                                                    }
                                                </div>
                                            </div>

                                            <PostList
                                                posts={this.posts}
                                                clickCrtBtn={() => this.setBoardState(BoardStateEnum.WRITING)} />
                                            {this.postCount > 0 && <Paginator pageIdx={pageIdx} pageNum={Math.ceil(this.postCount / POSTROWNUM)} clickPage={this.clickPage} />}

                                        </>
                                    }
                                    {
                                        boardState === BoardStateEnum.WRITING &&
                                        <CreatePost
                                            board_id={board_id}
                                            close={() => this.setBoardState(BoardStateEnum.READY)}
                                            fetch={this.fetch} />
                                    }
                                </div>
                            )
                        }
                        else return (
                            <div>ERROR PAGE</div>
                        )
                    })()
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        level: state.authentication.level,
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(PostBoard);
