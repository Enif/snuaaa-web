import React from 'react';
import * as service from '../../services'
import Loading from '../../components/Common/Loading';
import Image from '../../components/Common/Image';

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
                            <div className="photo-wrapper">
                                <Image imgSrc={photoInfo.file_path} />
                            </div>
                            <div className="photo-contents-wrapper">
                                <h4>{photoInfo.title}</h4>
                                <p>photo by <strong>{photoInfo.nickname}</strong></p>
                                <p>created {photoInfo.created_at}</p>
                            </div>
                        </div>
                    )
                })()
            }
            </>
        )
    }
}

export default Photo;