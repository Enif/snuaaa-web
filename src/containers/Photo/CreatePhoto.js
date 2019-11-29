import React from 'react';
import CreatePhotoComponent from 'components/Photo/CreatePhotoComponent';
import PhotoBoardService from 'services/PhotoBoardService';
import AlbumService from 'services/AlbumService';

const TAG = 'CREATEPHOTO';
const MAX_SIZE = 100 * 1024 * 1024;

class CreatePhoto extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);

        this.currentSize = 0;
        this.photoInfos = [];
        this.imgUrls = [];
        this.state = {
            title: '',
            text: '',
            date: '',
            location: '',
            camera: '',
            lens: '',
            focal_length: '',
            f_stop: '',
            exposure_time: '',
            iso: '',
            selectedTags: [],
            uploadPhotos: [],
            imgDatas: [],
            imgIdx: -1,
            btnDisabled: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDate = (date) => {
        this.setState({
            date: date
        })
    }

    uploadFile = (e) => {
        const { uploadPhotos } = this.state;
        if (uploadPhotos.length + e.target.files.length > 20) {
            alert("한 번에 20장 이상의 사진은 업로드 할 수 없습니다.")
        }
        else if (e.target.files) {
            let tmpSize = this.currentSize;
            for (let i = 0; i < e.target.files.length; i++) {
                tmpSize += e.target.files[i].size;
            }
            if (tmpSize > MAX_SIZE) {
                alert("한 번에 100MB 이상의 사진은 업로드 할 수 없습니다.")
            }
            else {
                this.currentSize = tmpSize;
                this.setState({
                    uploadPhotos: uploadPhotos.concat(...e.target.files)
                })
                // this.imgUrls.push(...(e.target.files.map(file => URL.createObjectURL(file))))
                for (let i = 0; i < e.target.files.length; i++) {
                    this.imgUrls.push(URL.createObjectURL(e.target.files[i]))
                    this.photoInfos.push({
                        title: '',
                        text: '',
                        date: '',
                        location: '',
                        camera: '',
                        lens: '',
                        focal_length: '',
                        f_stop: '',
                        exposure_time: '',
                        iso: '',
                        selectedTags: []
                    })
                }
            }
        }
    }

    setImgIdx = (index) => {

        const { imgIdx, title, text, date, location, camera, lens,
            focal_length, f_stop, exposure_time, iso, selectedTags } = this.state;

        if (imgIdx >= 0) {
            this.photoInfos[imgIdx] = {
                title: title,
                text: text,
                date: date,
                location: location,
                camera: camera,
                lens: lens,
                focal_length: focal_length,
                f_stop: f_stop,
                exposure_time: exposure_time,
                iso: iso,
                selectedTags: selectedTags
            }
        }

        this.setState({
            imgIdx: index,
            title: this.photoInfos[index].title,
            text: this.photoInfos[index].text,
            date: this.photoInfos[index].date,
            location: this.photoInfos[index].location,
            camera: this.photoInfos[index].camera,
            lens: this.photoInfos[index].lens,
            focal_length: this.photoInfos[index].focal_length,
            f_stop: this.photoInfos[index].f_stop,
            exposure_time: this.photoInfos[index].exposure_time,
            iso: this.photoInfos[index].iso,
            selectedTags: this.photoInfos[index].selectedTags
        })
    }

    makeTagList = () => {
        const tagList = this.props.tags.map((tag) => {
            let labelClassName = (tag.tag_type === 'M') ? 'tag-label-1' : 'tag-label-2';
            return (
                <div className="tag-unit" key={tag.tag_id} >
                    <input type="checkbox" id={"crt_" + tag.tag_id} checked={this.state.selectedTags.includes(tag.tag_id)}
                        onChange={(e) => this.clickTag(e)} />
                    <label className={labelClassName} htmlFor={"crt_" + tag.tag_id}># {tag.tag_name}</label>
                </div>
            )
        })
        return tagList;
    }

    removeImg = (index) => {
        const { uploadPhotos } = this.state;
        this.photoInfos = this.photoInfos.filter((value, idx) => {
            return index !== idx;
        })
        this.imgUrls = this.imgUrls.filter((value, idx) => {
            return index !== idx;
        })
        this.setState({
            uploadPhotos: uploadPhotos.filter((value, idx) => {
                return index !== idx;
            })
        })
    }

    clickTag = (e) => {
        let tagId = e.target.id.replace('crt_', '');

        if (this.state.selectedTags.includes(tagId)) {
            this.setState({
                selectedTags: this.state.selectedTags.filter(tag => tagId !== tag)
            })
        }
        else {
            this.setState({
                selectedTags: this.state.selectedTags.concat(tagId)
            })

        }
    }

    checkForm = () => {
        if (!this.state.uploadPhotos) {
            alert("사진을 첨부해주세요")
        }
        else {
            this.createPhotos();
        }
    }

    createPhotos = async () => {

        const { setReadyState } = this.props;
        const { imgIdx, title, text, date, location, camera, lens,
            focal_length, f_stop, exposure_time, iso, selectedTags } = this.state;
        const photosForm = new FormData();

        setReadyState();
        this.setState({
            btnDisabled: true
        })

        if (imgIdx >= 0) {
            this.photoInfos[imgIdx] = {
                title: title,
                text: text,
                date: date,
                location: location,
                camera: camera,
                lens: lens,
                focal_length: focal_length,
                f_stop: f_stop,
                exposure_time: exposure_time,
                iso: iso,
                selectedTags: selectedTags
            }
        }

        for (let i = 0, max = this.state.uploadPhotos.length; i < max; i++) {
            photosForm.append('board_id', this.props.board_id);
            photosForm.append('title', this.photoInfos[i].title);
            photosForm.append('text', this.photoInfos[i].text);
            photosForm.append('date', this.photoInfos[i].date);
            photosForm.append('location', this.photoInfos[i].location);
            photosForm.append('camera', this.photoInfos[i].camera);
            photosForm.append('lens', this.photoInfos[i].lens);
            photosForm.append('focal_length', this.photoInfos[i].focal_length);
            photosForm.append('f_stop', this.photoInfos[i].f_stop);
            photosForm.append('exposure_time', this.photoInfos[i].exposure_time);
            photosForm.append('iso', this.photoInfos[i].iso);
            photosForm.append('tags', this.photoInfos[i].selectedTags);
            photosForm.append('uploadPhotos', this.state.uploadPhotos[i]);
        }

        if (this.props.album_id) {

            await AlbumService.createPhotosInAlbum(this.props.album_id, photosForm)
                .then(() => {
                    this.props.togglePopUp();
                    this.props.fetch();
                })
                .catch((err) => {
                    console.error(`[${TAG}] ${err}`);
                    alert('사진 생성 실패');
                    this.setState({
                        btnDisabled: false
                    })
                })
        }
        else if (this.props.board_id) {

            await PhotoBoardService.createPhotosInPhotoBoard(this.props.board_id, photosForm)
                .then(() => {
                    this.props.togglePopUp();
                    this.props.retrievePhotos(this.props.board_id);
                })
                .catch((err) => {
                    console.error(`[${TAG}] ${err}`);
                    alert('사진 생성 실패');
                    this.setState({
                        btnDisabled: false
                    })
                })
        }
        else {
            console.error(`[${TAG}] Unhandled Exception`);
            this.props.togglePopUp();
        }
    }

    render() {
        console.log('[%s] render', TAG)
        const { handleChange, handleDate, uploadFile, clickTag, imgUrls, setImgIdx, removeImg, checkForm } = this;
        const { tags, togglePopUp } = this.props;
        const { imgIdx, selectedTags, title, text, date, location, camera, lens, focal_length, f_stop, exposure_time, iso, btnDisabled } = this.state

        return (
            <CreatePhotoComponent
                handleChange={handleChange}
                handleDate={handleDate}
                uploadFile={uploadFile}
                clickTag={clickTag}
                imgUrls={imgUrls}
                setImgIdx={setImgIdx}
                removeImg={removeImg}
                checkForm={checkForm}
                tags={tags}
                togglePopUp={togglePopUp}
                imgIdx={imgIdx}
                selectedTags={selectedTags}
                title={title}
                text={text}
                date={date}
                location={location}
                camera={camera}
                lens={lens}
                focal_length={focal_length}
                f_stop={f_stop}
                exposure_time={exposure_time}
                iso={iso}
                btnDisabled={btnDisabled}
            />
        )
    }
}

export default CreatePhoto;