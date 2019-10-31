import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'components/Common/Image';
import history from 'common/history';

const ExhibitPhotoList = ({ exhibitPhotos }) => {

    const makePhotoList = () => {
        if (exhibitPhotos && exhibitPhotos.length > 0) {
            return exhibitPhotos.map(content => {
                let exhibitPhoto = content.exhibitPhoto;
                return (
                    <div className="photo-wrapper" key={content.content_id}>
                        <Link to={{
                            pathname: `/exhibitPhoto/${content.content_id}`,
                            state: {
                                exhibitPhotoModal: true,
                                backgroundLocation: history.location
                            }
                        }} >
                            <div className="photo-cover">
                                <i className="material-icons">favorite</i>
                                <p>{content.like_num}</p>
                                &nbsp;
                                <i className="material-icons">comment</i>
                                <p>{content.comment_num}</p>
                            </div>
                            <Image imgSrc={exhibitPhoto.thumbnail_path} />
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

export default ExhibitPhotoList;