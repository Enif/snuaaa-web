import React from 'react';

const AlbumInfo = (props) => {
    return (
        <div className="album-info">
            <div className="alb-title-wrapper">
                <h5 className="alb-title">{props.albumInfo.title}</h5>
                <p className="alb-author">{props.albumInfo.nickname}</p>
            </div>
            <div>
                <p className="contents">{props.albumInfo.contents}</p>
            </div>
        </div>
    )
}

export default AlbumInfo;