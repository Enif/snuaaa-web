import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/Image'

const MyPhotoList = ({photos}) => {

    const makePhotoList = () => {

        let photoList = photos.map(photo => {
            let contentInfo = photo.contentPhoto;
            return (
                <div className="photo-wrapper" key={contentInfo.content_id}>
                    <Link to={`/photo/${contentInfo.content_id}`}>
                        <div className="photo-cover">
                            <i className="material-icons">favorite</i> {contentInfo.like_num}&nbsp;
                            <i className="material-icons">comment</i> {contentInfo.comment_num}
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
            <div className="photo-list-wrapper my-photo-list-wrapper">
                {makePhotoList()}
            </div>
        </div>
    )
}

export default MyPhotoList;