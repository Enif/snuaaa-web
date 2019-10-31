import React from 'react';
import CreateExhibitPhotoInfo from 'components/ExhibitBoard/CreateExhibitPhotoInfo';
import ThumbnailList from 'components/Album/ThumbnailList';
import PreviewImage from 'components/Album/PreviewImage';

const CreateExhibitPhotoComponent = ({ handleChange, handleDate, handlePhotographer, selectPhotographer, removePhotographer,
    uploadFile, clickTag, imgUrls, setImgIdx, removeImg, checkForm,
    tags, togglePopUp, imgIdx, selectedTags,
    title, text, order, photographer, date, location, camera, lens, focal_length, f_stop, exposure_time, iso,
    searchUsers, btnDisabled }) => {


    const makeTagList = () => {
        const tagList = tags.map((tag) => {
            let labelClassName = (tag.tag_type === 'M') ? 'tag-label-1' : 'tag-label-2';
            return (
                <div className="tag-unit" key={tag.tag_id} >
                    <input type="checkbox" id={"crt_" + tag.tag_id} checked={selectedTags.includes(tag.tag_id)}
                        onChange={clickTag} />
                    <label className={labelClassName} htmlFor={"crt_" + tag.tag_id}># {tag.tag_name}</label>
                </div>
            )
        })
        return tagList;
    }

    return (
        <div className="crt-photo-popup">
            <div className="crt-photo-wrp">
                <div className="crt-photo-header">
                    <h3>사진 업로드</h3>
                </div>
                <div className="crt-photo-body">
                    <div className="crt-photo-left">
                        <div className="block-constant">
                            <label htmlFor="photos">
                                <div className="add-photo">
                                    <i className="material-icons md-36">add</i>
                                </div>
                            </label>
                            <input type="file" id="photos" multiple accept="image/*" onChange={uploadFile} />
                        </div>
                        <ThumbnailList imgUrls={imgUrls} imgIdx={imgIdx} setImgIdx={setImgIdx} removeImg={removeImg} />
                    </div>

                    <div className="crt-photo-center">
                        <PreviewImage imgUrls={imgUrls} imgIdx={imgIdx} />
                    </div>

                    <div className="crt-photo-right">
                        <div className="crt-photo-right-top" >
                            {(() => {
                                if (imgIdx >= 0) {
                                    return (
                                        <>
                                            {tags &&
                                                <div className="tag-list-wrapper">
                                                    {makeTagList()}
                                                </div>}

                                            <CreateExhibitPhotoInfo
                                                title={title}
                                                text={text}
                                                order={order}
                                                photographer={photographer}
                                                date={date} location={location}
                                                camera={camera} lens={lens}
                                                focal_length={focal_length} f_stop={f_stop}
                                                exposure_time={exposure_time} iso={iso}
                                                searchUsers={searchUsers}
                                                handleChange={handleChange}
                                                handleDate={handleDate}
                                                handlePhotographer={handlePhotographer}
                                                selectPhotographer={selectPhotographer}
                                                removePhotographer={removePhotographer} />
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <div className="message-info">사진을 선택해주세요</div>
                                    )
                                }
                            })()}
                        </div>
                        <div className="btn-wrapper">
                            <button className="btn-cancel" onClick={togglePopUp}>취소</button>
                            <button className="btn-ok" disabled={btnDisabled} onClick={checkForm}>완료</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateExhibitPhotoComponent;