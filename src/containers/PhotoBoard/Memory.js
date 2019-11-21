import React from 'react';
import { connect } from 'react-redux';
import * as service from 'services';
import CreateAlbum from 'containers/Album/CreateAlbum';
import AlbumList from 'components/PhotoBoard/AlbumList';
import Category from 'components/Common/Category';
import Loading from 'components/Common/Loading';
import Paginator from 'components/Common/Paginator';
import history from 'common/history'

const TAG = 'MEMORY'
const ALBUMROWNUM = 12;

class Memory extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);
        this.albums = [];
        this.albumCount = 0;

        const hisState = history.location.state;
        this.state = {
            popUpState: false,
            isReady: false,
            pageIdx: (hisState && hisState.page) ? hisState.page : 1,
            category: (hisState && hisState.category) ? hisState.category : null
        }
    }

    componentDidMount() {
        const { category, pageIdx } = this.state;
        this.fetch(category, pageIdx);
    }

    static getDerivedStateFromProps(props, state) {
        console.log(`[${TAG}] getDerivedStateFromProps`);
        const hisState = history.location.state;
        return {
            category: (hisState && hisState.category) ? hisState.category : null,
            pageIdx: (hisState && hisState.page) ? hisState.page : 1
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`[${TAG}] shouldComponentUpdate`);
        if (this.state.category !== nextState.category ||
            this.state.pageIdx !== nextState.pageIdx) {
            this.fetch(nextState.category, nextState.pageIdx);
            return false;
        }
        return true
    }

    setIsReady = (isReady) => {
        this.setState({
            isReady: isReady
        })
    }

    fetch = async (category, pageIdx) => {

        const { board_id } = this.props;
        // if (!category) {
        //     category = this.state.category;
        // }
        if (!pageIdx) {
            pageIdx = this.state.pageIdx;
        }

        this.setIsReady(false);
        if (category) {
            await service.retrieveAlbumsInPhotoBoardByCategory(board_id, category, pageIdx)
                .then((res) => {
                    this.albums = res.data.albumInfo;
                    this.albumCount = res.data.albumCount;
                    this.setIsReady(true);
                })
                .catch((err) => {
                    console.error(`[${TAG}] Retrieve Photos Fail >> ${err}`)
                })
        }
        else {
            await service.retrieveAlbumsInPhotoBoard(board_id, pageIdx)
                .then((res) => {
                    this.albums = res.data.albumInfo;
                    this.albumCount = res.data.albumCount;
                    this.setIsReady(true);
                })
                .catch((err) => {
                    console.error(`[${TAG}] Retrieve Photos Fail >> ${err}`)
                })
        }
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

    clickPage = (idx) => {
        const { category } = this.state;
        history.push({
            state: {
                category: category,
                page: idx
            }
        })
    }

    render() {
        const { board_id, boardInfo, categories, level } = this.props;
        const { isReady, pageIdx, category } = this.state;

        return (
            <>
                <Category categories={categories} selected={category} clickAll={this.clickAll} clickCategory={this.clickCategory} />
                <div className="board-search-wrapper">
                    <div className="board-search-input">
                        <i className="ri-search-line enif-f-1x"></i>
                        <input type="text" />
                    </div>
                    <div>
                        {
                            level >= boardInfo.lv_write &&
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
                                <AlbumList board_id={board_id} albums={this.albums} togglePopUp={this.togglePopUp} />
                                {
                                    this.state.popUpState && <CreateAlbum board_id={board_id} categories={categories} fetch={this.fetch} togglePopUp={this.togglePopUp} />
                                }
                                {
                                    this.albumCount > 0 && <Paginator pageIdx={pageIdx} pageNum={Math.ceil(this.albumCount / ALBUMROWNUM)} clickPage={this.clickPage} />
                                }
                            </>)
                    }
                    else {
                        return <Loading />
                    }
                })()}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        level: state.authentication.level,
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(Memory);
