import React from 'react';
import * as service from '../../services';
import AlbumList from '../../components/PhotoBoard/AlbumList';
import CreateAlbum from '../../components/PhotoBoard/CreateAlbum';
import PhotoList from '../../components/Album/PhotoList';
import CreatePhoto from '../../components/Album/CreatePhoto';
import Loading from '../../components/Common/Loading';

const TAG = 'ASTROPHOTO'

class AstroPhoto extends React.Component {

    constructor(props) {
        super(props);
        this.albums = [];
        this.photos = [];
        this.state = {
            popUpState: false,
            isReady: false,
            isViewPhotos: false
        }
    }

    componentDidMount() {
        this.retrieveAlbums(this.props.board_id);
    }

    setIsReady = (isReady) => {
        this.setState({
            isReady: isReady
        })
    }

    setIsViewPhotos = (isViewPhotos) => {
        this.setState({
            isViewPhotos: isViewPhotos
        })
        if (!isViewPhotos) {
            this.retrieveAlbums(this.props.board_id);
        }
        else {
            this.retrievePhotos(this.props.board_id);
        }
    }

    retrieveAlbums = async (board_id) => {
        console.log('[%s] Retrieve Albums', TAG);
        this.setState({
            isReady: false
        })

        await service.retrieveAlbumsInPhotoBoard(board_id)
            .then((res) => {
                console.log('[%s] Retrieve Albums Success', TAG);
                this.albums = res.data;
                this.setState({
                    isReady: true
                })
            })
            .catch((err) => {
                console.error(`[${TAG}] Retrieve Photos Fail >> ${err}`)
            })
    }

    retrievePhotos = async (board_id) => {
        console.log('[%s] Retrieve Albums', TAG);
        this.setState({
            isReady: false
        })

        await service.retrievePhotosInPhotoBoard(board_id)
            .then((res) => {
                console.log('[%s] Retrieve Albums Success', TAG);
                this.photos = res.data;
                this.setState({
                    isReady: true
                })
            })
            .catch((err) => {
                console.error(`[${TAG}] Retrieve Photos Fail >> ${err}`)
            })
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    render() {

        let { isReady } = this.state;
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
                                {this.state.isViewPhotos ?
                                    (
                                        <>
                                            <PhotoList photos={this.photos} togglePopUp={this.togglePopUp} />
                                            {this.state.popUpState && <CreatePhoto board_id={board_id} retrievePhotos={this.retrievePhotos} togglePopUp={this.togglePopUp} />}
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <AlbumList board_id={board_id} albums={this.albums} togglePopUp={this.togglePopUp} />
                                            {this.state.popUpState && <CreateAlbum board_id={board_id} retrieveAlbums={this.retrieveAlbums} togglePopUp={this.togglePopUp} />}
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