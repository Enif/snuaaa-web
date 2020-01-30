import React from 'react';
import ExhibitionService from 'services/ExhibitionService.ts';
import UserService from '../../services/UserService.ts';
import CreateExhibitPhotoComponent from 'components/ExhibitBoard/CreateExhibitPhotoComponent';

const TAG = 'CREATEPHOTO';
const MAX_SIZE = 100 * 1024 * 1024;

class CreateExhibitPhoto extends React.Component {

    constructor(props) {
        super(props);
        console.log('[%s] constructor', TAG)

        this.currentSize = 0;
        this.photoInfos = [];
        this.imgUrls = [];
        this.state = {
            title: '',
            text: '',
            order: 0,
            photographer: {
                uuid: null,
                nickname: null
            },
            photographer_alt: '',
            date: '',
            location: '',
            camera: '',
            lens: '',
            focal_length: '',
            f_stop: '',
            exposure_time: '',
            iso: '',
            uploadPhotos: [],
            imgDatas: [],
            searchUsers: [],
            imgIdx: -1,
            btnDisabled: false
        }
    }
    
    componentDidMount() {
        document.body.classList.add('enif-overflow-hidden');
    }

    componentWillUnmount() {
        document.body.classList.remove('enif-overflow-hidden')
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

    handlePhotographer = (e) => {
        this.setState({
            photographer_alt: e.target.value
        })
        if(e.target.value) {
            this.fetchUsers(e.target.value);
        }
    }

    fetchUsers = async (name) => {
        UserService.searchMini(name)
        .then((res) => {
            this.setState({
                searchUsers: res.data.userList
            })
        })
        .catch((err) => {
            console.error(err);
        })
    }

    selectPhotographer = (index) => {
        const { searchUsers } = this.state;
        this.setState({
            photographer_alt: '',
            photographer: {
                uuid: searchUsers[index].user_uuid,
                nickname: searchUsers[index].nickname
            },
            searchUsers: []
        })
    }

    removePhotographer = () => {
        this.setState({
            photographer: {
                uuid: null,
                nickname: null
            }
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
                        order: 0,
                        photographer: {
                            uuid: '',
                            nickname: ''
                        },
                        photographer_alt: '',
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

        const { imgIdx, title, text, order, photographer, photographer_alt, date, location, camera, lens,
            focal_length, f_stop, exposure_time, iso, selectedTags } = this.state;

        if (imgIdx >= 0) {
            this.photoInfos[imgIdx] = {
                title: title,
                text: text,
                order: order,
                photographer: photographer,
                photographer_alt: photographer_alt,
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
            order: this.photoInfos[index].order,
            photographer: this.photoInfos[index].photographer,
            photographer_alt: this.photoInfos[index].photographer_alt,
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
        const { uploadPhotos } = this.state;
        if (!uploadPhotos || !uploadPhotos.length) {
            return false;
        }
        else {
            return true;
        }
    }

    setPhotoInfo = () => {
        const { imgIdx, title, text, order, date, location, camera, lens,
            focal_length, f_stop, exposure_time, iso, photographer, photographer_alt } = this.state;

        if (imgIdx >= 0) {
            this.photoInfos[imgIdx] = {
                title: title,
                text: text,
                order: order,
                photographer: photographer,
                photographer_alt: photographer_alt,
                date: date,
                location: location,
                camera: camera,
                lens: lens,
                focal_length: focal_length,
                f_stop: f_stop,
                exposure_time: exposure_time,
                iso: iso,
            }
        }
    }

    submit = async () => {

        const { checkForm } = this;
        const { exhibition_no } = this.props;
        const { togglePopUp, fetch, exhibition_id } = this.props;

        this.setPhotoInfo();
        if(!checkForm()){
            alert("사진을 첨부해주세요")
        }
        else {
            this.setState({
                btnDisabled: true
            })
    
            try {
                for (let i = 0, max = this.state.uploadPhotos.length; i < max; i++) {
                    const photosForm = new FormData();
                    photosForm.append('exhibition_id', exhibition_id);
                    photosForm.append('title', this.photoInfos[i].title);
                    photosForm.append('text', this.photoInfos[i].text);
                    photosForm.append('order', this.photoInfos[i].order)
                    if(this.photoInfos[i].photographer.uuid) {
                        photosForm.append('photographer', this.photoInfos[i].photographer.uuid)
                    }
                    else {
                        photosForm.append('photographer_alt', this.photoInfos[i].photographer_alt);
                    }
                    photosForm.append('exhibition_no', exhibition_no);
                    photosForm.append('date', this.photoInfos[i].date);
                    photosForm.append('location', this.photoInfos[i].location);
                    photosForm.append('camera', this.photoInfos[i].camera);
                    photosForm.append('lens', this.photoInfos[i].lens);
                    photosForm.append('focal_length', this.photoInfos[i].focal_length);
                    photosForm.append('f_stop', this.photoInfos[i].f_stop);
                    photosForm.append('exposure_time', this.photoInfos[i].exposure_time);
                    photosForm.append('iso', this.photoInfos[i].iso);
                    photosForm.append('tags', this.photoInfos[i].selectedTags);
                    photosForm.append('exhibitPhoto', this.state.uploadPhotos[i]);
    
                    try {
                        await ExhibitionService.createExhibitPhoto(exhibition_id, photosForm)
                    }
                    catch (err) {
                        console.error(`[${TAG}] ${err}`);
                        throw err;
                    }
                }
            }
            catch (err) {
                alert('사진 생성 실패');
                this.setState({
                    btnDisabled: false
                })
            }
            togglePopUp();
            fetch();
        }
    }

    render() {
        console.log('[%s] render', TAG)
        const { handleChange, handleDate, handlePhotographer, selectPhotographer, removePhotographer, uploadFile, clickTag, imgUrls, setImgIdx, removeImg, submit } = this;
        const { tags, togglePopUp } = this.props;
        const { imgIdx, selectedTags, title, text, order, photographer, date, location, camera, lens, focal_length, f_stop, exposure_time, iso, searchUsers, btnDisabled } = this.state

        return (
            <CreateExhibitPhotoComponent
                handleChange={handleChange}
                handleDate={handleDate}
                handlePhotographer={handlePhotographer}
                selectPhotographer={selectPhotographer}
                removePhotographer={removePhotographer}
                uploadFile={uploadFile}
                clickTag={clickTag}
                imgUrls={imgUrls}
                setImgIdx={setImgIdx}
                removeImg={removeImg}
                checkForm={submit}
                tags={tags}
                togglePopUp={togglePopUp}
                imgIdx={imgIdx}
                selectedTags={selectedTags}
                title={title}
                text={text}
                order={order}
                photographer={photographer}
                date={date}
                location={location}
                camera={camera}
                lens={lens}
                focal_length={focal_length}
                f_stop={f_stop}
                exposure_time={exposure_time}
                iso={iso}
                searchUsers={searchUsers}
                btnDisabled={btnDisabled}
            />
        )
    }
}

export default CreateExhibitPhoto;
