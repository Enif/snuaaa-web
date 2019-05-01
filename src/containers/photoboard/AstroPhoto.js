import React from 'react';
import * as service from '../../services';
import AlbumList from '../../components/PhotoBoard/AlbumList';
import CreateAlbum from '../../components/PhotoBoard/CreateAlbum';
import PhotoList from '../../components/Album/PhotoList';
import CreatePhoto from '../../components/Album/CreatePhoto';
import Tag from '../../components/Common/Tag';
import Loading from '../../components/Common/Loading';

const TAG = 'ASTROPHOTO'

class AstroPhoto extends React.Component {

    constructor(props) {
        super(props);
        this.albums = [];
        this.photos = [];
        this.tags = [];

        this.state = {
            popUpState: false,
            isReady: false,
            isViewPhotos: false,
            selectedTags: []
        }
        console.log(`[${TAG}] constructor`);
    }

    componentDidMount() {
        this.fetch(this.state.isViewPhotos);
    }

    fetch = (isViewPhotos) => {
        const board_id = this.props.board_id;

        this.setIsReady(false);
        if(!isViewPhotos) {
            service.retrieveAlbumsInPhotoBoard(board_id)
            .then((res) => {
                this.albums = res.data;
                this.setIsReady(true);
            })
            .catch((err) => {
                console.error(err);
            })
        }
        else {
            Promise.all([
                service.retrieveTagsInBoard(board_id),
                service.retrievePhotosInPhotoBoard(board_id)
            ])
            .then((res) => {
                this.tags = res[0].data;
                this.photos = res[1].data;
                this.setIsReady(true);
            })
            .catch((err) => {
                console.error(err);
            })
        }
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
        this.fetch(isViewPhotos);
    }

    clickTag = (e) => {
        if(this.state.selectedTags.includes(e.target.id)) {
            let idx = this.state.selectedTags.indexOf(e.target.id);
            this.state.selectedTags.splice(idx, 1);
        }
        else {
            this.state.selectedTags.push(e.target.id)
        }
        this.setIsReady(false);

        if(this.state.selectedTags.length > 0) {
            service.retrievePhotosInPhotoBoardByTag(this.props.board_id ,this.state.selectedTags)
            .then((res) => {
                this.photos = res.data;
                this.setIsReady(true);
            })
            .catch((err) => {
                console.error(err);
            })
        }
        else {
            this.fetch(this.state.isViewPhotos);
        }
    }

    clickAll = () => {
        this.setState({
            selectedTags: []
        })
        this.fetch(this.state.isViewPhotos);
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
                                            <Tag tags={this.tags} clickAll={this.clickAll} selectedTags={this.state.selectedTags} clickTag={this.clickTag} />
                                            <PhotoList photos={this.photos} togglePopUp={this.togglePopUp} />
                                            {this.state.popUpState && <CreatePhoto board_id={board_id} tags={this.tags} retrievePhotos={this.fetch} togglePopUp={this.togglePopUp} />}
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <AlbumList board_id={board_id} albums={this.albums} togglePopUp={this.togglePopUp} />
                                            {this.state.popUpState && <CreateAlbum board_id={board_id} retrieveAlbums={this.fetch} togglePopUp={this.togglePopUp} />}
                                            <button className="enif-btn-circle enif-pos-sticky" onClick={() => this.togglePopUp()}>
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