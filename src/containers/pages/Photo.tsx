import React, { RefObject } from 'react';
import { Redirect, match } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../components/Common/Loading';
import ContentStateEnum from '../../common/ContentStateEnum';
import PhotoInfo from '../../components/Photo/PhotoInfo';
import EditPhoto from '../../containers/Photo/EditPhoto';
import Comment from '../../containers/Comment';
import history from '../../common/history';
import FullScreenPortal from '../../containers/FullScreenPortal';
import Image from '../../components/Common/AaaImage';
import ContentService from '../../services/ContentService';
import AlbumService from '../../services/AlbumService';
import PhotoService from '../../services/PhotoService';
import ContentType from '../../types/ContentType';

const TAG = 'PHOTO'

type PhotoProps = {
    match: match<{ photo_id: string }>
    my_id: string;
}

type PhotoState = {
    photo_id: number;
    likeInfo: boolean;
    photoState: number;
    isFullscreen: boolean;
}

class Photo extends React.Component<PhotoProps, PhotoState> {

    contentInfo?: ContentType;
    boardTagInfo: any;
    albumInfo: any;
    albumPhotosInfo: any;
    fullscreenRef: RefObject<HTMLDivElement>;

    constructor(props: PhotoProps) {
        super(props);

        this.contentInfo = undefined;
        this.boardTagInfo = undefined;
        this.albumInfo = undefined;
        this.albumPhotosInfo = undefined;
        this.fullscreenRef = React.createRef();
        this.state = {
            photo_id: Number(this.props.match.params.photo_id),
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

    shouldComponentUpdate(nextProps: PhotoProps, nextState: PhotoState) {
        console.log(`[${TAG}] shouldComponentUpdate`)
        if (this.state.photo_id !== nextState.photo_id) {
            this.fetch(nextState.photo_id);
            return false;
        }
        return true;
    }

    static getDerivedStateFromProps(props: PhotoProps, state: PhotoState) {
        return {
            photo_id: props.match.params.photo_id,
            // photoState: ContentStateEnum.LOADING
        }
    }

    fetch = async (photo_id: number = 0) => {
        this.setPhotoState(ContentStateEnum.LOADING)
        if (!photo_id) {
            photo_id = Number(this.props.match.params.photo_id)
        }
        await PhotoService.retrievePhoto(photo_id)
            .then((res) => {
                this.contentInfo = res.data.photoInfo;
                if (this.contentInfo.photo && this.contentInfo.photo.date) {
                    this.contentInfo.photo.date = new Date(this.contentInfo.photo.date)
                }
                // this.tagInfo = res.data.tagInfo;
                // this.albumInfo = res.data.photoInfo.album;
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
                .then((res: any) => {
                    console.log('success')
                })
                .catch((err: Error) => {
                    console.error(err);
                    alert("섬네일 설정 실패")
                })
        }
    }

    setPhotoState = (state: number) => {
        this.setState({
            photoState: state
        })
    }

    moveToPhoto = (direction: number) => {
        const { contentInfo, albumPhotosInfo } = this;
        if (contentInfo && albumPhotosInfo && albumPhotosInfo.length > 0) {
            let index = -1;
            for (let i = 0; i < albumPhotosInfo.length; i++) {
                if (albumPhotosInfo[i].content_id === contentInfo.content_id) {
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
            if (document.fullscreenElement) {
                // can use exitFullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }
        else {
            if (elem && elem.requestFullscreen) {
                elem.requestFullscreen();
            }
        }
    }

    likePhoto = async () => {
        await ContentService.likeContent(this.state.photo_id)
            .then(() => {
                if (this.contentInfo) {
                    if (this.state.likeInfo) {
                        this.contentInfo.like_num--;
                    }
                    else {
                        this.contentInfo.like_num++;
                    }
                }
                this.setState({
                    likeInfo: !this.state.likeInfo
                })
            })
            .catch((err: Error) => {
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
                .catch((err: Error) => {
                    console.error(err);
                    alert("삭제 실패");
                })
        }
    }

    render() {
        const { likeInfo, photoState, isFullscreen } = this.state;
        const { my_id } = this.props;
        const { contentInfo, setPhotoState, likePhoto, deletePhoto, setAlbumThumbnail, closePhoto } = this;

        let fullscreenClass = isFullscreen ? 'ri-fullscreen-exit-fill' : 'ri-fullscreen-fill';
        let backLink;
        let photoInfo = contentInfo && contentInfo.photo
        if (photoInfo && photoInfo.album) {
            backLink = `/album/${photoInfo.album_id}`
        }
        else {
            backLink = `/board/brd32`;
        }

        return (
            <FullScreenPortal>
                {
                    contentInfo &&
                    <>
                        <div className="enif-modal-wrapper photo-popup" onClick={closePhoto}>
                            <div className="photo-section-wrapper" onClick={(e) => e.stopPropagation()}>
                                <div className="photo-alb-title-wrp">
                                    <Link className="photo-alb-title" to={backLink}>
                                        <i className="ri-gallery-line"></i>
                                        <h5>{photoInfo && photoInfo.album ? photoInfo.album.title : "기본앨범"}</h5>
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
                                            <Image imgSrc={contentInfo && contentInfo.photo ? contentInfo.photo.file_path : ''} />
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
                                            photoInfo={this.contentInfo}
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
                                            <EditPhoto
                                                photoInfo={contentInfo}
                                                boardTagInfo={this.boardTagInfo}
                                                fetch={this.fetch}
                                                setPhotoState={this.setPhotoState} />
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
                    </>
                }
            </FullScreenPortal>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        my_id: state.authentication.user_id
    }
}

export default connect(mapStateToProps, null)(Photo);
