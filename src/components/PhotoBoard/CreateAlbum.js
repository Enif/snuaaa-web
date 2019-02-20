import React from 'react';
import * as service from '../../services';

const TAG = 'CREATEALBUM'

class CreateAlbum extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);

        this.state = {
            title: '',
            contents: '',
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

        if(!this.state.title) {
            alert("제목을 입력해 주세요")
        }
        else {
            let albumInfo = {
                title: this.state.title,
                contents: this.state.contents
            }
            console.log(albumInfo);
            
            await service.createAlbum(this.props.boardNo, albumInfo)
            .then(() => {
                console.log('[%s] Create Album Success', TAG);
                this.props.togglePopUp();
                this.props.retrieveAlbums(this.props.boardNo)
            })
            .catch(() => {
                console.log('[%s] Create Album Success', TAG);
                this.props.togglePopUp();
            })
        }
    }

    render() {
        console.log('[%s] render', TAG)
     
        return (
            <div className="enif-popup">
                <div className="enif-popup-content">
                    <h3>앨범 생성</h3>
                    {/* <button className="enif-btn-cancel" onClick={()=>this.props.togglePopUp()}> x </button> */}
                    <div>
                        <input type="text" name="title" placeholder="앨범 제목" onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div>
                        <textarea name="contents" placeholder="앨범 설명" onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <button className="enif-btn-common enif-btn-ok" onClick={() => this.createAlbum()}>OK</button>
                    <button className="enif-btn-common enif-btn-cancel" onClick={()=>this.props.togglePopUp()} >CANCEL</button>
                </div>
            </div>
        ) 
    }

    componentDidMount() {
        console.log('[%s] componentDidMount', TAG)
    }
}

export default CreateAlbum;