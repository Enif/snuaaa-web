import React from 'react';

const TAG = 'THUMBNAILLIST'

class ThumbnailList extends React.Component {

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

    makeThumbnails = () => {
        console.log('[%s] makeThumnails', TAG)
        const { uploadPhotos, imgIdx } = this.props;

        const thumbnailList = uploadPhotos.map((file, index) => {
            let imgSrc = URL.createObjectURL(file)
            let imgClass = index === imgIdx ? "photo-thumbnail selected" : "photo-thumbnail default";
            return(<img key={index} className={imgClass} src={imgSrc} onClick={() => this.props.setImgIdx(index)} />)
        })
        return thumbnailList
    }

    render() {
        console.log('[%s] render', TAG)
        return (
            <>
                {this.makeThumbnails()}
            </>
        )
    }
}

export default ThumbnailList;