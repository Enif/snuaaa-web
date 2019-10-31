import React from 'react';
import CreatePhotoInfo from 'components/Photo/CreatePhotoInfo';
import Image from 'components/Common/Image';
import ContentsStateEnum from 'common/ContentStateEnum';

const EditPhotoComponent = ({ photoInfo, selectedTags, boardTags, handleChange, handleDate, clickTag, setPhotoState, updatePhoto }) => {

    const makeTagList = () => {
        const tagList = boardTags.map((tag) => {
            let labelClassName = (tag.tag_type === 'M') ? 'tag-label-1' : 'tag-label-2';
            return (
                <div className="tag-unit" key={tag.tag_id} >
                    <input
                        type="checkbox"
                        id={"crt_" + tag.tag_id}
                        checked={selectedTags.includes(tag.tag_id)}
                        onChange={clickTag} />
                    <label className={labelClassName} htmlFor={"crt_" + tag.tag_id}># {tag.tag_name}</label>
                </div>
            )
        })
        return tagList;
    }

    return (
        <div className="crt-photo-popup">
            <div className="crt-photo-wrp edt-photo-wrp">
                <div className="crt-photo-header">
                    <h3>사진 수정</h3>
                </div>
                <div className="crt-photo-body">
                    <div className="crt-photo-center">
                        <Image imgSrc={photoInfo.file_path} />
                    </div>

                    <div className="crt-photo-right">

                        {boardTags.length > 0 &&
                            <div className="tag-list-wrapper">
                                {makeTagList()}
                            </div>}

                        <CreatePhotoInfo title={photoInfo.title} text={photoInfo.text} date={photoInfo.date} location={photoInfo.location}
                            camera={photoInfo.camera} lens={photoInfo.lens} focal_length={photoInfo.focal_length} f_stop={photoInfo.f_stop}
                            exposure_time={photoInfo.exposure_time} iso={photoInfo.iso} handleChange={handleChange} handleDate={handleDate} />


                        <div className="btn-wrapper">
                            <button className="btn-cancel" onClick={() => setPhotoState(ContentsStateEnum.READY)}>취소</button>
                            <button className="btn-ok" onClick={updatePhoto}>완료</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EditPhotoComponent;