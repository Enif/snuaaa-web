import React from 'react';
import * as service from '../../services';

const TAG = 'CREATEALBUM'

class CreateAlbum extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);

        this.state = {
            title: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state.title);
    }

    createAlbum = async () => {
        console.log('[%s] createAlbum', TAG);
        let albumInfo = {
            title: this.state.title
        }
        console.log(albumInfo);
        
        await service.createAlbum(this.props.boardNo, albumInfo)
        .then(() => {
            console.log('[%s] Create Album Success', TAG);
            this.props.togglePopUp();
        })
        .catch(() => {
            console.log('[%s] Create Album Success', TAG);
            this.props.togglePopUp();
        })
    }

    render() {
        console.log('[%s] render', TAG)
        
        return (
            <div className="enif-popup">
                <div className="enif-popup-content">
                    <h3>앨범 생성</h3>
                    <button className="enif-btn-cancel" onClick={()=>this.props.togglePopUp()}> x </button>
                    <input type="text" name="title" placeholder="앨범 제목" onChange={(e) => this.handleChange(e)}/>
                    <button onClick={() => this.createAlbum()}>확인</button>
                </div>
            </div>            
        ) 
    }

    componentDidMount() {
        console.log('[%s] componentDidMount', TAG)
    }
}

export default CreateAlbum;