import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'components/Common/Image';

const PhotoList = ({ photos }) => {

    const makePhotoList = () => {
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

    return (
        <div className="board-wrapper">
            <div className="photo-list-wrapper">
                {makePhotoList()}
            </div>
            <button className="enif-btn-circle enif-pos-sticky" onClick={() => this.props.togglePopUp()}>
                <i className="material-icons">add_photo_alternate</i>
            </button>
        </div>
    )
}

export default PhotoList;