import React from 'react';

const PreviewImage = ({ imgUrls, imgIdx }) => {

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
