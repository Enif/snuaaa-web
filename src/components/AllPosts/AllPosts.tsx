import React from 'react';
import { Location } from 'history';

import HomeService from '../../services/HomeService';
import Loading from '../Common/Loading';
import AllPostList from '../Post/AllPostList';
import Paginator from '../Common/Paginator';
import BoardName from '../Board/BoardName';
import BoardStateEnum from '../../common/BoardStateEnum';
import history from '../../common/history';
import ContentType from '../../types/ContentType';


const TAG = 'ALLPOST'
const POSTROWNUM = 10;

type AllPostsProps = {
    location: Location;
}

type AllPostsState = {
    boardState: number;
}

class AllPosts extends React.Component<AllPostsProps, AllPostsState> {

    posts: ContentType[];
    postCount: number;

    constructor(props: AllPostsProps) {
        super(props);
        console.log(`[${TAG}] Constructor`)
        this.posts = [];
        this.postCount = 0;
        // const hisState = history.location.state;
        this.state = {
            boardState: BoardStateEnum.LOADING,
            // pageIdx: (hisState && hisState.page) ? hisState.page : 1,
        }
    }

    componentDidMount() {
        this.fetch()
    }

    componentDidUpdate(prevProps: AllPostsProps) {
        if (prevProps.location.state !== this.props.location.state) {
            this.fetch();
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     const hisState = history.location.state;
    //     return {
    //         pageIdx: (hisState && hisState.page) ? hisState.page : 1,
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.pageIdx !== nextState.pageIdx) {
    //         this.fetch(nextState.pageIdx);
    //         return true;
    //     }
    //     return true;
    // }

    clickPage = (idx: number) => {
        history.push({
            state: {
                page: idx
            }
        })
    }

    setBoardState = (state: number) => {
        this.setState({
            boardState: state
        })
    }

    fetch = async () => {
        const { location } = this.props;
        let pageIdx = (location.state && location.state.page) ? location.state.page : 1;


        this.setBoardState(BoardStateEnum.LOADING)
        await HomeService.retrieveAllPosts(pageIdx)
            .then((res) => {
                this.posts = res.data.postInfo;
                this.postCount = res.data.postCount;
                this.setBoardState(BoardStateEnum.READY)
            })
            .catch((err: Error) => {
                console.error(err);
            })
    }

    render() {
        console.log(`[${TAG}] render.. `)
        const { location } = this.props;
        let pageIdx = (location.state && location.state.page) ? location.state.page : 1;
        const { boardState } = this.state;

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
                                    <BoardName board_name="전체 게시글" />
                                    {
                                        boardState === BoardStateEnum.READY &&
                                        <>
                                            <AllPostList posts={this.posts} />
                                            {this.postCount > 0 && <Paginator pageIdx={pageIdx} pageNum={Math.ceil(this.postCount / POSTROWNUM)} clickPage={this.clickPage} />}
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

export default AllPosts;
