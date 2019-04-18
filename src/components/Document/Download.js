import React from 'react';
import { SERVER_URL } from '../../common/environment'

const TAG = 'DOWNLOAD';


// recieved props { children, object_id, index }
class Download extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // url : /api/document/OBJ00000/download/0
        let url = SERVER_URL + 'api/document/' + this.props.object_id + '/download/' + this.props.index;
        return (
            <a href={url}>{this.props.children}</a>
        )
    }
}

export default Download;