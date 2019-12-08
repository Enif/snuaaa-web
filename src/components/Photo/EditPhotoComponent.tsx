import React, { ChangeEvent } from 'react';
import CreatePhotoInfo from '../../components/Photo/CreatePhotoInfo';
import Image from '../../components/Common/AaaImage';
import { RecordOf } from 'immutable';
import TagType from '../../types/TagType';
import ContentType from '../../types/ContentType';

type EditPhotoComponentProps = {
    photoInfo: RecordOf<ContentType>;
    selectedTags?: RecordOf<TagType[]>;
    boardTags?: RecordOf<TagType[]>;
    handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    handleDate?: (date: string) => void;
    clickTag?: () => void;
    cancel?: () => void;
    confirm?: () => void;
}

const EditPhotoComponent = (
    { photoInfo, selectedTags, boardTags, handleChange,
        handleDate, clickTag, cancel, confirm }: EditPhotoComponentProps) => {

    const makeTagList = () => {
        if (boardTags && boardTags.length > 0) {
            const tagList = boardTags.map((tag) => {
                let labelClassName = (tag.tag_type === 'M') ? 'tag-label-1' : 'tag-label-2';
                return (
                    <div className="tag-unit" key={tag.tag_id} >
                        <input
                            type="checkbox"
                            id={"crt_" + tag.tag_id}
                            // checked={selectedTags ? selectedTags.includes(tag.tag_id) : false}
                            onChange={clickTag} />
                        <label className={labelClassName} htmlFor={"crt_" + tag.tag_id}># {tag.tag_name}</label>
                    </div>
                )
            })
            return (
                <div className="tag-list-wrapper">
                    {tagList}
                </div>
            );
        }
    }

    let content = photoInfo;
    let photo = photoInfo.photo;

    return (
        <div className="crt-photo-popup">
            <div className="crt-photo-wrp edt-photo-wrp">
                <div className="crt-photo-header">
                    <h3>사진 수정</h3>
                </div>
                <div className="crt-photo-body">
                    {
                        content && photo &&
                        <>
                            <div className="crt-photo-center">
                                <Image imgSrc={photo.file_path} />
                            </div>

                            <div className="crt-photo-right">

                                {makeTagList()}

                                <CreatePhotoInfo title={photoInfo.title} text={photoInfo.text} date={photo.date} location={photo.location}
                                    camera={photo.camera} lens={photo.lens} focal_length={photo.focal_length} f_stop={photo.f_stop}
                                    exposure_time={photo.exposure_time} iso={photo.iso} handleChange={handleChange} handleDate={handleDate} />

                                <div className="btn-wrapper">
                                    <button className="btn-cancel" onClick={cancel}>취소</button>
                                    <button className="btn-ok" onClick={confirm}>완료</button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )

}

export default EditPhotoComponent;