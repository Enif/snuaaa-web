import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/Image'

const TAG = 'PHOTOLIST'

class PhotoList extends React.Component {

    constructor(props) {
        super(props);
    }

    retrievePhotos = () => {
        console.log('[%s] Retrieve Photos', TAG);

        let photos = this.props.photos
        let photoList = photos.map(photo => {
            return (
                <div className="photo-wrapper" >
                    <Link to={`/photo/${photo.object_id}`}>
                        <Image imgSrc={photo.file_path} />
                        <div className="photo-title">
                            {photo.title}
                        </div>
                    </Link>
                </div>
            )
        })
        return photoList
    }

    render() {
        console.log('[%s] render', TAG)
        return (
            <div className="board-wrapper">
                <div className="photo-list-wrapper">
                    {this.retrievePhotos()}
                </div>
                <button className="enif-btn-circle" onClick={() => this.props.togglePopUp()}>+</button>
            </div>
        )
    }
}

export default PhotoList;