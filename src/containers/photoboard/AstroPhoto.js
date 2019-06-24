import React from 'react';
import * as service from 'services';
import CreatePhoto from 'containers/Photo/CreatePhoto';
import CreateAlbum from 'containers/Album/CreateAlbum';
import AlbumList from 'components/PhotoBoard/AlbumList';
import PhotoList from 'components/Album/PhotoList';
import Tag from 'components/Common/Tag';
import Loading from 'components/Common/Loading';
import Paginator from 'components/Common/Paginator';

const TAG = 'ASTROPHOTO';
const ALBUMROWNUM = 12;

class AstroPhoto extends React.Component {

    constructor(props) {
        super(props);
        this.albums = [];
        this.photos = [];
        this.tags = [];
        this.count = 0;

        this.state = {
            popUpState: false,
            isReady: false,
            isViewPhotos: false,
            pageIdx: 1,
            selectedTags: []
        }
        console.log(`[${TAG}] constructor`);
    }

    componentDidMount() {
        this.fetch();
    }


    fetch = async () => {
        const board_id = this.props.board_id;
        const { isViewPhotos } = this.state;
        this.setIsReady(false);
        if (!isViewPhotos) {
            await service.retrieveAlbumsInPhotoBoard(board_id, this.state.pageIdx)
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
            if (this.state.selectedTags.length > 0) {
                service.retrievePhotosInPhotoBoardByTag(this.props.board_id, this.state.selectedTags, this.state.pageIdx)
                    .then((res) => {
                        this.photos = res.data.photoInfo;
                        this.count = res.data.photoCount;
                        this.setIsReady(true);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
            else {
                await Promise.all([
                    service.retrieveTagsInBoard(board_id),
                    service.retrievePhotosInPhotoBoard(board_id, this.state.pageIdx)
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
        this.setState({
            isViewPhotos: isViewPhotos,
            pageIdx: 1
        },
            this.fetch
        )
    }

    clickTag = (e) => {
        if (this.state.selectedTags.includes(e.target.id)) {
            let idx = this.state.selectedTags.indexOf(e.target.id);
            this.state.selectedTags.splice(idx, 1);
        }
        else {
            this.state.selectedTags.push(e.target.id)
        }
        this.setState({
            pageIdx: 1
        },
            this.fetch
        )
    }

    clickAll = () => {
        this.setState({
            selectedTags: []
        },
            this.fetch
        )
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    clickPage = (idx) => {
        this.setState({
            pageIdx: idx
        },
            this.fetch
        )
    }

    render() {

        console.log(`[${TAG}] render..`)

        let { isReady, pageIdx } = this.state;
        let { board_id, boardInfo } = this.props;
        let albumSelectorClassName = "view-type-selector" + (this.state.isViewPhotos ? "" : " selected")
        let photoSelectorClassName = "view-type-selector" + (this.state.isViewPhotos ? " selected" : "")

        return (
            <>
                {(() => {
                    if (isReady) {
                        return (
                            <div className="photoboard-wrapper">
                                <h2>{boardInfo.board_name}</h2>
                                <div className="view-type-selector-wrapper">
                                    <div className={albumSelectorClassName} onClick={() => this.setIsViewPhotos(false)}>앨범</div>
                                    <div className={photoSelectorClassName} onClick={() => this.setIsViewPhotos(true)}>사진</div>
                                </div>
                                <Paginator pageIdx={pageIdx} pageNum={Math.ceil(this.count / ALBUMROWNUM)} clickPage={this.clickPage} />
                                <div className="enif-divider"></div>
                                {this.state.isViewPhotos ?
                                    (
                                        <>
                                            <Tag tags={this.tags} clickAll={this.clickAll} selectedTags={this.state.selectedTags} clickTag={this.clickTag} />
                                            <PhotoList photos={this.photos} togglePopUp={this.togglePopUp} />
                                            {this.state.popUpState && <CreatePhoto board_id={board_id} tags={this.tags} retrievePhotos={this.fetch} togglePopUp={this.togglePopUp} />}
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <AlbumList board_id={board_id} albums={this.albums} togglePopUp={this.togglePopUp} />
                                            {this.state.popUpState && <CreateAlbum board_id={board_id} fetch={this.fetch} togglePopUp={this.togglePopUp} />}
                                            <button className="enif-btn-circle enif-pos-sticky" onClick={this.togglePopUp}>
                                                <i className="material-icons">library_add</i>
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        )
                    }
                    else {
                        return <Loading />
                    }
                })()}
            </>
        );
    }
}

export default AstroPhoto