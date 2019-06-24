import React from 'react';
import { SERVER_URL } from 'common/environment'

const DownloadFile = ({content_id, file_id, children}) => {

    let url = SERVER_URL + `api/content/${content_id}/file/${file_id}`;
    return (
        <a href={url}>{children}</a>
    )
}

export default DownloadFile;