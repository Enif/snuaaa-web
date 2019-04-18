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
                <div className="photo-wrapper" key={photo.object_id}>
                    <Link to={`/photo/${photo.object_id}`}>
                        <div className="photo-cover">
                            <i className="material-icons">favorite</i> {photo.like_num}&nbsp;
                            <i className="material-icons">comment</i> {photo.comment_num}
                        </div>
                        <Image imgSrc={photo.file_path} />
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