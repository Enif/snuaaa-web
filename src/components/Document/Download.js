import React from 'react';

const Download = ({content_id, index, children}) => {

    let url = process.env.REACT_APP_SERVER_URL + 'api/document/' + content_id + '/download/' + index;
    return (
        <a href={url}>{children}</a>
    )
}

export default Download;