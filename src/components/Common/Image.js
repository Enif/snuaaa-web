import React from 'react';
import { SERVER_URL } from '../../common/environment'

const Image = ({imgSrc, defaultImgSrc, className, onClick}) => {

    let imgUrl = SERVER_URL + 'static' + imgSrc;

    return (
        <img src={imgSrc ? imgUrl : defaultImgSrc} className={className} alt="Img" onClick={onClick} />
    )
}

export default Image;