import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../components/Common/AaaImage';
import history from '../../common/history';
import ContentType from '../../types/ContentType';
import PhotoType from '../../types/PhotoType';

type PhotoListProps = {
    photos: PhotoType[];
}

function PhotoList({ photos }: PhotoListProps) {

    const makePhotoList = () => {
        if (photos.length > 0) {
            return photos.map(content => {
                let contentInfo = content;
                let photo = content.photo;
                if (photo) {
                    return (
                        <div className="photo-wrapper" key={contentInfo.content_id}>
                            <Link to={{
                                pathname: `/photo/${contentInfo.content_id}`,
                                state: {
                                    modal: true,
                                    backgroundLocation: history.location
                                }
                            }} >
                                <div className="photo-cover">
                                    <div className="photo-cover-unit">
                                        <i className="ri-heart-fill"></i>
                                        <p>{contentInfo.like_num}</p>
                                    </div>
                                    <div className="photo-cover-unit">
                                        <i className="ri-message-2-fill"></i>
                                        <p>{contentInfo.comment_num}</p>
                                    </div>
                                </div>
                                <Image imgSrc={photo.thumbnail_path} />
                            </Link>
                        </div>
                    )
                }
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