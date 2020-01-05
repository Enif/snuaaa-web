import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Location } from 'history';

import CreatePhoto from '../Photo/CreatePhoto';
import CreateAlbum from '../Album/CreateAlbum';
import AlbumList from '../../components/PhotoBoard/AlbumList';
import PhotoList from '../../components/Album/PhotoList';
import Tag from '../../components/Common/Tag';
import Loading from '../../components/Common/Loading';
import Paginator from '../../components/Common/Paginator';
import history from '../../common/history';
import PhotoBoardService from '../../services/PhotoBoardService';
import BoardType from '../../types/BoardType';
import ContentType from '../../types/ContentType';
import BoardName from '../../components/Board/BoardName';

const TAG = 'ASTROPHOTO';
const ALBUMROWNUM = 12;

type AstroPhotoProps = {
    boardInfo: BoardType;
    location: Location;
    level: number;
}

type AstroPhotoState = {
    popUpState: boolean;
    isReady: boolean;
}

class AstroPhoto extends React.Component<AstroPhotoProps, AstroPhotoState> {

    albums: ContentType[];
    photos: ContentType[];
    count: number;

    constructor(props: AstroPhotoProps) {
        super(props);
        console.log(`[${TAG}] constructor`);
        this.albums = [];
        this.photos = [];
        this.count = 0;

        this.state = {
            popUpState: false,
            isReady: false,
        }
    }

    componentDidMount() {
        this.fetch();
    }

    componentDidUpdate(prevProps: AstroPhotoProps) {
        if (prevProps.location.state !== this.props.location.state) {
            this.fetch();
        }
    }

    fetch = async () => {
        const { boardInfo, location } = this.props;

        let isViewPhotos = (location.state && location.state.vp) ? true : false;
        let pageIdx = (location.state && location.state.page) ? location.state.page : 1;
        let selectedTags = (location.state && location.state.tags && location.state.tags.length > 0) ? location.state.tags : [];

        this.setIsReady(false);
        if (!isViewPhotos) {
            await PhotoBoardService.retrieveAlbumsInPhotoBoard(boardInfo.board_id, pageIdx)
                .then((res) => {
                    this.albums = res.data.albumInfo;
                    this.count = res.data.albumCount;
                    this.setIsReady(true);
                })
                .catch((err: Error) => {
                    console.error(err);
                })
        }
        else {
            await PhotoBoardService.retrievePhotosInPhotoBoard(boardInfo.board_id, pageIdx, selectedTags)
                .then((res) => {
                    // this.tags = res[0].data;
                    this.photos = res.data.photoInfo;
                    this.count = res.data.photoCount;
                    this.setIsReady(true);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    setIsReady = (isReady: boolean) => {
        this.setState({
            isReady: isReady
        })
    }

    setIsViewPhotos = (isViewPhotos: boolean) => {
        history.push({
            state: {
                vp: isViewPhotos,
                page: 1
            }
        })
    }

    clickTag = (e: ChangeEvent<HTMLInputElement>) => {
        const { location } = this.props;
        let isViewPhotos = (location.state && location.state.vp) ? true : false;
        let selectedTags = (location.state && location.state.tags && location.state.tags.length > 0) ? location.state.tags : [];

        const tagId = e.target.id;

        if (selectedTags.includes(tagId)) {
            history.replace({
                state: {
                    vp: isViewPhotos,
                    page: 1,
                    tags: selectedTags.filter((tag: any) => tagId !== tag)
                }
            })
        }
        else {
            history.replace({
                state: {
                    vp: isViewPhotos,
                    page: 1,
                    tags: selectedTags.concat(tagId)
                }
            })
        }
    }

    clickAll = () => {
        const { location } = this.props;
        let isViewPhotos = (location.state && location.state.vp) ? true : false;

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

    clickPage = (idx: number) => {
        const { location } = this.props;
        let isViewPhotos = (location.state && location.state.vp) ? true : false;
        let selectedTags = (location.state && location.state.tags && location.state.tags.length > 0) ? location.state.tags : [];

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

        const { boardInfo, level, location } = this.props;
        const { isReady, popUpState } = this.state;

        let isViewPhotos = (location.state && location.state.vp) ? true : false;
        let pageIdx = (location.state && location.state.page) ? location.state.page : 1;
        let selectedTags = (location.state && location.state.tags && location.state.tags.length > 0) ? location.state.tags : [];

        let albumSelectorClassName = "view-type-selector" + (isViewPhotos ? "" : " selected")
        let photoSelectorClassName = "view-type-selector" + (isViewPhotos ? " selected" : "")

        return (
            <>
                <div className="board-wrapper photoboard-wrapper">
                    <BoardName board_id={boardInfo.board_id} board_name={boardInfo.board_name} />
                    <div className="board-desc">
                        {boardInfo.board_desc}
                    </div>
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
                                    {
                                        boardInfo.tags &&
                                        <>
                                            <Tag
                                                tags={boardInfo.tags}
                                                clickAll={this.clickAll}
                                                selectedTags={selectedTags}
                                                clickTag={this.clickTag} />
                                            <div className="enif-divider"></div>
                                            <PhotoList
                                                photos={this.photos} />
                                            {
                                                popUpState &&
                                                <CreatePhoto
                                                    board_id={boardInfo.board_id}
                                                    tags={boardInfo.tags}
                                                    fetch={this.fetch}
                                                    togglePopUp={this.togglePopUp}
                                                    setReadyState={() => this.setIsReady(true)} />
                                            }
                                        </>
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
                                    <AlbumList board_id={boardInfo.board_id} albums={this.albums} togglePopUp={this.togglePopUp} />
                                    {popUpState && <CreateAlbum board_id={boardInfo.board_id} fetch={this.fetch} togglePopUp={this.togglePopUp} setReadyState={() => this.setIsReady(true)} />}
                                </>
                            )
                    }
                    {this.count > 0 && <Paginator pageIdx={pageIdx} pageNum={Math.ceil(this.count / ALBUMROWNUM)} clickPage={this.clickPage} />}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        level: state.authentication.level,
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(AstroPhoto);
