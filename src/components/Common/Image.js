import React from 'react';
import { SERVER_URL } from '../../common/environment'

const Image = ({imgSrc, defaultImgSrc}) => {

    let imgUrl = SERVER_URL + 'static' + imgSrc;

    return (
        <img src={imgSrc ? imgUrl : defaultImgSrc} alt="profileImg" />
    )
}

export default Image;