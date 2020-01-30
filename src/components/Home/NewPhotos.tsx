import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import Image from '../Common/AaaImage';
import ContentType from '../../types/ContentType';

type NewPhotosProps = {
    title: string;
    board_id: string;
    photos: ContentType[];
}

function NewPhotos({ title, board_id, photos }: NewPhotosProps) {

    const history = useHistory();
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
                            {
                                photo.photo &&
                                <Image imgSrc={photo.photo.thumbnail_path} />
                            }
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
