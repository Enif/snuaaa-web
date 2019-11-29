import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from 'components/Common/Loading';
import ContentStateEnum from 'common/ContentStateEnum';
import PhotoInfo from 'components/Photo/PhotoInfo';
import EditPhoto from 'containers/Photo/EditPhoto';
import Comment from 'containers/Comment';
import history from 'common/history';
import FullScreenPortal from 'containers/FullScreenPortal';
import Image from 'components/Common/Image';
import ContentService from 'services/ContentService';
import AlbumService from 'services/AlbumService';
import PhotoService from 'services/PhotoService';


const TAG = 'PHOTO'

class Photo extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] constructor`);

        super(props);
        this.photoInfo = undefined;
        this.boardTagInfo = undefined;
        this.albumInfo = undefined;
        this.albumPhotosInfo = undefined;
        this.fullscreenRef = React.createRef();
        this.state = {
            album_id: this.props.match.params.album_id,
            photo_id: this.props.match.params.photo_id,
            likeInfo: false,
            photoState: ContentStateEnum.LOADING,
            isFullscreen: false
        }
    }

    componentDidMount() {
        this.fetch();
        // document.addEventListener('keydown', this.keyDownEvent);
        const { toggleFullScreen } = this;
        document.onfullscreenchange = function (e) {
            toggleFullScreen();
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`[${TAG}] shouldComponentUpdate`)
        if (this.state.photo_id !== nextState.photo_id) {
            this.fetch(nextState.photo_id);
            return false;
        }
        return true;
    }

    static getDerivedStateFromProps(props, state) {
        return {
            photo_id: props.match.params.photo_id,
            // photoState: ContentStateEnum.LOADING
        }
    }

    fetch = async (photo_id) => {
        this.setPhotoState({
            photoState: ContentStateEnum.LOADING
        })
        if (!photo_id) {
            photo_id = this.props.match.params.photo_id
        }
        await PhotoService.retrievePhoto(photo_id)
            .then((res) => {
                this.photoInfo = res.data.photoInfo;
                // this.tagInfo = res.data.tagInfo;
                this.albumInfo = res.data.photoInfo.album;
                this.boardTagInfo = res.data.boardTagInfo
                this.albumPhotosInfo = res.data.albumPhotosInfo;
                this.setState({
                    likeInfo: res.data.likeInfo,
                    photoState: ContentStateEnum.READY
                })
            })
            .catch((err) => {
                console.error(err);
                if (err.response && err.response.data && err.response.data.code === 4001) {
                    alert("권한이 없습니다.")
                    history.goBack();
                }
                else {
                    this.setPhotoState(ContentStateEnum.ERROR);
                }
            })
    }

    setAlbumThumbnail = async () => {
        const { albumInfo } = this;
        const { photo_id } = this.state;

        const data = {
            tn_photo_id: photo_id
        }

        if (!albumInfo || !albumInfo.content_id) {
            alert("섬네일로 설정할 수 없습니다.")
        }
        else {
            await AlbumService.updateAlbumThumbnail(albumInfo.content_id, data)
                .then((res) => {
                    console.log('success')
                })
                .catch((err) => {
                    console.error(err);
                    alert("섬네일 설정 실패")
                })
        }
    }

    setPhotoState = (state) => {
        this.setState({
            photoState: state
        })
    }

    moveToPhoto = (direction) => {
        const { photoInfo, albumPhotosInfo } = this;
        if (albumPhotosInfo && albumPhotosInfo.length > 0) {
            let index = -1;
            for (let i = 0; i < albumPhotosInfo.length; i++) {
                if (albumPhotosInfo[i].content_id === photoInfo.content_id) {
                    index = i;
                    break;
                }
            }
            if (direction === 1) {
                if (index < albumPhotosInfo.length - 1 && index > -1) {
                    history.replace({
                        pathname: `/photo/${albumPhotosInfo[index + 1].content_id}`,
                        state: {
                            modal: true,
                            backgroundLocation: history.location.state.backgroundLocation
                        }
                    })
                }
            }
            else if (direction === -1) {
                if (index < albumPhotosInfo.length && index > 0) {
                    history.replace({
                        pathname: `/photo/${albumPhotosInfo[index - 1].content_id}`,
                        state: {
                            modal: true,
                            backgroundLocation: history.location.state.backgroundLocation
                        }
                    })
                }
            }
        }
    }

    closePhoto = () => {
        if (history.action === 'POP' && !history.location.state) {
            history.push(`/`)
        }
        else {
            history.goBack();
        }
    }

    toggleFullScreen = () => {
        const { isFullscreen } = this.state;
        this.setState({
            isFullscreen: !isFullscreen
        })
    }

    clickFullscreen = () => {
        const elem = this.fullscreenRef.current;
        const { isFullscreen } = this.state;

        if (isFullscreen) {
            if (document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement) {
                // can use exitFullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { /* Firefox */
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE/Edge */
                    document.msExitFullscreen();
                }
            }
        }
        else {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
            }
        }
    }

    likePhoto = async () => {
        await ContentService.likeContent(this.state.photo_id)
            .then(() => {
                if (this.state.likeInfo) {
                    this.photoInfo.contentPhoto.like_num--;
                }
                else {
                    this.photoInfo.contentPhoto.like_num++;
                }
                this.setState({
                    likeInfo: !this.state.likeInfo
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }

    deletePhoto = async () => {

        let goDrop = window.confirm("정말로 삭제하시겠습니까? 삭제한 게시글은 다시 복원할 수 없습니다.");
        if (goDrop) {
            await PhotoService.deletePhoto(this.state.photo_id)
                .then(() => {
                    this.setPhotoState(ContentStateEnum.DELETED);
                })
                .catch((err) => {
                    console.error(err);
                    alert("삭제 실패");
                })
        }
    }

    render() {
        const { likeInfo, photoState, isFullscreen } = this.state;
        const { my_id } = this.props;
        const { photoInfo, setPhotoState, likePhoto, deletePhoto, setAlbumThumbnail, closePhoto } = this;
        let albumInfo = photoInfo && photoInfo.album;
        let userInfo = photoInfo && photoInfo.contentPhoto.user;
        let fullscreenClass = isFullscreen ? 'ri-fullscreen-exit-fill' : 'ri-fullscreen-fill'; 
        let backLink;
        if (!albumInfo) {
            backLink = `/board/brd32`;
        }
        else {
            backLink = `/album/${albumInfo.content_id}`
        }

        return (
            <FullScreenPortal>
                <div className="enif-modal-wrapper photo-popup" onClick={closePhoto}>
                    <div className="photo-section-wrapper" onClick={(e) => e.stopPropagation()}>
                        {/* <BoardName board_id={this.photoInfo.contentPhoto.board.board_id} board_name={this.photoInfo.contentPhoto.board.board_name} /> */}
                        <div className="photo-alb-title-wrp">
                            <Link className="photo-alb-title" to={backLink}>
                                <i className="ri-gallery-line"></i>
                                <h5>{albumInfo ? albumInfo.title : "기본앨범"}</h5>
                            </Link>
                            <div className="enif-modal-close" onClick={closePhoto}>
                                <i className="ri-close-fill enif-f-1p5x enif-pointer"></i>
                            </div>
                        </div>
                        <div className="photo-section-bottom">
                            <div className="photo-section-left">
                                <div className="photo-img-wrapper" ref={this.fullscreenRef} >
                                    <div className="photo-move-action prev" onClick={() => this.moveToPhoto(-1)}>
                                        <i className="ri-arrow-left-s-line ri-icons enif-pointer"></i>
                                    </div>
                                    <Image imgSrc={this.photoInfo && this.photoInfo.file_path} />
                                    <div className="photo-move-action next" onClick={() => this.moveToPhoto(1)}>
                                        <i className="ri-arrow-right-s-line ri-icons enif-pointer"></i>
                                    </div>
                                    <div className="photo-action-fullscreen-wrapper">
                                        <i className={`${fullscreenClass} enif-pointer enif-f-1p2x`} onClick={this.clickFullscreen}></i>
                                    </div>
                                </div>
                            </div>
                            <div className="photo-section-right">
                                <PhotoInfo
                                    photoInfo={this.photoInfo}
                                    likeInfo={likeInfo}
                                    my_id={my_id}
                                    setPhotoState={setPhotoState}
                                    likePhoto={likePhoto}
                                    deletePhoto={deletePhoto}
                                    setAlbumThumbnail={setAlbumThumbnail} />

                                <Comment parent_id={this.state.photo_id} />
                            </div>
                        </div>
                    </div>
                </div>

                {

                    (() => {
                        if (photoState === ContentStateEnum.LOADING) {
                            return <Loading />
                        }
                        else if (photoState === ContentStateEnum.EDITTING) {
                            return (
                                <div className="enif-popup photo-popup">
                                    <EditPhoto photoInfo={this.photoInfo} boardTagInfo={this.boardTagInfo} fetch={this.fetch} setPhotoState={this.setPhotoState} />
                                </div>
                            )
                        }
                        else if (photoState === ContentStateEnum.DELETED) {
                            let backLink;
                            if (!this.albumInfo) {
                                backLink = `/board/brd32`;
                            }
                            else {
                                backLink = `/album/${this.albumInfo.content_id}`
                            }
                            return (
                                <Redirect to={backLink} />
                            )
                        }
                        else return (
                            <div></div>
                        )
                    })()
                }
            </FullScreenPortal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        my_id: state.authentication.user_id
    }
}

export default connect(mapStateToProps, null)(Photo);
