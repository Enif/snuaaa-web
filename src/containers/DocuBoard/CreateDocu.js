import React from 'react';
import * as service from 'services';

const TAG = 'CREATEDOCU'

class CreateDocu extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);

        this.state = {
            generation: "",
            title: "",
            category: null,
            uploadFiles: [],
        }
    }

    componentDidMount() {
        let currentGen = 2 * ((new Date()).getFullYear() - 1980)
        this.setState({
            generation: currentGen
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    uploadFile = (e) => {
        const { uploadFiles } = this.state;
        if (e.target.files.length + uploadFiles.length > 3) {
            alert("파일은 최대 3개까지만 첨부해주세요.")
            e.target.value = null;
        }
        else {
            this.setState({
                uploadFiles: uploadFiles.concat(...e.target.files)
            })
        }
    }

    createDocu = async () => {
        console.log('[%s] createDocuments', TAG);
        if (!this.state.title) {
            alert("제목을 입력해주세요");
        }
        else if (!this.state.category) {
            alert("카테고리를 선택해주세요");
        }
        else if (this.state.uploadFiles.length === 0) {
            alert("파일을 첨부해주세요");
        }
        else {
            const docuInfo = new FormData();
            docuInfo.append('generation', this.state.generation);
            docuInfo.append('category_id', this.state.category);
            docuInfo.append('title', this.state.title);
            for (let i = 0, max = this.state.uploadFiles.length; i < max; i++) {
                docuInfo.append('uploadFiles', this.state.uploadFiles[i]);
            }

            await service.createDocument(this.props.board_id, docuInfo)
                .then(() => {
                    console.log('[%s] Create Docu Success', TAG);
                    this.props.togglePopUp();
                    this.props.retrieveDocuments()
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    createGeneration = () => {
        let currentGen = 2 * ((new Date()).getFullYear() - 1980)
        if ((new Date()).getMonth() > 5) currentGen++;
        let genOptions = [];
        for (let i = currentGen; i > 0; i--) {
            genOptions.push(<option key={i}>{i}</option>)
        }
        return genOptions
    }

    makeAttachedFileList = (files) => {
        const fileList = files.map((file, index) => {
            return (
                <div className="file-list" key={index}>
                    <p>{file.name}</p>
                    <i className="material-icons pointer" onClick={() => this.removeAttachedFile(index)}>remove_circle_outline</i>
                </div>
            )
        });
        return fileList;
    }

    makeCategoryList = () => {
        const categoryList = this.props.categories.map((category) => {
            return (
                <div className="category-unit" key={category.category_id}>
                    <input type="radio" id={category.category_id} name="category" value={category.category_id}
                        onChange={this.handleChange} />
                    <label htmlFor={category.category_id}>{category.category_name}</label>
                </div>
            )
        })

        return categoryList;
    }

    removeAttachedFile = (index) => {
        const { uploadFiles } = this.state;
        this.setState({
            uploadFiles: uploadFiles.filter((file, i) => {
                return index !== i
            })
        })
    }

    render() {
        console.log('[%s] render', TAG)

        return (
            <div className="enif-popup">
                <div className="enif-popup-content crt-docu-wrapper">
                    <h3>파일 업로드</h3>
                    <div className="docu-option-generation">
                        <label>회기</label>
                        <select name="generation" onChange={(e) => this.handleChange(e)} value={this.state.generation}>
                            {this.createGeneration()}
                        </select>
                    </div>
                    <div className="docu-category-list-wrapper">
                        <label>카테고리</label>
                        {this.makeCategoryList()}
                    </div>
                    <div className="docu-title-wrapper">
                        <label htmlFor="crtDocTitle">제목</label>
                        <input type="text" className="docu-title" id="crtDocTitle" name="title" placeholder="제목" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="docu-desc-wrapper">
                        <label htmlFor="crtDocDesc">본문</label>
                        <textarea className="docu-desc" id="crtDocDesc" name="desc" placeholder="본문" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="docu-files-wrapper">
                        <label htmlFor="crtDocFile">
                            <i className="material-icons pointer">attach_file</i>
                        </label>
                        <input type="file" multiple id="crtDocFile" className="docu-input-file" onChange={(e) => this.uploadFile(e)} /* value={this.state.uploadPhoto} */ />
                        <div>
                            {this.state.uploadFiles.length > 0 && this.makeAttachedFileList(this.state.uploadFiles)}
                        </div>
                    </div>
                    <div>
                        <button className="enif-btn-common enif-btn-ok" onClick={() => this.createDocu()}>OK</button>
                        <button className="enif-btn-common enif-btn-cancel" onClick={() => this.props.togglePopUp()}>CANCEL</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateDocu;