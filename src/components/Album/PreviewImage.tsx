import React from 'react';

type PreviewImageProps = {
    imgUrls: string;
    imgIdx: number;
}

function PreviewImage ({ imgUrls, imgIdx }: PreviewImageProps) {

    const selectedImg = () => {
        if (imgUrls.length > 0 && imgIdx >= 0) {
            return (<img src={imgUrls[imgIdx]} alt="previewImg" />)
        }
    }

    return (
        <>
            {selectedImg()}
        </>
    )
}

export default PreviewImage;
