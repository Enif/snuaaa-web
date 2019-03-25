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
            checkedCategory: ''
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
                category_id: this.state.checkedCategory,
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
            .catch((err) => {
                console.log('[%s] Create Album Fail', TAG);
                console.error(err)
                this.props.togglePopUp();
            })
        }
    }

    handleCategoryChange = (e) => {
        this.setState({
            checkedCategory: e.target.value
        })
    }

    render() {
        console.log('[%s] render', TAG)
     
        return (
            <div className="enif-popup">
                <div className="enif-popup-content">
                    <h3>앨범 생성</h3>
                    {/* <button className="enif-btn-cancel" onClick={()=>this.props.togglePopUp()}> x </button> */}
                    <div>
                        <input type="radio" id="ctg-event" name="category" value="ctg001"
                        checked={this.state.checkedCategory === 'ctg001'} onChange={this.handleCategoryChange}/>
                        <label htmlFor="ctg-event">행사</label>

                        <input type="radio" id="ctg-observe" name="category" value="ctg002"
                        checked={this.state.checkedCategory === 'ctg002'} onChange={this.handleCategoryChange}/>
                        <label htmlFor="ctg-observe">관측</label>

                        <input type="radio" id="ctg-friendship" name="category" value="ctg003"
                        checked={this.state.checkedCategory === 'ctg003'} onChange={this.handleCategoryChange}/>
                        <label htmlFor="ctg-friendship">친목</label>
                    </div>
                    <div className="input-text">
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