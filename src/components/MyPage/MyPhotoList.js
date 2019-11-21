import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/Image'
import history from 'common/history';

const MyPhotoList = ({ photos }) => {

    const makePhotoList = () => {

        if (photos && photos.length > 0) {
            return photos.map(photo => {
                let contentInfo = photo.contentPhoto;
                return (
                    <div className="photo-wrapper" key={contentInfo.content_id}>
                        <Link to={{
                            pathname: `/photo/${contentInfo.content_id}`,
                            state: {
                                modal: true,
                                backgroundLocation: history.location
                            }
                        }}>
                            <div className="photo-cover">
                                <i className="ri-heart-fill"></i> {contentInfo.like_num}&nbsp;
                                <i className="ri-message-fill"></i> {contentInfo.comment_num}
                            </div>
                            <Image imgSrc={photo.thumbnail_path} />
                        </Link>
                    </div>
                )
            })
        }
    }

    return (
        <div className="my-list-wrapper">
            {/* <h4>등록한 사진</h4> */}
            <div className="photo-list-wrapper my-photo-list-wrapper">
                {makePhotoList()}
            </div>
        </div>
    )
}

export default MyPhotoList;