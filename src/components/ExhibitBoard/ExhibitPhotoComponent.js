import React from 'react';
import ProfileMini from '../Common/ProfileMini';
import ContentStateEnum from 'common/ContentStateEnum';

import { breakLine } from 'utils/breakLine';
import { convertDate, convertFullDate } from 'utils/convertDate'
import ActionDrawer from '../Common/ActionDrawer';
import Image from '../Common/Image';
import defaultProfile from 'assets/img/profile.png';

const ExhibitPhotoComponent = ({ contentInfo, likeInfo, my_id,
    editPhoto, deletePhoto, likePhoto }) => {

    let content = contentInfo;
    let photoInfo = contentInfo && contentInfo.exhibitPhoto;
    let userInfo = contentInfo && contentInfo.user;
    let photographerInfo = contentInfo && contentInfo.exhibitPhoto.photographer;

    return (
        <>
            {
                photoInfo &&
                <>
                    <div className="photo-contents-wrapper">
                        {
                            userInfo && (my_id === userInfo.user_id) &&
                            <ActionDrawer
                                clickEdit={editPhoto}
                                clickDelete={deletePhoto} />
                        }
                        <div className="info-wrapper">
                            <div className="info-title-date">
                                <h4>{content.title}</h4>
                                <p className="info-date">{convertFullDate(content.createdAt)}</p>
                            </div>
                            {
                                photographerInfo &&
                                <div className="info-text-infos-wrapper">
                                    <div className="photo-info-unit">
                                        <div className="photo-info-label">Photo By</div>
                                        <Image className="photo-info-profile" imgSrc={photographerInfo.profile_path} defaultImgSrc={defaultProfile}/>
                                        <div>{photographerInfo.nickname}</div>
                                    </div>
                                </div>
                            }
                            {
                                content.text &&
                                <div className="enif-divider"></div>
                            }
                            <div className="info-text-infos-wrapper">
                                <div className="info-text-wrapper">
                                    <p>{breakLine(content.text)}</p>
                                </div>
                                <div className="enif-divider"></div>
                                <div className="info-infos-wrapper">
                                    {photoInfo.date && (
                                        <div className="photo-info-unit">
                                            <div className="photo-info-label">Date</div>
                                            <div>{convertDate(photoInfo.date)}</div>
                                        </div>
                                    )}
                                    {photoInfo.location && (
                                        <div className="photo-info-unit">
                                            <div className="photo-info-label">Location</div>
                                            <div>{photoInfo.location}</div>
                                        </div>)}

                                    {photoInfo.camera && (
                                        <div className="photo-info-unit">
                                            <div className="photo-info-label">Camera</div>
                                            <div>{photoInfo.camera}</div>
                                        </div>)}

                                    {photoInfo.lens && (
                                        <div className="photo-info-unit">
                                            <div className="photo-info-label">Lens</div>
                                            <div>{photoInfo.lens}</div>
                                            {photoInfo.focal_length && (
                                                <>
                                                    <div className="photo-info-label">@</div>
                                                    <div>{photoInfo.focal_length}mm</div>
                                                </>)}
                                        </div>)}


                                    {(photoInfo.f_stop || photoInfo.exposure_time || photoInfo.iso) && (
                                        <div className="photo-info-unit">
                                            <div className="photo-info-label">Setting</div>
                                            <div>
                                                {photoInfo.f_stop && <>F/{photoInfo.f_stop}</>}
                                                {photoInfo.exposure_time && <> {photoInfo.exposure_time}</>}
                                                {photoInfo.iso && <> ISO{photoInfo.iso}</>}
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                        </div>
                        <div className="enif-divider"></div>
                        {
                            userInfo &&
                            <>
                                <ProfileMini profileImg={userInfo.profile_path} nickname={userInfo.nickname} userDesc={userInfo.introduction} />
                                <div className="enif-divider"></div>
                            </>
                        }
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

export default ExhibitPhotoComponent;