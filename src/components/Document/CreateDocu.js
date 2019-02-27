import React from 'react';
import * as service from '../../services';

const TAG = 'CREATEDOCU'

class CreateDocu extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);

        this.state = {
            generation: null,
            title: null,
            uploadFiles: null,
        }
    }

    componentDidMount() {
        let currentGen = 2 * ((new Date).getFullYear() - 1980)
        this.setState({
            generation: currentGen
        })
    }

    handleChange = (e) => {
        console.log(this.state)
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    uploadFile = (e) => {
        console.log()
        if(e.target.files.length > 3) {
            alert("파일은 최대 3개까지만 첨부해주세요.")
            e.target.value = null;
        }
        else {
            this.setState({
                uploadFiles: e.target.files
            })
        }
    }

    createDocu = async () => {
        console.log('[%s] createDocuments', TAG);
        if(!this.state.title) {
            alert("제목을 입력해주세요")
        }
        else if (!this.state.uploadFiles) {
            alert("파일을 첨부해주세요")
        }
        else {
            const docuInfo = new FormData();
            docuInfo.append('generation', this.state.generation);
            docuInfo.append('title', this.state.title);
            for(let i = 0, max = this.state.uploadFiles.length; i < max; i++) {
                docuInfo.append('uploadFiles', this.state.uploadFiles[i]); 
            }
            
            await service.createDocument(docuInfo)
            .then(() => {
                console.log('[%s] Create Docu Success', TAG);
                this.props.togglePopUp();
                this.props.retrieveDocuments()
            })
            .catch(() => {
                console.log('[%s] Create Docu Fail', TAG);
                this.props.togglePopUp();
            })    
        }
    }

    createGeneration = () => {
        let currentGen = 2 * ((new Date).getFullYear() - 1980)
        if((new Date).getMonth() > 5) currentGen++;
        let genOptions = [];
        for(let i = currentGen; i > 0; i--){
            genOptions.push(<option>{i}</option>)
        }
        return genOptions
    }

    render() {
        console.log('[%s] render', TAG)
        
        return (
            <div className="enif-popup">
                <div className="enif-popup-content">
                    <h3>파일 업로드</h3>
                    <select name="generation" onChange={(e) => this.handleChange(e)} value={this.state.generation}>
                        {this.createGeneration()}
                    </select>
                    <select name="category" onChange={(e) => this.handleChange(e)} value={this.state.category}>
                        <option>LT</option>
                        <option>총회</option>
                        <option>선본</option>
                        <option>디딤돌</option>
                        <option>기타</option>
                    </select>
                    <input type="text" name="title" placeholder="메모" onChange={(e) => this.handleChange(e)}/>
                    <input type="file" multiple onChange={(e) => this.uploadFile(e)} /* value={this.state.uploadPhoto} *//>
                    <button className="enif-btn-common enif-btn-ok" onClick={() => this.createDocu()}>OK</button>
                    <button className="enif-btn-common enif-btn-cancel" onClick={()=>this.props.togglePopUp()}>CANCEL</button>                    
                </div>
            </div>            
        ) 
    }
}

export default CreateDocu;