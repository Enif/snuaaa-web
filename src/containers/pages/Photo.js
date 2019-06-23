import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as service from 'services'
import Loading from 'components/Common/Loading';
import ContentStateEnum from 'common/ContentStateEnum';
import PhotoInfo from 'components/Photo/PhotoInfo';
import EditPhoto from 'containers/photo/EditPhoto';
import Comment from 'containers/Comment';

const TAG = 'PHOTO'

class Photo extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] constructor`);

        super(props);
        this.photoInfo = undefined;
        // this.tagInfo = undefined;
        this.albumInfo = undefined;
        this.state = {
            photo_id: this.props.match.params.pNo,
            likeInfo: false,
            photoState: ContentStateEnum.LOADING,
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = async() => {
        await service.retrievePhoto(this.props.match.params.pNo)
        .then((res) => {
            this.photoInfo = res.data.photoInfo;
            // this.tagInfo = res.data.tagInfo;
            this.albumInfo = res.data.albumInfo;
            this.setState({
                likeInfo: res.data.likeInfo,
                photoState: ContentStateEnum.READY
            })
        })
    }

    setPhotoState = (state) => {
        this.setState({
            photoState: state
        })
    }

    likePhoto = async() => {
        await service.likeObject(this.state.photo_id)
        .then(() => {
            if(this.state.likeInfo) {
                this.photoInfo.like_num--;
            }
            else {
                this.photoInfo.like_num++;
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
        if(goDrop) {
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
        let { likeInfo, photoState } = this.state;
        const { my_id } = this.props;

        return(
            <>
            {
                (() => {
                    if(photoState === ContentStateEnum.LOADING) {
                        return <Loading />
                    }
                    else if(photoState === ContentStateEnum.READY || photoState === ContentStateEnum.EDITTING) {
                        return (
                            <div className="photo-section-wrapper">
                                <PhotoInfo photoInfo={this.photoInfo} albumInfo={this.albumInfo} likeInfo={likeInfo}
                                    my_id={my_id} setPhotoState={this.setPhotoState} deletePhoto={this.deletePhoto} likePhoto={this.likePhoto}/>
                                <Comment parent_id={this.state.photo_id}/>
                                {
                                    photoState === ContentStateEnum.EDITTING &&
                                    <EditPhoto photoInfo={this.photoInfo} fetch={this.fetch} setPhotoState={this.setPhotoState} />
                                }
                            </div>
                        )
                    }
                    else if(photoState === ContentStateEnum.DELETED) {
                        let backLink;
                        if(!this.albumInfo) {
                            backLink = `/board/brd32`;
                        }
                        else {
                            backLink = `/album/${this.albumInfo.object_id}`
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