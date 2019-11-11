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
                    <div className="photo-section-right">
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
                                </div>
                                <div className="info-basic enif-flex-horizontal">
                                    <div className="enif-flex-horizontal">
                                        <i className="material-icons">visibility</i>
                                        <p className="">{content.view_num}</p>
                                        {
                                            userInfo &&
                                            <>
                                                <i className="material-icons">create</i>
                                                <p className="">{userInfo.nickname}</p>
                                            </>
                                        }
                                    </div>
                                    <div className="enif-flex-horizontal">
                                        <i className="material-icons">schedule</i>
                                        <p className="">{convertFullDate(content.createdAt)}</p>
                                    </div>
                                </div>

                                <div className="info-text-infos-wrapper">
                                    <div className="enif-divider"></div>
                                    <div className="info-infos-wrapper">
                                        {
                                            (photographerInfo || photoInfo.photographer_alt) &&
                                            <div className="photo-info-unit">
                                                <div className="photo-info-label">Photo By</div>
                                                {photographerInfo
                                                    ?
                                                    <>
                                                        <Image className="photo-info-profile" imgSrc={photographerInfo.profile_path} defaultImgSrc={defaultProfile} />
                                                        <div>{photographerInfo.nickname}</div>
                                                    </>
                                                    :
                                                    <div>{photoInfo.photographer_alt}</div>
                                                }
                                            </div>
                                        }
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
                                    {
                                        content.text &&
                                        <>
                                            <div className="enif-divider"></div>
                                            <div className="info-text-wrapper">
                                                <p>{breakLine(content.text)}</p>
                                            </div>
                                        </>
                                    }
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