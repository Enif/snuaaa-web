import React from 'react';

const TAG = 'PREVIEWIMAGE'

class PreviewImage extends React.Component {

    constructor(props) {
        super(props);
        console.log('[%s] constructor', TAG)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(this.props)
        console.log(nextProps)
        if(this.props.imgIdx === nextProps.imgIdx && this.props.uploadPhotos.length === nextProps.uploadPhotos.length) {
            console.log('false')
            return false
        }
        else {
            console.log('true')
            return true;
        }
    }

    selectedImg = () => {
        const { uploadPhotos, imgIdx } = this.props;
        if(uploadPhotos.length > 0 && imgIdx >= 0) {    
            let imgSrc = window.URL.createObjectURL(uploadPhotos[imgIdx])
            return (<img src={imgSrc} />)
        }
    }

    render() {
        console.log('[%s] render', TAG)
        return (
            <>
                {this.selectedImg()}
            </>
        )
    }
}

export default PreviewImage;
