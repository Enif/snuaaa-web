import React from 'react';
import { connect } from 'react-redux';
import * as service from 'services'
import Loading from 'components/Common/Loading';
import PostList from 'components/Board/PostList';
import Paginator from 'components/Common/Paginator';
import CreatePost from 'containers/PostBoard/CreatePost';
import BoardStateEnum from 'common/BoardStateEnum';
import history from 'common/history';

const TAG = 'POSTBOARD'
const POSTROWNUM = 10;

class PostBoard extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] Constructor`)
        super(props);
        this.posts = [];
        this.postCount = 0;
        const hisState = history.location.state;
        this.state = {
            boardState: BoardStateEnum.LOADING,
            pageIdx: (hisState && hisState.page) ? hisState.page : 1,
        }
    }

    componentDidMount() {
        console.log(`[${TAG}] ComponentDidMount`)
        this.fetch()
    }

    static getDerivedStateFromProps(props, state) {
        console.log(`[${TAG}] getDerivedStateFromProps`);
        const hisState = history.location.state;
        return {
            pageIdx: (hisState && hisState.page) ? hisState.page : 1,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`[${TAG}] shouldComponentUpdate`)
        if (this.state.pageIdx !== nextState.pageIdx) {
            this.fetch(nextState.pageIdx);
            return true;
        }
        return true;
    }

    setBoardState = (state) => {
        this.setState({
            boardState: state
        })
    }

    clickPage = (idx) => {
        history.push({
            state: {
                page: idx
            }
        })
    }

    fetch = async (pageIdx) => {
        const { board_id } = this.props;
        if (!pageIdx) {
            pageIdx = this.state.pageIdx;
        }

        this.setBoardState(BoardStateEnum.LOADING)
        await service.retrievePostsInBoard(board_id, pageIdx)
            .then((res) => {
                this.posts = res.data.postInfo;
                this.postCount = res.data.postCount;
                this.setBoardState(BoardStateEnum.READY)
            })
            .catch((err) => {
                console.error(err);
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

        const { board_id, boardInfo, level } = this.props;
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
                                    <div className="postboard-title-wrapper">
                                        <div className="background-star">★</div>
                                        <h2>{boardInfo.board_name}</h2>
                                        <div className="background-star">★★★★★★★★★★★★★★★★★★★★★★</div>
                                    </div>
                                    {
                                        boardState === BoardStateEnum.READY &&
                                        <>
                                            {this.makeCategoryList()}
                                            <PostList
                                                posts={this.posts}
                                                clickCrtBtn={() => this.setBoardState(BoardStateEnum.WRITING)} />
                                            {this.postCount > 0 && <Paginator pageIdx={pageIdx} pageNum={Math.ceil(this.postCount / POSTROWNUM)} clickPage={this.clickPage} />}
                                            {
                                                level >= boardInfo.lv_write &&
                                                <button className="enif-btn-circle enif-pos-sticky" onClick={() => this.setBoardState(BoardStateEnum.WRITING)}>
                                                    <i className="material-icons">create</i>
                                                </button>
                                            }
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

export default connect(mapStateToProps, null)(PostBoard);
