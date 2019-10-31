import React from 'react';
import ContentsStateEnum from 'common/ContentStateEnum';
import ExhibitPhotoService from 'services/ExhibitPhotoService';
import EditExhibitPhotoComponent from 'components/ExhibitBoard/EditExhibitPhotoComponent';

const TAG = 'EDIT_EXHIBIT_PHOTO'

class EditExhibitPhoto extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] constructor`);
        super(props);
        this.boardTags = props.boardTagInfo;

        const { contentInfo } = props;
        let exhibitPhotoInfo = contentInfo && contentInfo.exhibitPhoto
        this.state = {
            title: contentInfo.title,
            text: contentInfo.text,
            date: exhibitPhotoInfo.date && new Date(exhibitPhotoInfo.date),
            location: exhibitPhotoInfo.location,
            camera: exhibitPhotoInfo.camera,
            lens: exhibitPhotoInfo.lens,
            focal_length: exhibitPhotoInfo.focal_length,
            f_stop: exhibitPhotoInfo.f_stop,
            exposure_time: exhibitPhotoInfo.exposure_time,
            iso: exhibitPhotoInfo.iso,
            file_path: exhibitPhotoInfo.file_path,
            imgDatas: [],
            imgIdx: -1
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

    submit = async () => {

        this.props.setPhotoState(ContentsStateEnum.LOADING);

        const { title, text, date, location, camera, lens,
            focal_length, f_stop, exposure_time, iso } = this.state;
        const { contentInfo, fetch } = this.props;
        const photoInfo = {
            title: title,
            text: text,
            date: date,
            location: location,
            camera: camera,
            lens: lens,
            focal_length: focal_length,
            f_stop: f_stop,
            exposure_time: exposure_time,
            iso: iso
        }

        await ExhibitPhotoService.updateExhibitPhoto(contentInfo.content_id, photoInfo)
            .then(() => {
                fetch();
            })
            .catch((err) => {
                console.error(err);
                alert("업데이트 실패");
            })
    }

    render() {
        console.log('[%s] render', TAG)

        const { handleChange, handleDate, submit } = this;
        const { title, text, date, location, camera, lens, focal_length
            , f_stop, exposure_time, iso, file_path } = this.state

        const photoInfo = {
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
            file_path: file_path
        }

        return (
            <EditExhibitPhotoComponent
                photoInfo={photoInfo}
                handleChange={handleChange}
                handleDate={handleDate}
                setPhotoState={this.props.setPhotoState}
                updatePhoto={submit}
            />
        )
    }
}

export default EditExhibitPhoto;