import React from 'react';
import { connect } from 'react-redux';
import CreatePhoto from 'containers/Photo/CreatePhoto';
import CreateAlbum from 'containers/Album/CreateAlbum';
import AlbumList from 'components/PhotoBoard/AlbumList';
import PhotoList from 'components/Album/PhotoList';
import Tag from 'components/Common/Tag';
import Loading from 'components/Common/Loading';
import Paginator from 'components/Common/Paginator';
import history from 'common/history';
import BoardService from 'services/BoardService';
import PhotoBoardService from 'services/PhotoBoardService';

const TAG = 'ASTROPHOTO';
const ALBUMROWNUM = 12;

class AstroPhoto extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] constructor`);
        super(props);
        this.albums = [];
        this.photos = [];
        this.tags = [];
        this.count = 0;

        const hisState = history.location.state;

        this.state = {
            popUpState: false,
            isReady: false,
            isViewPhotos: (hisState && hisState.vp) ? true : false,
            pageIdx: (hisState && hisState.page) ? hisState.page : 1,
            selectedTags: (hisState && hisState.tags && hisState.tags.length > 0) ? hisState.tags : []
        }
    }

    componentDidMount() {
        console.log(`[${TAG}] componentDidMount`);
        const { isViewPhotos, pageIdx, selectedTags } = this.state
        this.fetch(isViewPhotos, pageIdx, selectedTags);
    }

    static getDerivedStateFromProps(props, state) {
        console.log(`[${TAG}] getDerivedStateFromProps`);
        const hisState = history.location.state;
        return {
            isViewPhotos: (hisState && hisState.vp) ? true : false,
            pageIdx: (hisState && hisState.page) ? hisState.page : 1,
            selectedTags: (hisState && hisState.tags && hisState.tags.length > 0) ? hisState.tags : []
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`[${TAG}] shouldComponentUpdate`);
        const { isViewPhotos, pageIdx, selectedTags } = this.state

        if (isViewPhotos !== nextState.isViewPhotos ||
            pageIdx !== nextState.pageIdx ||
            selectedTags.length !== nextState.selectedTags.length) {
            this.fetch(nextState.isViewPhotos, nextState.pageIdx, nextState.selectedTags);
            return false;
        }
        return true
    }


    fetch = async (isViewPhotos, pageIdx, selectedTags) => {
        const { board_id } = this.props;
        // const { isViewPhotos } = this.state;
        if (isViewPhotos === undefined) isViewPhotos = this.state.isViewPhotos;
        if (pageIdx === undefined) pageIdx = this.state.pageIdx;
        if (selectedTags === undefined) selectedTags = this.state.selectedTags;

        this.setIsReady(false);
        if (!isViewPhotos) {
            await PhotoBoardService.retrieveAlbumsInPhotoBoard(board_id, pageIdx)
                .then((res) => {
                    this.albums = res.data.albumInfo;
                    this.count = res.data.albumCount;
                    this.setIsReady(true);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        else {
            if (selectedTags.length > 0) {
                await Promise.all([
                    BoardService.retrieveTagsInBoard(board_id),
                    PhotoBoardService.retrievePhotosInPhotoBoardByTag(board_id, selectedTags, pageIdx)
                ])
                    .then((res) => {
                        this.tags = res[0].data;
                        this.photos = res[1].data.photoInfo;
                        this.count = res[1].data.photoCount;
                        this.setIsReady(true);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
            else {
                await Promise.all([
                    BoardService.retrieveTagsInBoard(board_id),
                    PhotoBoardService.retrievePhotosInPhotoBoard(board_id, pageIdx)
                ])
                    .then((res) => {
                        this.tags = res[0].data;
                        this.photos = res[1].data.photoInfo;
                        this.count = res[1].data.photoCount;
                        this.setIsReady(true);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
        }
    }

    setIsReady = (isReady) => {
        this.setState({
            isReady: isReady
        })
    }

    setIsViewPhotos = (isViewPhotos) => {
        history.push({
            state: {
                vp: isViewPhotos,
                page: 1
            }
        })
    }

    clickTag = (e) => {

        const { isViewPhotos, selectedTags } = this.state;
        const tagId = e.target.id;

        if (selectedTags.includes(tagId)) {
            history.push({
                state: {
                    vp: isViewPhotos,
                    page: 1,
                    tags: selectedTags.filter(tag => tagId !== tag)
                }
            })
        }
        else {
            history.push({
                state: {
                    vp: isViewPhotos,
                    page: 1,
                    tags: selectedTags.concat(tagId)
                }
            })
        }
    }

    clickAll = () => {
        const { isViewPhotos } = this.state;

        history.push({
            state: {
                vp: isViewPhotos,
                page: 1,
                tags: []
            }
        })
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    clickPage = (idx) => {
        const { isViewPhotos, selectedTags } = this.state;

        history.push({
            state: {
                vp: isViewPhotos,
                page: idx,
                tags: selectedTags
            }
        })
    }

    render() {

        console.log(`[${TAG}] render..`)

        const { board_id, boardInfo, level } = this.props;
        const { isReady, pageIdx, isViewPhotos, selectedTags, popUpState } = this.state;

        let albumSelectorClassName = "view-type-selector" + (isViewPhotos ? "" : " selected")
        let photoSelectorClassName = "view-type-selector" + (isViewPhotos ? " selected" : "")

        return (
            <>
                {!isReady && <Loading />}
                <div className="view-type-selector-wrapper">
                    <div className={albumSelectorClassName} onClick={() => this.setIsViewPhotos(false)}>앨범</div>
                    <div className={photoSelectorClassName} onClick={() => this.setIsViewPhotos(true)}>사진</div>
                </div>
                {
                    isViewPhotos ?
                        (
                            <>
                                <div className="board-search-wrapper">
                                    <div className="board-search-input">
                                        <i className="ri-search-line enif-f-1x"></i>
                                        <input type="text" />
                                    </div>
                                    <div>
                                        {
                                            level >= boardInfo.lv_write &&
                                            <button className="board-btn-write" onClick={() => this.togglePopUp()}>
                                                <i className="ri-image-line enif-f-1p2x"></i>사진 업로드
                                            </button>
                                        }
                                    </div>
                                </div>
                                <Tag
                                    tags={this.tags}
                                    clickAll={this.clickAll}
                                    selectedTags={selectedTags}
                                    clickTag={this.clickTag} />
                                <div className="enif-divider"></div>
                                <PhotoList
                                    photos={this.photos}
                                    togglePopUp={this.togglePopUp} />
                                {
                                    popUpState &&
                                    <CreatePhoto
                                        board_id={board_id}
                                        tags={this.tags}
                                        fetch={this.fetch}
                                        togglePopUp={this.togglePopUp}
                                        setReadyState={() => this.setIsReady(true)} />
                                }
                            </>
                        )
                        :
                        (
                            <>
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
                                <div className="enif-divider"></div>
                                <AlbumList board_id={board_id} albums={this.albums} togglePopUp={this.togglePopUp} />
                                {popUpState && <CreateAlbum board_id={board_id} fetch={this.fetch} togglePopUp={this.togglePopUp} setReadyState={() => this.setIsReady(true)} />}
                            </>
                        )
                }
                {this.count > 0 && <Paginator pageIdx={pageIdx} pageNum={Math.ceil(this.count / ALBUMROWNUM)} clickPage={this.clickPage} />}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        level: state.authentication.level,
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(AstroPhoto);
