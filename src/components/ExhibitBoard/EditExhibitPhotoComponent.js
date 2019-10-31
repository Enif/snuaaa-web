import React from 'react';
import CreatePhotoInfo from 'components/Photo/CreatePhotoInfo';
import Image from 'components/Common/Image';
import ContentsStateEnum from 'common/ContentStateEnum';

const EditExhibitPhotoComponent = ({ photoInfo, handleChange, handleDate, setPhotoState, updatePhoto }) => {

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

export default EditExhibitPhotoComponent;