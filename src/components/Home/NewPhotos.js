import React from 'react'
import { Link } from 'react-router-dom';
import Image from '../Common/Image';

const NewPhotos = ({ title, photos }) => {

    const makePhotoList = () => {
        if (photos) {
            return photos.map(photo => {
                return (
                    <div className="new-photo-list" key={photo.contentPhoto.content_id}>
                        <Link to={`/photo/${photo.contentPhoto.content_id}`}>
                            <Image imgSrc={photo.file_path} />
                        </Link>
                    </div>
                )
            })
        }
    }

    return (
        <div className="new-photos-wrapper">
            <h4>{title}</h4>
            <div className="new-photo-list-wrapper">
                {makePhotoList()}
            </div>
        </div>
    )
}

export default NewPhotos;
