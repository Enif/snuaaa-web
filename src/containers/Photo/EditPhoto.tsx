import React, { ChangeEvent } from 'react';

import EditPhotoComponent from '../../components/Photo/EditPhotoComponent';
import ContentsStateEnum from '../../common/ContentStateEnum';
import PhotoService from '../../services/PhotoService';
import immutable, { Record, RecordOf } from 'immutable';
import ContentType from '../../types/ContentType';
import TagType from '../../types/TagType';

const TAG = 'EDITPHOTO'

type EditPhotoProps = {
    photoInfo: ContentType;
    boardTagInfo: RecordOf<TagType[]>
    setPhotoState: (state: number) => void;
    fetch: () => void;
}

type EditPhotoState = {
    photoInfo: RecordOf<ContentType>;
    selectedTags?: RecordOf<TagType[]>;
}

// const makePhotoInfo: Record.Factory<ContentType> = Record();

class EditPhoto extends React.Component<EditPhotoProps, EditPhotoState> {

    boardTags: immutable.Record<TagType[]>;

    constructor(props: EditPhotoProps) {
        super(props);

        this.boardTags = props.boardTagInfo;

        this.state = {
            photoInfo: Record(props.photoInfo)(),
            // title: props.photoInfo.contentPhoto.title,
            // text: props.photoInfo.contentPhoto.text,
            // date: props.photoInfo.date && new Date(props.photoInfo.date),
            // location: props.photoInfo.location,
            // camera: props.photoInfo.camera,
            // lens: props.photoInfo.lens,
            // focal_length: props.photoInfo.focal_length,
            // f_stop: props.photoInfo.f_stop,
            // exposure_time: props.photoInfo.exposure_time,
            // iso: props.photoInfo.iso,
            // selectedTags: props.photoInfo.get("contentTags").contentTags &&
            //     (props.photoInfo.contentPhoto.contentTags.map(tag => tag.tag_id)),
            // photo_id: props.photoInfo.content_id,
            // file_path: props.photoInfo.file_path,
            // uploadPhotos: [],
            // imgDatas: [],
            // imgIdx: -1
        }
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { photoInfo } = this.state;
        const name: any = e.target.name;
        if ( name === 'title' || name === 'text') {
            console.log(name);
            this.setState({
                photoInfo: photoInfo.set(name, e.target.value)
            });
        }
        else {
            this.setState({
                photoInfo: photoInfo.setIn(["photo", name], e.target.value)
            });
        }
    }

    handleDate = (date: string) => {
        const { photoInfo } = this.state;
        this.setState({
            photoInfo: photoInfo.setIn(["photo", "date"], date)
        })
    }

    // makeTagList = () => {
    //     const tagList = this.state.selectedTags.map((tag) => {
    //         return (
    //             <div className="tag-unit" key={tag.tag_id} >
    //                 <input type="checkbox" id={"crt_" + tag.tag_id} defaultChecked />
    //                 <label htmlFor={"crt_" + tag.tag_id}># {tag.tag_name}</label>
    //             </div>
    //         )
    //     })
    //     return tagList;
    // }

    // clickTag = (e) => {
    //     let tagId = e.target.id.replace('crt_', '');

    //     if (this.state.selectedTags.includes(tagId)) {
    //         this.setState({
    //             selectedTags: this.state.selectedTags.filter(tag => tagId !== tag)
    //         })
    //     }
    //     else {
    //         this.setState({
    //             selectedTags: this.state.selectedTags.concat(tagId)
    //         })

    //     }
    // }

    updatePhoto = async () => {

        // this.props.setPhotoState(ContentsStateEnum.LOADING);

        const { photoInfo, selectedTags } = this.state;

        // const photoInfo = {
        //     title: title,
        //     text: text,
        //     date: date,
        //     location: location,
        //     camera: camera,
        //     lens: lens,
        //     focal_length: focal_length,
        //     f_stop: f_stop,
        //     exposure_time: exposure_time,
        //     iso: iso,
        //     tags: selectedTags
        // }

        await PhotoService.updatePhoto(photoInfo.get("content_id"), photoInfo)
            .then(() => {
                this.props.fetch();
            })
            .catch((err: ErrorEvent) => {
                console.error(err);
                alert("업데이트 실패");
            })
    }

    render() {
        console.log('[%s] render', TAG)
        const { photoInfo, selectedTags } = this.state
        const { setPhotoState } = this.props;
        console.log(photoInfo.photo && photoInfo.photo.date)
        // const photoInfo = {
        //     title: title,
        //     text: text,
        //     date: date,
        //     location: location,
        //     camera: camera,
        //     lens: lens,
        //     focal_length: focal_length,
        //     f_stop: f_stop,
        //     exposure_time: exposure_time,
        //     iso: iso,
        //     file_path: file_path
        // }

        return (

            <EditPhotoComponent
                photoInfo={photoInfo}
                selectedTags={selectedTags}
                // boardTags={this.boardTags}
                handleChange={this.handleChange}
                handleDate={this.handleDate}
                // clickTag={false}
                // clickTag={this.clickTag}
                // setPhotoState={this.props.setPhotoState}
                cancel={() => setPhotoState(ContentsStateEnum.READY)}
                confirm={this.updatePhoto}
            />
        )
    }
}

export default EditPhoto;