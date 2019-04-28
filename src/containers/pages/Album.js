import React from 'react';
import * as service from '../../services'
import Loading from '../../components/Common/Loading';
import PhotoList from '../../components/Album/PhotoList';
import CreatePhoto from '../../components/Album/CreatePhoto';
import AlbumInfo from '../../components/Album/AlbumInfo';

const TAG = 'ALBUM'

class Album extends React.Component {

    constructor(props) {
        super(props);
        this.photos = [];
        this.albumInfo = undefined;
        this.tagInfo = undefined;
        this.state = {
            album_id: this.props.match.params.aNo,
            isAlbumReady: false,
            isPhotoListReady: false,
            popUpState: false,
        }
    }

    componentDidMount() {
        this.retrieveAlbum(this.props.match.params.aNo);
        this.retrievePhotos(this.props.match.params.aNo);
    }
    
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[%s] getDerivedStateFromProps', TAG);
    //     return {
    //         board_id: props.match.params.pbNo
    //     }
    // }

    setIsAlbumReady = (isReady) => {
        this.setState({
            isAlbumReady: isReady
        })
    }

    setIsPhotoListReady = (isReady) => {
        this.setState({
            isPhotoListReady: isReady
        })
    }

    retrieveAlbum = async(album_id) => {
        await service.retrieveAlbum(album_id)
        .then((res) => {
            this.albumInfo = res.data.albumInfo;
            this.tagInfo = res.data.tagInfo;
            this.setState({
                isAlbumReady: true
            })
        })
    }

    retrievePhotos = async(album_id) => {
        await service.retrievePhotosInAlbum(album_id)
        .then((res) => {
            this.photos = res.data;
            this.setState({
                isPhotoListReady: true
            })
        })
        .catch((err) => {
            console.error(err)
            console.log('[%s] Retrieve Photos Fail', TAG);
        })
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    render() {
        let {isAlbumReady, isPhotoListReady} = this.state
        console.log(this.albumInfo)
        return (
            <>
                {(() => {
                    if(isAlbumReady && isPhotoListReady) {
                        return (
                            <div className="section-contents">
                                <div className="album-wrapper">
                                    <AlbumInfo albumInfo={this.albumInfo}/>
                                    <div className="enif-divider"></div>
                                    <PhotoList photos={this.photos} redirectPhoto={this.redirectPhoto} togglePopUp={this.togglePopUp}/>
                                    {
                                        this.state.popUpState && <CreatePhoto album_id={this.state.album_id} board_id={this.albumInfo.board_id} tags={this.tagInfo} retrievePhotos={this.retrievePhotos} togglePopUp={this.togglePopUp} />
                                    }
                                </div>
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

export default Album;