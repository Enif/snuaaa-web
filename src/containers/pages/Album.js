import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import ContentStateEnum from 'common/ContentStateEnum';
import Loading from 'components/Common/Loading';
import PhotoList from 'components/Album/PhotoList';
import AlbumInfo from 'components/Album/AlbumInfo';
import EditAlbum from 'containers/Album/EditAlbum';
import CreatePhoto from 'containers/Photo/CreatePhoto';
import BoardName from '../../components/Board/BoardName';
import AlbumService from 'services/AlbumService';

const TAG = 'ALBUM'

class Album extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] Constructor`)
        super(props);
        this.photos = [];
        this.albumInfo = undefined;
        this.categoryInfo = undefined;
        this.tagInfo = undefined;
        this.state = {
            album_id: this.props.match.params.album_id,
            albumState: ContentStateEnum.LOADING,
            popUpState: false
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = async () => {
        await Promise.all([
            AlbumService.retrieveAlbum(this.props.match.params.album_id),
            AlbumService.retrievePhotosInAlbum(this.props.match.params.album_id)
        ])
            .then((infos) => {
                this.albumInfo = infos[0].data.albumInfo;
                this.categoryInfo = infos[0].data.categoryInfo;
                this.tagInfo = infos[0].data.tagInfo;
                this.photos = infos[1].data
                this.setState({
                    albumState: ContentStateEnum.READY
                })
            })
            .catch((err) => {
                console.error(err);
            })
    }

    deleteAlbum = async () => {

        let goDrop = window.confirm("정말로 삭제하시겠습니까? 삭제한 게시글은 다시 복원할 수 없습니다.");
        if (goDrop) {
            await AlbumService.deleteAlbum(this.props.match.params.album_id)
                .then(() => {
                    this.setAlbumState(ContentStateEnum.DELETED);
                })
                .catch((err) => {
                    console.error(err);
                    alert("삭제 실패");
                })
        }
    }

    setAlbumState = (state) => {
        this.setState({
            albumState: state
        })
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    render() {
        let { album_id, albumState, popUpState } = this.state
        const { my_id } = this.props;

        return (
            <>
                {
                    (() => {
                        if (albumState === ContentStateEnum.LOADING) {
                            return <Loading />
                        }
                        else if (albumState === ContentStateEnum.READY || albumState === ContentStateEnum.EDITTING) {
                            return (
                                <>
                                    <BoardName
                                        board_id={this.albumInfo.content.board.board_id}
                                        board_name={this.albumInfo.content.board.board_name}
                                    />
                                    <div className="album-wrapper">
                                        <AlbumInfo albumInfo={this.albumInfo} my_id={my_id} setAlbumState={this.setAlbumState} deleteAlbum={this.deleteAlbum} />
                                        {
                                            (!this.albumInfo.is_private || my_id === this.albumInfo.content.user.user_id) &&
                                            <button className="board-btn-write" onClick={this.togglePopUp}>
                                                <i className="ri-image-line enif-f-1p2x"></i>사진 업로드
                                        </button>

                                        }
                                        <div className="enif-divider"></div>
                                        <PhotoList album_id={album_id} photos={this.photos} togglePopUp={this.togglePopUp} />
                                        {
                                            popUpState && <CreatePhoto album_id={album_id} board_id={this.albumInfo.content.board_id} tags={this.tagInfo} retrievePhotos={this.retrievePhotos} fetch={this.fetch} togglePopUp={this.togglePopUp} setReadyState={() => this.setAlbumState(ContentStateEnum.READY)} />
                                        }
                                        {
                                            (albumState === ContentStateEnum.EDITTING) &&
                                            <EditAlbum album_id={album_id} albumInfo={this.albumInfo} categoryInfo={this.categoryInfo} fetch={this.fetch} setAlbumState={this.setAlbumState} />
                                        }
                                    </div>
                                    {/* <Route path="/album/:album_id/photo/:photo_id" component={Photo} /> */}
                                </>
                            )
                        }
                        else if (albumState === ContentStateEnum.DELETED) {
                            return (
                                <Redirect to={`/board/${this.albumInfo.content.board_id}`} />
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

const mapStateToProps = (state) => {
    return {
        my_id: state.authentication.user_id
    }
}

export default connect(mapStateToProps, null)(Album);
