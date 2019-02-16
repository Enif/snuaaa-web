import React from 'react';

const AlbumInfo = (props) => {
    return (
        <div className="album-info">
            <h5>{props.albumInfo.title}</h5>
            <p>{props.albumInfo.contents}</p>
        </div>
    )
}

export default AlbumInfo;