import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/Image';
import ProfileMini from '../Common/ProfileMini';
import ContentsStateEnum from 'common/ContentStateEnum';
import { breakLine } from 'utils/breakLine';
import { convertDate, convertFullDate } from 'utils/convertDate'

const PhotoInfo = ({ photoInfo, likeInfo, moveToPhoto,
    fullscreenRef, toggleFullscreen, my_id, isFullscreen,
    setPhotoState, deletePhoto, likePhoto }) => {

    let content = photoInfo.contentPhoto;
    let albumInfo = photoInfo.album;
    let userInfo = photoInfo.contentPhoto.user;
    let tagInfo = photoInfo.contentPhoto.tags;

    const makeTagList = () => {
        let tagList = tagInfo.map((tag) => {
            let tagClassName = (tag.tag_type === 'M') ? 'tag-type-1' : 'tag-type-2';
            return (
                <div key={tag.tag_id} className={`tag-unit ${tagClassName}`}># {tag.tag_name}</div>
            )
        })
        return tagList;
    }

    let backLink;
    if (!albumInfo) {
        backLink = `/board/brd32`;
    }
    else {
        backLink = `/album/${albumInfo.content_id}`
    }

    return (
        <>
            <div className="photo-alb-title-wrp">
                <Link to={backLink}>
                    <i className="material-icons">keyboard_backspace</i>
                </Link>
                <h5>{albumInfo ? albumInfo.title : "기본앨범"}</h5>
            </div>
            <div className="photo-img-wrapper" ref={fullscreenRef}>
                <div className="photo-move-action prev" onClick={() => moveToPhoto(-1)}>
                    <i className="material-icons pointer">keyboard_arrow_left</i>
                </div>
                <Image imgSrc={photoInfo.file_path} />
                <div className="photo-move-action next" onClick={() => moveToPhoto(1)}>
                    <i className="material-icons pointer">keyboard_arrow_right</i>
                </div>
                <div className="photo-action-fullscreen-wrapper">
                    <i className="material-icons pointer" onClick={toggleFullscreen}>{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</i>
                </div>
            </div>

            <div className="photo-contents-wrapper">

                <div className="info-wrapper">
                    <div className="info-title-date">
                        <h4>{content.title}</h4>
                        <p className="info-date">{convertFullDate(content.createdAt)}</p>
                    </div>
                    <div className="info-tags">{makeTagList()}</div>
                    {
                        content.text &&
                        <div className="enif-divider"></div>
                    }
                    <div className="info-text-infos-wrapper">
                        <div className="info-text-wrapper">
                            <p>{breakLine(content.text)}</p>
                        </div>
                        <div className="enif-divider enif-hide-desktop"></div>
                        <table className="info-infos-wrapper">
                            <tbody>
                                {photoInfo.date && (
                                    <tr>
                                        <td>Date</td>
                                        <td>{convertDate(photoInfo.date)}</td>
                                    </tr>)}

                                {photoInfo.location && (
                                    <tr>
                                        <td>Location</td>
                                        <td>{photoInfo.location}</td>
                                    </tr>)}

                                {photoInfo.camera && (
                                    <tr>
                                        <td>Camera</td>
                                        <td>{photoInfo.camera}</td>
                                    </tr>)}

                                {photoInfo.lens && (
                                    <tr>
                                        <td>Lens</td>
                                        <td>{photoInfo.lens}</td>
                                    </tr>)}

                                {photoInfo.focal_length && (
                                    <tr>
                                        <td>@</td>
                                        <td>{photoInfo.focal_length}</td>
                                    </tr>)}

                                {(photoInfo.f_stop || photoInfo.exposure_time || photoInfo.iso) && (
                                    <tr>
                                        <td>Setting</td>
                                        <td>
                                            {photoInfo.f_stop && <>F/{photoInfo.f_stop}</>}
                                            {photoInfo.exposure_time && <> {photoInfo.exposure_time}</>}
                                            {photoInfo.iso && <> ISO{photoInfo.iso}</>}
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="enif-divider"></div>
                <ProfileMini profileImg={userInfo.profile_path} nickname={userInfo.nickname} userDesc={userInfo.introduction} />
                <div className="enif-divider"></div>
                <div className="actions-wrapper">
                    {
                        (my_id === userInfo.user_id) &&
                        <div className="edit-delete-wrapper">
                            <div className="edit-wrapper">
                                <i className="material-icons pointer" onClick={() => setPhotoState(ContentsStateEnum.EDITTING)}>edit</i>
                            </div>
                            <div className="delete-wrapper">
                                <i className="material-icons pointer" onClick={deletePhoto}>delete</i>
                            </div>
                        </div>
                    }
                    <div className="like-comment-num-wrapper">
                        <div className="like-num-wrapper">
                            <i className="material-icons pointer" onClick={() => likePhoto()}>
                                {likeInfo ? 'favorite' : 'favorite_border'}
                            </i>
                            {content.like_num}
                        </div>
                        <div className="comment-num-wrapper">
                            <i className="material-icons">comment</i>
                            {content.comment_num}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PhotoInfo;