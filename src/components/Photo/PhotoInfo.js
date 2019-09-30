import React from 'react';
import ProfileMini from '../Common/ProfileMini';
import ContentStateEnum from 'common/ContentStateEnum';

import { breakLine } from 'utils/breakLine';
import { convertDate, convertFullDate } from 'utils/convertDate'
import ActionDrawer from '../Common/ActionDrawer';

const PhotoInfo = ({ photoInfo, likeInfo, my_id,
    setPhotoState, deletePhoto, likePhoto, setAlbumThumbnail }) => {

    let content = photoInfo && photoInfo.contentPhoto;
    let userInfo = photoInfo && photoInfo.contentPhoto.user;
    let tagInfo = photoInfo && photoInfo.contentPhoto.tags;

    const makeTagList = () => {
        let tagList = tagInfo.map((tag) => {
            let tagClassName = (tag.tag_type === 'M') ? 'tag-type-1' : 'tag-type-2';
            return (
                <div key={tag.tag_id} className={`tag-unit ${tagClassName}`}># {tag.tag_name}</div>
            )
        })
        return tagList;
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
                            <div className="nums-wrapper">
                                <div className="view-num-wrapper">
                                    <i className="material-icons">visibility</i>
                                    {content.view_num}
                                </div>
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
            }

        </>
    )
}

export default PhotoInfo;