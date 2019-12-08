import React from 'react';
import ProfileMini from '../Common/ProfileMini';
import ContentStateEnum from 'common/ContentStateEnum';

import { breakLine } from 'utils/breakLine';
import { convertDate, convertFullDate } from 'utils/convertDate'
import ActionDrawer from '../Common/ActionDrawer';

const PhotoInfo = ({ photoInfo, likeInfo, my_id,
    setPhotoState, deletePhoto, likePhoto, setAlbumThumbnail }) => {

    let content = photoInfo;
    let photo = photoInfo && photoInfo.photo;
    let userInfo = photoInfo && photoInfo.user;
    let tagInfo = photoInfo && photoInfo.contentTags;

    const makeTagList = () => {
        if (tagInfo) {
            return tagInfo.map((tag) => {
                let tagClassName = (tag.tag_type === 'M') ? 'tag-type-1' : 'tag-type-2';
                return (
                    <div key={tag.tag_id} className={`tag-unit ${tagClassName}`}># {tag.tag_name}</div>
                )
            })
        }
    }

    return (
        <>
            {
                photoInfo &&
                <>
                    <div className="photo-contents-wrapper">
                        {
                            userInfo && (my_id === userInfo.user_id) &&
                            <ActionDrawer
                                clickEdit={() => setPhotoState(ContentStateEnum.EDITTING)}
                                clickDelete={deletePhoto}
                                isPhoto={true}
                                clickSetThumbnail={setAlbumThumbnail} />
                        }
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
                                        {photo.date && (
                                            <tr>
                                                <td>Date</td>
                                                <td>{convertDate(photo.date)}</td>
                                            </tr>)}

                                        {photo.location && (
                                            <tr>
                                                <td>Location</td>
                                                <td>{photo.location}</td>
                                            </tr>)}

                                        {photo.camera && (
                                            <tr>
                                                <td>Camera</td>
                                                <td>{photo.camera}</td>
                                            </tr>)}

                                        {photo.lens && (
                                            <tr>
                                                <td>Lens</td>
                                                <td>{photo.lens}</td>
                                            </tr>)}

                                        {photo.focal_length && (
                                            <tr>
                                                <td>@</td>
                                                <td>{photo.focal_length}</td>
                                            </tr>)}

                                        {(photo.f_stop || photo.exposure_time || photo.iso) && (
                                            <tr>
                                                <td>Setting</td>
                                                <td>
                                                    {photo.f_stop && <>F/{photo.f_stop}</>}
                                                    {photo.exposure_time && <> {photo.exposure_time}</>}
                                                    {photo.iso && <> ISO{photo.iso}</>}
                                                </td>
                                            </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="enif-divider"></div>
                        <ProfileMini userInfo={userInfo} />
                        <div className="enif-divider"></div>
                        <div className="actions-wrapper">
                            <div className="nums-wrapper">
                                <div className="view-num-wrapper">
                                    <i className="ri-eye-fill"></i>
                                    {content.view_num}
                                </div>
                                <div className="like-num-wrapper">
                                    <i className={`${likeInfo ? 'ri-heart-fill':'ri-heart-line'} enif-f-1p5x enif-pointer`} onClick={() => likePhoto()}>
                                    </i>
                                    {content.like_num}
                                </div>
                                <div className="comment-num-wrapper">
                                    <i className="ri-message-2-fill enif-f-1p5x"></i>
                                    {content.comment_num}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }

        </>
    )
}

export default PhotoInfo;