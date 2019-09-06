import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'components/Common/Image';

const PhotoList = ({ photos, togglePopUp }) => {

    const makePhotoList = () => {
        if (photos.length > 0) {
            return photos.map(photo => {
                let contentInfo = photo.contentPhoto;
                return (
                    <div className="photo-wrapper" key={contentInfo.content_id}>
                        <Link to={`/photo/${contentInfo.content_id}`}>
                            <div className="photo-cover">
                                <i className="material-icons">favorite</i>
                                <p>{contentInfo.like_num}</p>
                                &nbsp;
                                <i className="material-icons">comment</i>
                                <p>{contentInfo.comment_num}</p>
                            </div>
                            <Image imgSrc={photo.thumbnail_path} />
                        </Link>
                    </div>
                )
            })
        }
    }

    return (
        <>
            <div className="photo-list-wrapper">
                {makePhotoList()}
            </div>

        </>
    )
}

export default PhotoList;