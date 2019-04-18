import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/Image'

const MyPhotoList = ({photos}) => {

    const retrievePhotos = () => {

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
        <div className="my-list-wrapper">
            <h4>등록한 사진</h4>
            <div className="photo-list-wrapper">
                {retrievePhotos()}
            </div>
        </div>
    )
}

export default MyPhotoList;