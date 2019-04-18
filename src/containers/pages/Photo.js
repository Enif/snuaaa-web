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
        this.tagInfo = undefined;
        this.state = {
            photo_id: this.props.match.params.pNo,
            likeInfo: false,
            isReady: false,
        }
        this.retrievePhoto(this.props.match.params.pNo);
    }

    retrievePhoto = async(photo_id) => {
        await service.retrievePhoto(photo_id)
        .then((res) => {
            this.photoInfo = res.data.photoInfo;
            this.tagInfo = res.data.tagInfo;
            this.setState({
                likeInfo: res.data.likeInfo,
                isReady: true
            })
        })
    }

    likePhoto = async() => {
        await service.likeObject(this.state.photo_id)
        .then(() => {
            if(this.state.likeInfo) {
                this.photoInfo.like_num--;
            }
            else {
                this.photoInfo.like_num++;
            }
            this.setState({
                likeInfo: !this.state.likeInfo
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }


    render() {
        let { isReady, likeInfo } = this.state;
        return(
            <>
            {
                (() => {
                    if(!isReady) return <Loading />
                    else return (
                        <div className="photo-section-wrapper">
                            <PhotoInfo photoInfo={this.photoInfo} likeInfo={likeInfo} tagInfo={this.tagInfo} likePhoto={this.likePhoto}/>
                            <Comment parent_id={this.state.photo_id}/>
                        </div>
                    )
                })()
            }
            </>
        )
    }
}

export default Photo;