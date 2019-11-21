import React from 'react';

const ThumbnailList = ({ imgUrls, imgIdx, setImgIdx, removeImg }) => {

    const makeThumbnails = () => {

        const thumbnailList = imgUrls.map((imgUrl, index) => {
            let imgClass = index === imgIdx ? "photo-thumbnail selected" : "photo-thumbnail default";
            return (
                <div key={index} className="block-constant">
                    <div className="remove-icon-wrapper" onClick={() => removeImg(index)}>
                        <i className="ri-close-circle-line enif-pointer enif-f-1p5x"></i>
                    </div>
                    <img
                        className={imgClass}
                        src={imgUrl}
                        alt="thumbnail"
                        onClick={() => setImgIdx(index)} />
                </div>
            )
        })
        return thumbnailList
    }

    return (
        <>
            {makeThumbnails()}
        </>
    )
}

export default ThumbnailList;
