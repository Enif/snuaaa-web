import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as service from '../../services'
import Loading from '../../components/Common/Loading';
import PhotoList from '../../components/Album/PhotoList';
import CreatePhoto from '../../components/Album/CreatePhoto';
import AlbumInfo from '../../components/Album/AlbumInfo';
import ContentStateEnum from '../../common/ContentStateEnum';
import EditAlbum from '../album/EditAlbum';

const TAG = 'ALBUM'

class Album extends React.Component {

    constructor(props) {
        super(props);
        this.photos = [];
        this.albumInfo = undefined;
        this.tagInfo = undefined;
        this.state = {
            album_id: this.props.match.params.aNo,
            albumState: ContentStateEnum.LOADING,
            popUpState: false
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = async() => {
        await Promise.all([
            service.retrieveAlbum(this.props.match.params.aNo),
            service.retrievePhotosInAlbum(this.props.match.params.aNo)
        ])
        .then((infos) => {
            this.albumInfo = infos[0].data.albumInfo;
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

    deleteAlbum = async() => {
        await service.deleteAlbum(this.props.match.params.aNo)
        .then(() => {
            // this.
            this.setAlbumState(ContentStateEnum.DELETED);
        })
        .catch((err) => {
            console.error(err)
        })
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
        // console.log(this.albumInfo)
        return (
            <>
            {
                (() => {
                    if(albumState === ContentStateEnum.LOADING) {
                        return <Loading />
                    }
                    else if(albumState === ContentStateEnum.READY || albumState === ContentStateEnum.EDITTING) {
                        return (
                            <div className="section-contents">
                                <div className="album-wrapper">
                                    <AlbumInfo albumInfo={this.albumInfo} my_id={my_id} setAlbumState={this.setAlbumState} deleteAlbum={this.deleteAlbum} />
                                    <div className="enif-divider"></div>
                                    <PhotoList photos={this.photos} redirectPhoto={this.redirectPhoto} togglePopUp={this.togglePopUp}/>
                                    {
                                        popUpState && <CreatePhoto album_id={album_id} board_id={this.albumInfo.board_id} tags={this.tagInfo} retrievePhotos={this.retrievePhotos} fetch={this.fetch} togglePopUp={this.togglePopUp} />
                                    }
                                    {
                                        (albumState === ContentStateEnum.EDITTING) &&
                                        <EditAlbum album_id={album_id} albumInfo={this.albumInfo} fetch={this.fetch} setAlbumState={this.setAlbumState} />
                                    }
                                </div>
                            </div>
                        )
                    }
                    else if (albumState === ContentStateEnum.DELETED) {
                        return (
                            <Redirect to={`/board/${this.albumInfo.board_id}`} />
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
