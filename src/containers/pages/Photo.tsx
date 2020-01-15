import React, { RefObject, ChangeEvent } from 'react';
import { Redirect, match } from 'react-router';
import { Link } from 'react-router-dom';
import { RecordOf, Record } from 'immutable';
import { Location } from 'history';

import ContentStateEnum from '../../common/ContentStateEnum';
import history from '../../common/history';

import Comment from '../../containers/Comment';
import FullScreenPortal from '../../containers/FullScreenPortal';

import Loading from '../../components/Common/Loading';
import PhotoInfo from '../../components/Photo/PhotoInfo';
import Image from '../../components/Common/AaaImage';
import EditPhotoInfo from '../../components/Photo/EditPhotoInfo';

import ContentType from '../../types/ContentType';
import TagType from '../../types/TagType';

import ContentService from '../../services/ContentService';
import AlbumService from '../../services/AlbumService';
import PhotoService from '../../services/PhotoService';
import AuthContext from '../../contexts/AuthContext';

const TAG = 'PHOTO'

type PhotoProps = {
    match: match<{ photo_id: string }>
    my_id: number;
    location: Location;
}

type PhotoState = {
    likeInfo: boolean;
    photoState: number;
    isFullscreen: boolean;
    contentInfo?: RecordOf<ContentType>;
    editContentInfo?: RecordOf<ContentType>;
}

class Photo extends React.Component<PhotoProps, PhotoState> {

    boardTagInfo: TagType[];
    albumPhotosInfo: any;
    fullscreenRef: RefObject<HTMLDivElement>;

    constructor(props: PhotoProps) {
        super(props);

        this.boardTagInfo = [];
        this.albumPhotosInfo = undefined;
        this.fullscreenRef = React.createRef();
        this.state = {
            likeInfo: false,
            photoState: ContentStateEnum.LOADING,
            isFullscreen: false,
            contentInfo: undefined,
            editContentInfo: undefined
        }
    }

    componentDidMount() {
        this.fetch();
        // document.addEventListener('keydown', this.keyDownEvent);
        const { toggleFullScreen } = this;
        document.onfullscreenchange = function (e) {
            toggleFullScreen();
        };
        document.body.classList.add('enif-overflow-hidden');
    }

    componentDidUpdate(prevProps: PhotoProps) {
        if (prevProps.location !== this.props.location) {
            this.fetch();
        }
    }

    componentWillUnmount() {
        document.body.classList.remove('enif-overflow-hidden')
    }

