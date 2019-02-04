import React from 'react';
import * as service from '../../services';

const TAG = 'CREATEPHOTO'

class CreatePhoto extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);

        this.state = {
            title: '',
            uploadPhoto: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state.title);
    }

    uploadFile = (e) => {
        this.state.uploadPhoto = e.target.files[0];
    }

    createPhotos = async () => {
        console.log('[%s] createPhotos', TAG);

        const photoInfo = new FormData();
        photoInfo.append('title', this.state.title);
        photoInfo.append('albumNo', this.props.albumNo);
        photoInfo.append('timestamp', (new Date).valueOf())
        photoInfo.append('uploadPhoto', this.state.uploadPhoto);
        
        await service.createPhotos(this.props.albumNo, photoInfo)
        .then(() => {
            console.log('[%s] Create Photos Success', TAG);
            this.props.togglePopUp();
        })
        .catch(() => {
            console.log('[%s] Create Photos Success', TAG);
            this.props.togglePopUp();
        })
    }

    render() {
        console.log('[%s] render', TAG)
        
        return (
            <div className="enif-popup">
                <div className="enif-popup-content">
                    <h3>사진 업로드</h3>
                    <button className="enif-btn-cancel" onClick={()=>this.props.togglePopUp()}> x </button>
                    <input type="text" name="title" placeholder="앨범 제목" onChange={(e) => this.handleChange(e)}/>
                    <input type="file" accept="image/*" onChange={(e) => this.uploadFile(e)} /* value={this.state.uploadPhoto} *//>
                    <button onClick={() => this.createPhotos()}>확인</button>
                </div>
            </div>            
        ) 
    }

    componentDidMount() {
        console.log('[%s] componentDidMount', TAG)
    }
}

export default CreatePhoto;