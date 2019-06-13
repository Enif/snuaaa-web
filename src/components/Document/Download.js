import React from 'react';
import { SERVER_URL } from 'common/environment'

const Download = ({object_id, index, children}) => {

    let url = SERVER_URL + 'api/document/' + object_id + '/download/' + index;
    return (
        <a href={url}>{children}</a>
    )
}

export default Download;