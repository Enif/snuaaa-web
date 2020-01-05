import React from 'react';
import AttachFile from 'components/Post/AttachFile';
import DocuService from 'services/DocuService.ts';

const TAG = 'CREATEDOCU'

class CreateDocu extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);

        this.state = {
            generation: "",
            title: "",
            text: "",
            category: null,
            uploadFiles: [],
        }
    }

    componentDidMount() {
        const today = new Date();
        let currentGen = 2 * (today.getFullYear() - 1980)
        if (today.getMonth() > 5) currentGen++;
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
            docuInfo.append('text', this.state.text);
            for (let i = 0, max = this.state.uploadFiles.length; i < max; i++) {
                docuInfo.append('uploadFiles', this.state.uploadFiles[i]);
            }

            await DocuService.createDocument(this.props.board_id, docuInfo)
                .then(() => {
                    console.log('[%s] Create Docu Success', TAG);
                    this.props.fetch()
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    createGeneration = () => {
        const today = new Date();
        let currentGen = 2 * (today.getFullYear() - 1980)
        if (today.getMonth() > 5) currentGen++;
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
                    <i className="ri-close-circle-line ri-icons enif-pointer" onClick={() => this.removeAttachedFile(index)}></i>
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
        const { uploadFiles } = this.state;

        return (
            <div className="enif-popup">
                <div className="enif-popup-content crt-docu-wrapper">
                    <h3>파일 업로드</h3>
                    <div className="docu-option-generation">
                        <label className="input-label">회기</label>
                        <input type="number" name="generation" onChange={(e) => this.handleChange(e)} value={this.state.generation} />
                        {/* <select >
                            {this.createGeneration()}
                        </select> */}
                    </div>
                    <div className="docu-category-list-wrapper">
                        <label className="input-label">카테고리</label>
                        <div className="docu-category-unit-wrapper">
                            {this.makeCategoryList()}
                        </div>
                    </div>
                    <div className="docu-title-wrapper">
                        <label className="input-label" htmlFor="crtDocTitle">제목</label>
                        <input type="text" className="docu-title" id="crtDocTitle" name="title" placeholder="제목" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="docu-desc-wrapper">
                        <label className="input-label" htmlFor="crtDocDesc">본문</label>
                        <textarea className="docu-desc" id="crtDocDesc" name="text" placeholder="본문" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="docu-files-wrapper">
                        <label className="input-label">
                            <i className="ri-attachment-line enif-f-1p2x"></i>
                        </label>
                        <AttachFile files={uploadFiles} attachFile={this.uploadFile} removeFile={this.removeAttachedFile} />
                    </div>
                    <div>
                        <button className="enif-btn-common enif-btn-ok" onClick={() => this.createDocu()}>OK</button>
                        <button className="enif-btn-common enif-btn-cancel" onClick={() => this.props.close()}>CANCEL</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateDocu;