import React from 'react';
import Image from '../Common/Image';
import { convertFullDate } from '../../utils/convertDate'

const PhotoInfo = (props) => {

    return (
        <>
            <div className="photo-wrapper">
                <Image imgSrc={props.photoInfo.file_path} />
            </div>
            <div className="photo-contents-wrapper">
                <div className="info-wrapper">
                    <h4>{props.photoInfo.title}</h4>
                    {/* <p>photo by <strong>{props.photoInfo.nickname}</strong></p> */}
                    <p>created {convertFullDate(props.photoInfo.created_at)}</p>                
                </div>
                <div className="user-wrapper">
                    <Image imgSrc={props.photoInfo.profile_path}/>
                    <p className="username">{props.photoInfo.nickname}</p>
                </div>
            </div>
        </>
    )
}

export default PhotoInfo;