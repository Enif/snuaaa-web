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
        this.state = {
            albumNo: this.props.match.params.aNo,
            isAlbumReady: false,
            isPhotoListReady: false,
            popUpState: false,
        }
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

    retrieveAlbum = async(albumNo) => {
        await service.retrieveAlbum(albumNo)
        .then((res) => {
            this.albumInfo = res.data;
            this.setState({
                isAlbumReady: true
            })
        })
    }

    retrievePhotos = async(albumNo) => {
        await service.retrievePhotosInAlbum(albumNo)
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
                            <div className="album-wrapper">
                                <AlbumInfo albumInfo={this.albumInfo}/>
                                <div className="enif-divider"></div>
                                <PhotoList photos={this.photos} redirectPhoto={this.redirectPhoto} togglePopUp={this.togglePopUp}/>  
                                {
                                    this.state.popUpState && <CreatePhoto albumNo={this.state.albumNo} retrievePhotos={this.retrievePhotos} togglePopUp={this.togglePopUp} />
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

export default Album;