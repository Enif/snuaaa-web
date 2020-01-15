import React, { ChangeEvent, KeyboardEvent } from 'react';
import { Location } from 'history';

import Loading from '../../components/Common/Loading';
import PostList from '../../components/Post/PostList';
import Paginator from '../../components/Common/Paginator';
import CreatePost from '../PostBoard/CreatePost';
import BoardStateEnum from '../../common/BoardStateEnum';
import history from '../../common/history';
import BoardName from '../../components/Board/BoardName';
import SearchTypeEnum from '../../common/SearchTypeEnum';
import BoardService from '../../services/BoardService';
import SelectBox from '../../components/Common/SelectBox';
import BoardType from '../../types/BoardType';
import ContentType from '../../types/ContentType';
import AuthContext from '../../contexts/AuthContext';

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

type PostBoardProps = {
    boardInfo: BoardType;
    location: Location;
    // level: number;
}

type PostBoardState = {
    boardState: number;
    searchInfo: { type: string, keyword: string };
    posts: ContentType[];
    postCount: number;
}

class PostBoard extends React.Component<PostBoardProps, PostBoardState> {


    constructor(props: PostBoardProps) {
        super(props);
        console.log(`[${TAG}] Constructor`)

        const hisState = history.location.state;
        this.state = {
            boardState: BoardStateEnum.LOADING,
            posts: [],
            postCount: 0,
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

    componentDidUpdate(prevProps: PostBoardProps) {
        if (prevProps.boardInfo !== this.props.boardInfo ||
            prevProps.location !== this.props.location) {
            this.fetch();
        }
    }

    setBoardState = (state: number) => {
        this.setState({
            boardState: state
        })
    }

    clickPage = (idx: number) => {
        history.push({
            state: {
                ...history.location.state,
                page: idx
            }
        })
    }

    fetch = async () => {
        const { boardInfo, location } = this.props;

        let searchInfo = history.location.state && location.state.searchInfo;
        let pageIdx = location.state && location.state.page;

        if (!pageIdx) {
            pageIdx = 1;
        }
        try {
            this.setBoardState(BoardStateEnum.LOADING)
            let res;
            if (searchInfo && searchInfo.keyword) {
                res = await BoardService.searchPostsInBoard(boardInfo.board_id, searchInfo.type, searchInfo.keyword, 0)
            }
            else {
                res = await BoardService.retrievePostsInBoard(boardInfo.board_id, pageIdx)
            }
            this.setState({
                posts: res.data.postInfo,
                postCount: res.data.postCount,
                boardState: BoardStateEnum.READY
            })
        }
        catch (err) {
            console.error(err);
        }
    }

    handleSearchOption = (e: ChangeEvent<HTMLInputElement>) => {
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

    handleSearchKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
            this.search();
        }
    }

    handleSearchKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        const { searchInfo } = this.state;
        this.setState({
            searchInfo: {
                ...searchInfo,
                keyword: e.target.value
            }
        })
    }

    makeCategoryList = () => {
        const { boardInfo } = this.props;
        if (boardInfo.categories && boardInfo.categories.length > 0) {
            return (
                <select>
                    {boardInfo.categories.map((cate) => (<option>{cate.category_name}</option>))}
                </select>
            )
        }
    }

    render() {
        console.log(`[${TAG}] render.. `)

        const { handleSearchKeyword, handleSearchOption, handleSearchKeyDown } = this
        const { boardInfo } = this.props;
        const { boardState, searchInfo, posts, postCount } = this.state;
        let pageIdx = history.location.state && history.location.state.page ? history.location.state.page : 1;

        return (
            <AuthContext.Consumer>
                {
                    authContext => (() => {
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
                                                <div className="board-btn-write-wrapper">
                                                    {
                                                        authContext.authInfo.user.level >= boardInfo.lv_write &&
                                                        <button className="board-btn-write" onClick={() => this.setBoardState(BoardStateEnum.WRITING)}>
                                                            <i className="ri-pencil-line enif-f-1p2x"></i>글쓰기
                                                        </button>
                                                    }
                                                </div>
                                            </div>

                                            <PostList posts={posts} />
                                            {postCount > 0 && <Paginator pageIdx={pageIdx} pageNum={Math.ceil(postCount / POSTROWNUM)} clickPage={this.clickPage} />}

                                        </>
                                    }
                                    {
                                        boardState === BoardStateEnum.WRITING &&
                                        <CreatePost
                                            board_id={boardInfo.board_id}
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

            </AuthContext.Consumer>
            // <>
            //     {

            //     }
            // </>
        );
    }
}

export default PostBoard;