    fetch = async () => {

        let photo_id = Number(this.props.match.params.photo_id);
        this.setPhotoState(ContentStateEnum.LOADING)

        if (photo_id) {
            await PhotoService.retrievePhoto(photo_id)
                .then((res) => {
                    this.boardTagInfo = res.data.boardTagInfo
                    this.albumPhotosInfo = res.data.albumPhotosInfo;
                    this.setState({
                        contentInfo: Record(res.data.photoInfo)(),
                        editContentInfo: Record(res.data.photoInfo)(),
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
    }

    setAlbumThumbnail = async () => {
        const { contentInfo } = this.state;
        let photo_id = Number(this.props.match.params.photo_id);
        let albumInfo = contentInfo && contentInfo.photo && contentInfo.photo.album;

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
        const { contentInfo } = this.state;
        const { albumPhotosInfo } = this;
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

    handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { editContentInfo } = this.state;
        const name: string = e.target.name;

        if (editContentInfo) {
            if (name === 'title' || name === 'text') {
                this.setState({
                    editContentInfo: editContentInfo.set(name, e.target.value)
                });
            }
            else {
                this.setState({
                    editContentInfo: editContentInfo.setIn(["photo", name], e.target.value)
                });
            }
        }
    }

    handleDate = (date: Date) => {
        const { editContentInfo } = this.state;

        if (editContentInfo) {
            this.setState({
                editContentInfo: editContentInfo.setIn(["photo", "date"], date)
            })
        }
    }

    handleTag = (e: ChangeEvent<HTMLInputElement>) => {
        let tagId: string = e.target.id.replace('crt_', '');
        const { editContentInfo } = this.state;
        if (editContentInfo && editContentInfo.tags) {

            let isSelected = false;

            for (let tag of editContentInfo.tags) {
                if (tagId === tag.tag_id) {
                    isSelected = true;
                    break;
                }
            }

            if (isSelected) {
                this.setState({
                    editContentInfo: editContentInfo.set("tags", editContentInfo.tags.filter(tag => tagId !== tag.tag_id))
                })
            }
            else {
                this.setState({
                    editContentInfo: editContentInfo.set("tags", editContentInfo.tags.concat(this.boardTagInfo.filter(tag => tagId === tag.tag_id)))
                })
            }

        }
    }


    likePhoto = async () => {
        const { contentInfo, likeInfo } = this.state;
        let photo_id = Number(this.props.match.params.photo_id);

        await ContentService.likeContent(photo_id)
            .then(() => {
                if (contentInfo) {
                    if (this.state.likeInfo) {
                        this.setState({
                            contentInfo: contentInfo.set("like_num", contentInfo.like_num - 1),
                            likeInfo: !likeInfo
                        })
                    }
                    else {
                        this.setState({
                            contentInfo: contentInfo.set("like_num", contentInfo.like_num + 1),
                            likeInfo: !likeInfo
                        })
                    }
                }
            })
            .catch((err: Error) => {
                console.error(err)
            })
    }

    updatePhoto = async () => {
        const { editContentInfo } = this.state;
        let photo_id = Number(this.props.match.params.photo_id);

        if (editContentInfo) {
            await PhotoService.updatePhoto(photo_id, editContentInfo.toJSON())
                .then(() => {
                    this.fetch();
                })
                .catch((err: ErrorEvent) => {
                    console.error(err);
                    alert("업데이트 실패");
                })
        }
    }

    deletePhoto = async () => {
        let photo_id = Number(this.props.match.params.photo_id);

        let goDrop = window.confirm("정말로 삭제하시겠습니까? 삭제한 게시글은 다시 복원할 수 없습니다.");
        if (goDrop) {
            await PhotoService.deletePhoto(photo_id)
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
        const { contentInfo, editContentInfo, likeInfo, photoState, isFullscreen } = this.state;
        // const { my_id } = this.props;
        const { setPhotoState, likePhoto, deletePhoto, updatePhoto, setAlbumThumbnail,
            handleChange, handleDate, handleTag, closePhoto, boardTagInfo } = this;

        let photo_id = Number(this.props.match.params.photo_id);
        let fullscreenClass = isFullscreen ? 'ri-fullscreen-exit-fill' : 'ri-fullscreen-fill';
        let backLink: string;
        let photoInfo = contentInfo && contentInfo.photo
        if (photoInfo && photoInfo.album) {
            backLink = `/album/${photoInfo.album_id}`
        }
        else {
            backLink = `/board/brd32`;
        }

        return (
            <AuthContext.Consumer>
                {authContext => (
                    <FullScreenPortal>
                        {
                            contentInfo && editContentInfo && photoInfo &&
                            <>
                                <div className="enif-modal-wrapper photo-popup" onClick={closePhoto}>
                                    <div className="photo-section-wrapper" onClick={(e) => e.stopPropagation()}>
                                        <div className="photo-alb-title-wrp">
                                            <Link className="photo-alb-title" to={backLink}>
                                                <i className="ri-gallery-line"></i>
                                                <h5>{photoInfo.album ? photoInfo.album.title : "기본앨범"}</h5>
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
                                                    <Image imgSrc={photoInfo.file_path} />
                                                    <div className="photo-move-action next" onClick={() => this.moveToPhoto(1)}>
                                                        <i className="ri-arrow-right-s-line ri-icons enif-pointer"></i>
                                                    </div>
                                                    <div className="photo-action-fullscreen-wrapper">
                                                        <i className={`${fullscreenClass} enif-pointer enif-f-1p2x`} onClick={this.clickFullscreen}></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="photo-section-right">
                                                {
                                                    photoState === ContentStateEnum.EDITTING ?
                                                        <EditPhotoInfo
                                                            photoInfo={editContentInfo}
                                                            boardTagInfo={boardTagInfo}
                                                            setPhotoState={setPhotoState}
                                                            updatePhoto={updatePhoto}
                                                            handleChange={handleChange}
                                                            handleDate={handleDate}
                                                            handleTag={handleTag} />
                                                        :
                                                        <>
                                                            <PhotoInfo
                                                                photoInfo={contentInfo}
                                                                likeInfo={likeInfo}
                                                                my_id={authContext.authInfo.user.user_id}
                                                                setPhotoState={setPhotoState}
                                                                likePhoto={likePhoto}
                                                                deletePhoto={deletePhoto}
                                                                setAlbumThumbnail={setAlbumThumbnail} />
                                                            <Comment parent_id={photo_id} />
                                                        </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    (() => {
                                        if (photoState === ContentStateEnum.LOADING) {
                                            return <Loading />
                                        }
                                        else if (photoState === ContentStateEnum.DELETED) {
                                            let backLink;
                                            if (!photoInfo.album) {
                                                backLink = `/board/${contentInfo.board_id}`;
                                            }
                                            else {
                                                backLink = `/album/${photoInfo.album_id}`
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
                )}
            </AuthContext.Consumer>
        )
    }
}

export default Photo;
