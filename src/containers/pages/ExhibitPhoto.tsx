import React, { RefObject } from 'react';
import { Redirect, match } from 'react-router';
import { Link } from 'react-router-dom';
import ExhibitPhotoService from '../../services/ExhibitPhotoService';
import ContentService from '../../services/ContentService';
import Loading from '../../components/Common/Loading';
import ContentStateEnum from '../../common/ContentStateEnum';
import Comment from '../../containers/Comment';
import history from '../../common/history';
import FullScreenPortal from '../../containers/FullScreenPortal';
import Image from '../../components/Common/AaaImage';
import ExhibitPhotoComponent from '../../components/ExhibitBoard/ExhibitPhotoComponent';
import EditExhibitPhoto from '../ExhibitBoard/EditExhibitPhoto';
import { Location } from 'history';
import ContentType from '../../types/ContentType';
import { RecordOf, Record } from 'immutable';
import AuthContext from '../../contexts/AuthContext';


const TAG = 'EXHIBITPHOTO'

type ExhibitPhotoProps = {
    match: match<{ exhibitPhoto_id: string }>;
    location: Location;
}

type ExhibitPhotoState = {
    likeInfo: boolean;
    photoState: number;
    isFullscreen: boolean;
    contentInfo?: RecordOf<ContentType>;
}

class ExhibitPhoto extends React.Component<ExhibitPhotoProps, ExhibitPhotoState> {

    exhibitPhotosInfo: ContentType[];
    fullscreenRef: RefObject<HTMLDivElement>;


    constructor(props: ExhibitPhotoProps) {

        super(props);

        // this.contentInfo = undefined;
        this.exhibitPhotosInfo = [];
        this.fullscreenRef = React.createRef();
        this.state = {
            // exhibitPhoto_id: this.props.match.params.exhibitPhoto_id,
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

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(`[${TAG}] shouldComponentUpdate`)
    //     if (this.state.exhibitPhoto_id !== nextState.exhibitPhoto_id) {
    //         this.fetch(nextState.exhibitPhoto_id);
    //         return false;
    //     }
    //     return true;
    // }

    // static getDerivedStateFromProps(props, state) {
    //     return {
    //         exhibitPhoto_id: props.match.params.exhibitPhoto_id,
    //         // photoState: ContentStateEnum.LOADING
    //     }
    // }

    fetch = async () => {
        let exhibitPhoto_id = Number(this.props.match.params.exhibitPhoto_id);

        this.setPhotoState(ContentStateEnum.LOADING);
        // if (!exhibitPhoto_id) {
        //     exhibitPhoto_id = this.props.match.params.exhibitPhoto_id
        // }
        await ExhibitPhotoService.retrieveExhibitPhoto(exhibitPhoto_id)
            .then((res) => {
                // this.contentInfo = res.data.exhibitPhotoInfo;
                this.exhibitPhotosInfo = res.data.exhibitPhotosInfo;
                this.setState({
                    contentInfo: Record(res.data.exhibitPhotoInfo)(),
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

    setPhotoState = (state: number) => {
        this.setState({
            photoState: state
        })
    }

    moveToPhoto = (direction: number) => {
        const { exhibitPhotosInfo } = this;
        const { contentInfo } = this.state;
        if (contentInfo && exhibitPhotosInfo && exhibitPhotosInfo.length > 0) {
            let index = -1;
            for (let i = 0; i < exhibitPhotosInfo.length; i++) {
                if (exhibitPhotosInfo[i].content_id === contentInfo.content_id) {
                    index = i;
                    break;
                }
            }
            if (direction === 1) {
                if (index < exhibitPhotosInfo.length - 1 && index > -1) {
                    history.replace({
                        pathname: `/exhibitPhoto/${exhibitPhotosInfo[index + 1].content_id}`,
                        state: {
                            exhibitPhotoModal: true,
                            backgroundLocation: history.location.state.backgroundLocation
                        }
                    })
                }
            }
            else if (direction === -1) {
                if (index < exhibitPhotosInfo.length && index > 0) {
                    history.replace({
                        pathname: `/exhibitPhoto/${exhibitPhotosInfo[index - 1].content_id}`,
                        state: {
                            exhibitPhotoModal: true,
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
        const { contentInfo, likeInfo } = this.state;
        let exhibitPhoto_id = Number(this.props.match.params.exhibitPhoto_id);

        await ContentService.likeContent(exhibitPhoto_id)
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
            .catch((err: any) => {
                console.error(err)
            })
    }

    deletePhoto = async () => {
        let exhibitPhoto_id = Number(this.props.match.params.exhibitPhoto_id);

        let goDrop = window.confirm("정말로 삭제하시겠습니까? 삭제한 게시글은 다시 복원할 수 없습니다.");
        if (goDrop) {
            await ExhibitPhotoService.deleteExhibitPhoto(exhibitPhoto_id)
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
        const { contentInfo, likeInfo, photoState, isFullscreen } = this.state;
        // const { my_id } = this.props;
        const { setPhotoState, likePhoto, deletePhoto, closePhoto } = this;

        let exhibitPhotoInfo = contentInfo && contentInfo.exhibitPhoto;
        let exhibitionInfo = contentInfo
            && contentInfo.exhibitPhoto
            && contentInfo.exhibitPhoto.exhibitionContent
            && contentInfo.exhibitPhoto.exhibitionContent.exhibition;
        let fullscreenClass = isFullscreen ? 'ri-fullscreen-exit-fill' : 'ri-fullscreen-fill';

        return (
            <AuthContext.Consumer>
                {authContext => (
                    <FullScreenPortal>
                        <div className="enif-modal-wrapper photo-popup" onClick={closePhoto}>
                            <div className="photo-section-wrapper" onClick={(e) => e.stopPropagation()}>
                                <div className="photo-alb-title-wrp">
                                    <div className="photo-alb-title">
                                        <h5>{exhibitionInfo ? exhibitionInfo.slogan : "slogan"}</h5>&nbsp;
                                        <i className="ri-image-2-line"></i>
                                        {exhibitPhotoInfo && exhibitPhotoInfo.order}
                                    </div>
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
                                            <Image imgSrc={exhibitPhotoInfo && exhibitPhotoInfo.file_path} />
                                            <div className="photo-move-action next" onClick={() => this.moveToPhoto(1)}>
                                                <i className="ri-arrow-right-s-line ri-icons enif-pointer"></i>
                                            </div>
                                            <div className="photo-action-fullscreen-wrapper">
                                                <i className={`${fullscreenClass} enif-pointer enif-f-1p2x`} onClick={this.clickFullscreen}></i>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        contentInfo &&
                                    <ExhibitPhotoComponent
                                        contentInfo={contentInfo}
                                        likeInfo={likeInfo}
                                        my_id={authContext.authInfo.user.user_id}
                                        // setPhotoState={setPhotoState}
                                        editPhoto={() => setPhotoState(ContentStateEnum.EDITTING)}
                                        likePhoto={likePhoto}
                                        deletePhoto={deletePhoto} />
                                    }
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
                                            <EditExhibitPhoto
                                                contentInfo={contentInfo}
                                                fetch={this.fetch}
                                                setPhotoState={this.setPhotoState} />
                                        </div>
                                    )
                                }
                                else if (photoState === ContentStateEnum.DELETED) {
                                    let backLink;
                                    if (!exhibitionInfo) {
                                        backLink = `/board/brd41`;
                                    }
                                    else {
                                        backLink = `/exhibition/${exhibitionInfo.content_id}`
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
                )}
            </AuthContext.Consumer>

        )
    }
}

export default ExhibitPhoto;
