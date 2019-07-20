import React from 'react';

const Download = ({object_id, index, children}) => {

    let url = process.env.REACT_APP_SERVER_URL + 'api/document/' + object_id + '/download/' + index;
    return (
        <a href={url}>{children}</a>
    )
}

export default Download;