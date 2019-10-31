import React from 'react'
import { Link } from 'react-router-dom';
import Image from '../Common/Image';
import history from 'common/history';

const NewPhotos = ({ title, board_id, photos }) => {

    const makePhotoList = () => {
        if (photos) {
            return photos.map(photo => {
                return (
                    <div className="new-photo-list" key={photo.content_id}>
                        <Link to={{
                            pathname: `/photo/${photo.content_id}`,
                            state: {
                                modal: true,
                                backgroundLocation: history.location
                            }
                        }}>
                            <Image imgSrc={photo.photo.thumbnail_path} />
                        </Link>
                    </div>
                )
            })
        }
    }

    return (
        <div className="new-photos-wrapper">
            <Link to={`/board/${board_id}`}>
                <h4>{title}</h4>
            </Link>
            <div className="new-photo-list-wrapper">
                {makePhotoList()}
            </div>
        </div>
    )
}

export default NewPhotos;
