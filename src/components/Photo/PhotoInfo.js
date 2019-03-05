import React from 'react';
import Image from '../Common/Image';

const PhotoInfo = (props) => {

    return (
        <>
            <div className="photo-wrapper">
                <Image imgSrc={props.photoInfo.file_path} />
            </div>
            <div className="photo-contents-wrapper">
                <h4>{props.photoInfo.title}</h4>
                <p>photo by <strong>{props.photoInfo.nickname}</strong></p>
                <p>created {props.photoInfo.created_at}</p>
            </div>
        </>
    )
}

export default PhotoInfo;