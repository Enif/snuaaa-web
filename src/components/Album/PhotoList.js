import React from 'react';
import * as service from '../../services';
import Loading from '../Common/Loading';
import Photo from './Photo';
import Image from '../Common/Image'
import defaultAlbumCover from '../../assets/img/default_photo_img.png'


const TAG = 'PHOTOLIST'

class PhotoList extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);
        this.photos = [];
        this.state = {
            albumNo: this.props.albumNo,
            isShow: false,
            popUpState: false,
        }
        this.retrievePhotos(this.state.albumNo);
    }


    retrievePhotos = async(albumNo) => {
        console.log('[%s] Retrieve Photos', TAG);

        await service.retrievePhotosInAlbum(albumNo)
        .then((res) => {
            console.log('[%s] Retrieve Photos Success', TAG);
            const photoData = res.data;
            let photos = photoData.map(photo => {
                return (
                    <div className="photo-wrapper" onClick={(e) => this.clickPhoto(photo._id, e)}>
                        <Image imgSrc={photo.file_path}/>
                        <div className="photo-title">
                            {photo.title}
                        </div>
                    </div>
                )
            })
            this.photos = photos;
            this.setState({
                isShow: true
            })
        })
        .catch((res) => {
            console.log('[%s] Retrieve Photos Fail', TAG);
        })
    }

    render() {
        console.log('[%s] render', TAG)
        let { isShow } = this.state;
        return (
            <React.Fragment>
            {
                isShow ?
                (
                    <div>
                        <div className="photo-list-wrapper">
                            {this.photos}
                        </div>
                    </div>    
                )
                :
                (
                    <Loading/>
                )
            }
                <button className="enif-btn-circle" onClick={() => this.props.togglePopUp()}>+</button>
             
            </React.Fragment>
        ) 
    }

    componentDidMount() {
        console.log('[%s] componentDidMount', TAG)
    }
}

export default PhotoList;