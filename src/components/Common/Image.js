import React from 'react';
import { SERVER_URL } from '../../common/environment'

const TAG = 'IMAGE';

class Image extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            imgSrc: SERVER_URL + 'api' + this.props.imgSrc
        }
    }

    render() {
        let { imgSrc } = this.state;

        return (
            <img src={this.props.imgSrc ? imgSrc : this.props.defaultImgSrc} alt="profileImg" />
        )
    }
}

export default Image;