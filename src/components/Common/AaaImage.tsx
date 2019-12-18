import React from 'react';

type ImageProps = {
    imgSrc?: string;
    defaultImgSrc?: string;
    className?: string;
    onClick?: () => void;
    local?: boolean;
}


const AaaImage = ({ imgSrc, defaultImgSrc, className, onClick, local, ...rest }: ImageProps) => {

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

export default AaaImage;