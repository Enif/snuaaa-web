import React from 'react';
import { Location } from 'history';

import CreateAlbum from '../Album/CreateAlbum';
import AlbumList from '../../components/PhotoBoard/AlbumList';
import Category from '../../components/Common/Category';
import Loading from '../../components/Common/Loading';
import Paginator from '../../components/Common/Paginator';
import history from '../../common/history'
import PhotoBoardService from '../../services/PhotoBoardService';
import ContentType from '../../types/ContentType';
import BoardType from '../../types/BoardType';
import BoardName from '../../components/Board/BoardName';
import AuthContext from '../../contexts/AuthContext';

const TAG = 'MEMORY'
const ALBUMROWNUM = 12;

type MemoryProps = {
    boardInfo: BoardType;
    location: Location;
}

type MemoryState = {
    popUpState: boolean;
    isReady: boolean;
}

class Memory extends React.Component<MemoryProps, MemoryState> {

    albums: ContentType[];
    albumCount: number;

    constructor(props: MemoryProps) {
        super(props);
        console.log('[%s] constructor', TAG);
        this.albums = [];
        this.albumCount = 0;

        this.state = {
            popUpState: false,
            isReady: false,
            // pageIdx: (hisState && hisState.page) ? hisState.page : 1,
            // category: (hisState && hisState.category) ? hisState.category : null
        }
    }

    componentDidMount() {
        this.fetch();
        // const { category, pageIdx } = this.state;
        // this.fetch(category, pageIdx);
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log(`[${TAG}] getDerivedStateFromProps`);
    //     const hisState = history.location.state;
    //     return {
    //         category: (hisState && hisState.category) ? hisState.category : null,
    //         pageIdx: (hisState && hisState.page) ? hisState.page : 1
    //     }
    // }

    componentDidUpdate(prevProps: MemoryProps) {
        if (prevProps.location !== this.props.location) {
            this.fetch();
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(`[${TAG}] shouldComponentUpdate`);
    //     if (this.state.category !== nextState.category ||
    //         this.state.pageIdx !== nextState.pageIdx) {
    //         this.fetch(nextState.category, nextState.pageIdx);
    //         return false;
    //     }
    //     return true
    // }

    setIsReady = (isReady: boolean) => {
        this.setState({
            isReady: isReady
        })
    }

    fetch = async () => {

        const { boardInfo, location } = this.props;
        let pageIdx = location.state && location.state.page ? location.state.page : 1;
        let category = (location.state && location.state.category) ? location.state.category : null

        this.setIsReady(false);
        await PhotoBoardService.retrieveAlbumsInPhotoBoard(boardInfo.board_id, pageIdx, category)
            .then((res: any) => {
                this.albums = res.data.albumInfo;
                this.albumCount = res.data.albumCount;
                this.setIsReady(true);
            })
            .catch((err: Error) => {
                console.error(`[${TAG}] Retrieve Photos Fail >> ${err}`)
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
                category: null,
                page: 1
            }
        })
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    clickPage = (idx: number) => {

        const { location } = this.props;
        let category = (location.state && location.state.category) ? location.state.category : null
        history.push({
            state: {
                category: category,
                page: idx
            }
        })
    }

    render() {
        const { boardInfo, location } = this.props;
        const { isReady } = this.state;
        let pageIdx = location.state && location.state.page ? location.state.page : 1;
        let category = (location.state && location.state.category) ? location.state.category : null

        return (
            <AuthContext.Consumer>
                {
                    authContext => (
                        <div className="board-wrapper photoboard-wrapper">

                            <BoardName board_id={boardInfo.board_id} board_name={boardInfo.board_name} />
                            <div className="board-desc">
                                {boardInfo.board_desc}
                            </div>
                            <Category categories={boardInfo.categories} selected={category} clickAll={this.clickAll} clickCategory={this.clickCategory} />
                            <div className="board-search-wrapper">
                                <div className="board-search-input">
                                    <i className="ri-search-line enif-f-1x"></i>
                                    <input type="text" />
                                </div>
                                <div>
                                    {
                                        authContext.authInfo.user.level >= boardInfo.lv_write &&
                                        <button className="board-btn-write" onClick={() => this.togglePopUp()}>
                                            <i className="ri-gallery-line enif-f-1p2x"></i>앨범 생성
                                </button>
                                    }
                                </div>
                            </div>

                            {(() => {
                                if (isReady) {
                                    return (
                                        <>
                                            <div className="enif-divider"></div>
                                            <AlbumList board_id={boardInfo.board_id} albums={this.albums} togglePopUp={this.togglePopUp} />
                                            {
                                                this.state.popUpState &&
                                                <CreateAlbum
                                                    board_id={boardInfo.board_id}
                                                    categories={boardInfo.categories}
                                                    fetch={this.fetch}
                                                    togglePopUp={this.togglePopUp} />
                                            }
                                            {
                                                this.albumCount > 0 &&
                                                <Paginator
                                                    pageIdx={pageIdx}
                                                    pageNum={Math.ceil(this.albumCount / ALBUMROWNUM)}
                                                    clickPage={this.clickPage} />
                                            }
                                        </>)
                                }
                                else {
                                    return <Loading />
                                }
                            })()}
                        </div>
                    )
                }
            </AuthContext.Consumer>
        );
    }
}

export default Memory;
