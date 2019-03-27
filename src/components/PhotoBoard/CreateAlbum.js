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

    makeCategoryList = () => {
        let CategoryList = this.props.categories.map((category) => {
            return (
                <>
                    <input type="radio" id={category.category_id} name="category" value={category.category_id}
                    checked={this.state.checkedCategory === category.category_id} onChange={this.handleCategoryChange}/>
                    <label htmlFor={category.category_id}>{category.category_name}</label>
                </>
            )
        })
        return CategoryList;
    }

    createAlbum = async () => {
        console.log('[%s] createAlbum', TAG);

        if(!this.state.title) {
            alert("제목을 입력해 주세요")
        }
        else if(this.props.categories && !this.state.checkedCategory) {
            alert("카테고리를 선택해 주세요")
        }
        else {
            let albumInfo = {
                category_id: this.state.checkedCategory,
                title: this.state.title,
                contents: this.state.contents
            }
            
            await service.createAlbum(this.props.board_id, albumInfo)
            .then(() => {
                console.log('[%s] Create Album Success', TAG);
                this.props.togglePopUp();
                this.props.retrieveAlbums(this.props.board_id)
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
                    <div className="categories-wrapper">
                        {this.props.categories && this.makeCategoryList()}
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