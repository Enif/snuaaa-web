import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from './Image';
import defaultProfile from 'assets/img/profile.png';
import { breakLine } from 'utils/breakLine';

function ProfileMini({ profileImg, nickname, userDesc, uuid }) {

    const [isExpand, setIsExpand] = useState(false);
    const [isOpened, setIsOpened] = useState(false);

    let descClass = isExpand ? "userdesc expanded" : "userdesc";
    let icon = isExpand ? "expand_less" : "expand_more"

    return (
        <div className="profile-mini-wrapper">
            <div className="profile-img">
                <Image imgSrc={profileImg} defaultImgSrc={defaultProfile} onClick={() => setIsOpened(!isOpened)} />
                <div className="actions-drawer">
                    {
                        <div className={`user-actions-wrapper ${isOpened && " opened"}`}>
                            <div className="edit-delete-wrapper">
                                <div className="action-unit-wrapper edit-wrapper" >
                                    <Link to={`/userpage/${uuid}`}>
                                        <div className="action-unit">
                                            <i className="material-icons">account_circle</i>&nbsp;유저정보
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="nickname">{nickname}</div>
            <div className={descClass}>{breakLine(userDesc)}</div>
            <div className="icon-expand">
                <i className="material-icons pointer" onClick={() => setIsExpand(!isExpand)}>{icon}</i>
            </div>
        </div>
    )
}

export default ProfileMini;