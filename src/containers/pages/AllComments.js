import React from 'react';
import HomeService from 'services/HomeService';
import Loading from 'components/Common/Loading';
import AllPostList from 'components/Post/AllPostList';
import MyCommentList from 'components/MyPage/MyCommentList';
import Paginator from 'components/Common/Paginator';
import BoardName from '../../components/Board/BoardName';
import BoardStateEnum from 'common/BoardStateEnum';
import history from 'common/history';


const TAG = 'ALLCOMMENTS'
const COMMENTROWNUM = 10;

class AllComments extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] Constructor`)
        super(props);
        this.comments = [];
        this.commentCount = 0;
        const hisState = history.location.state;
        this.state = {
            boardState: BoardStateEnum.LOADING,
            pageIdx: (hisState && hisState.page) ? hisState.page : 1,
        }
    }

    componentDidMount() {
        this.fetch()
    }

    static getDerivedStateFromProps(props, state) {
        const hisState = history.location.state;
        return {
            pageIdx: (hisState && hisState.page) ? hisState.page : 1,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.pageIdx !== nextState.pageIdx) {
            this.fetch(nextState.pageIdx);
            return true;
        }
        return true;
    }

    clickPage = (idx) => {
        history.push({
            state: {
                page: idx
            }
        })
    }

    setBoardState = (state) => {
        this.setState({
            boardState: state
        })
    }

    fetch = async (pageIdx) => {
        if (!pageIdx) {
            pageIdx = this.state.pageIdx;
        }

        this.setBoardState(BoardStateEnum.LOADING)
        await HomeService.retrieveAllComments(pageIdx)
            .then((res) => {
                this.comments = res.data.commentInfo;
                this.commentCount = res.data.commentCount;
                this.setBoardState(BoardStateEnum.READY)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    render() {
        console.log(`[${TAG}] render.. `)
        const { pageIdx, boardState } = this.state;

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
                                    <BoardName board_name="전체 댓글" />
                                    {
                                        boardState === BoardStateEnum.READY &&
                                        <>
                                            <MyCommentList comments={this.comments} />
                                            {
                                                this.commentCount > 0 &&
                                                <Paginator
                                                    pageIdx={pageIdx}
                                                    pageNum={Math.ceil(this.commentCount / COMMENTROWNUM)}
                                                    clickPage={this.clickPage} />
                                            }
                                        </>
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

export default AllComments;
