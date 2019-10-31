import React from 'react';

const Image = ({ imgSrc, defaultImgSrc, className, onClick, local, ...rest }) => {

    let imgUrl;
    if (local) {
        imgUrl = imgSrc
    } else {
        imgUrl = process.env.REACT_APP_SERVER_URL + 'static' + imgSrc;
    }

    return (
        <img src={imgSrc ? imgUrl : defaultImgSrc} className={className} alt="Img" onClick={onClick} {...rest} />
    )
}

export default Image;