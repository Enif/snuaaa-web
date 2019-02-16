import React from 'react';
import { Redirect } from 'react-router';
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
        this.photoId = undefined;
        this.state = {
            albumNo: this.props.match.params.aNo,
            albumState: 0,
            isAlbumReady: false,
            isPhotoListReady: false,
            popUpState: false,
            toPhoto: false,
        }
        this.retrieveAlbum(this.props.match.params.aNo);
        this.retrievePhotos(this.props.match.params.aNo);
    }
    
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[%s] getDerivedStateFromProps', TAG);
    //     return {
    //         boardNo: props.match.params.pbNo
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

    redirectPhoto = (photoId) => {
        this.photoId = photoId;
        this.setState({
            toPhoto: true
        })
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    render() {
        let {toPhoto, isAlbumReady, isPhotoListReady} = this.state
        console.log(this.albumInfo)
        return (
            <>
                {(() => {
                    if(toPhoto) {
                        return <Redirect to={`/photo/${this.photoId}`}/>
                    }
                    else if(isAlbumReady && isPhotoListReady) {
                        return (
                            <div className="album-wrapper">
                                <AlbumInfo albumInfo={this.albumInfo}/>
                                <PhotoList photos={this.photos} redirectPhoto={this.redirectPhoto} togglePopUp={this.togglePopUp}/>  
                            {
                                this.state.popUpState && <CreatePhoto albumNo={this.state.albumNo} togglePopUp={this.togglePopUp} />
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