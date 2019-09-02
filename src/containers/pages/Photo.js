import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as service from 'services'
import Loading from 'components/Common/Loading';
import ContentStateEnum from 'common/ContentStateEnum';
import PhotoInfo from 'components/Photo/PhotoInfo';
import EditPhoto from 'containers/Photo/EditPhoto';
import Comment from 'containers/Comment';
import history from 'common/history';
import BoardName from '../../components/Board/BoardName';

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
            photo_id: this.props.match.params.pNo,
            likeInfo: false,
            photoState: ContentStateEnum.LOADING,
            isFullscreen: false
        }
    }

    componentDidMount() {
        this.fetch();
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
        console.log('[%s] getDerivedStateFromProps', TAG);
        return {
            photo_id: props.match.params.pNo,
            // photoState: ContentStateEnum.LOADING
        }
    }

    fetch = async (photo_id) => {
        this.setPhotoState({
            photoState: ContentStateEnum.LOADING
        })
        if (!photo_id) {
            photo_id = this.props.match.params.pNo
        }
        await service.retrievePhoto(photo_id)
            .then((res) => {
                this.photoInfo = res.data.photoInfo;
                // this.tagInfo = res.data.tagInfo;
                this.albumInfo = res.data.photoInfo.album;
                this.boardTagInfo = res.data.boardTagInfo
                this.albumPhotosInfo = res.data.albumPhotosInfo;
                console.log(res.data)
                this.setState({
                    likeInfo: res.data.likeInfo,
                    photoState: ContentStateEnum.READY
                })
            })
            .catch((err) => {
                console.error(err);
            })
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
                    history.push(`/photo/${albumPhotosInfo[index + 1].content_id}`)
                }
            }
            else if (direction === -1) {
                if (index < albumPhotosInfo.length && index > 0) {
                    history.push(`/photo/${albumPhotosInfo[index - 1].content_id}`)
                }
            }
        }
    }

    toggleFullscreen = () => {
        const elem = this.fullscreenRef.current;
        const { isFullscreen } = this.state;

        if(isFullscreen) {
            this.setState({
                isFullscreen: false
            })
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
            this.setState({
                isFullscreen: true
            })
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
        await service.likeObject(this.state.photo_id)
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
            await service.deletePhoto(this.state.photo_id)
                .then(() => {
                    alert("게시글이 삭제되었습니다.");
                    this.setPhotoState(ContentStateEnum.DELETED);
                })
                .catch((err) => {
                    console.error(err);
                    alert("삭제 실패");
                })
        }
    }

    render() {
        let { likeInfo, photoState, isFullscreen } = this.state;
        const { my_id } = this.props;

        return (
            <>
                {
                    (() => {
                        if (photoState === ContentStateEnum.LOADING) {
                            return <Loading />
                        }
                        else if (photoState === ContentStateEnum.READY || photoState === ContentStateEnum.EDITTING) {
                            return (
                                <div className="photo-section-wrapper">
                                    {/* <BoardName board_id={this.photoInfo.contentPhoto.board.board_id} board_name={this.photoInfo.contentPhoto.board.board_name} /> */}
                                    <PhotoInfo photoInfo={this.photoInfo} albumInfo={this.albumInfo} likeInfo={likeInfo}
                                        moveToPhoto={this.moveToPhoto} isFullscreen={isFullscreen} fullscreenRef={this.fullscreenRef} toggleFullscreen={this.toggleFullscreen}
                                        my_id={my_id} setPhotoState={this.setPhotoState} deletePhoto={this.deletePhoto} likePhoto={this.likePhoto} />
                                    <Comment parent_id={this.state.photo_id} />
                                    {
                                        photoState === ContentStateEnum.EDITTING &&
                                        <EditPhoto photoInfo={this.photoInfo} boardTagInfo={this.boardTagInfo} fetch={this.fetch} setPhotoState={this.setPhotoState} />
                                    }
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
                            <div>ERROR PAGE</div>
                        )
                    })()
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        my_id: state.authentication.user_id
    }
}

export default connect(mapStateToProps, null)(Photo);