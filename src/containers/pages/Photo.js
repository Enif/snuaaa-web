import React from 'react';
import * as service from '../../services'
import Loading from '../../components/Common/Loading';
import PhotoInfo from '../../components/Photo/PhotoInfo';
import Comment from '../Comment';

const TAG = 'PHOTO'

class Photo extends React.Component {

    constructor(props) {
        super(props);
        this.photoInfo = undefined;
        this.state = {
            photoNo: this.props.match.params.pNo,
            isReady: false,
        }
        this.retrievePhoto(this.props.match.params.pNo);
    }

    retrievePhoto = async(photoNo) => {
        await service.retrievePhoto(photoNo)
        .then((res) => {
            this.photoInfo = res.data;
            this.setState({
                isReady: true
            })
        })
    }


    render() {
        let photoInfo = this.photoInfo;
        let { isReady } = this.state;
        return(
            <>
            {
                (() => {
                    if(!isReady) return <Loading />
                    else return (
                        <div className="photo-section-wrapper">
                            <PhotoInfo photoInfo={photoInfo} />
                            <Comment parent_id={this.state.photoNo}/>
                        </div>
                    )
                })()
            }
            </>
        )
    }
}

export default Photo;