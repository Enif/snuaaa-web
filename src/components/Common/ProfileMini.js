import React, { useState } from 'react';
import Image from './Image';
import defaultProfile from 'assets/img/profile.png';
import { breakLine } from 'utils/breakLine';
import UserActionDrawer from './UserActionDrawer';

function ProfileMini({ userInfo }) {

    const [isExpand, setIsExpand] = useState(false);

    let descClass = isExpand ? "userdesc expanded" : "userdesc";

    return (
        <div className="profile-mini-wrapper">
            <div className="profile-img">
                <UserActionDrawer user_uuid={userInfo.user_uuid}>
                    <Image imgSrc={userInfo.profile_path} defaultImgSrc={defaultProfile} />
                </UserActionDrawer>
            </div>
            <div className="nickname">{userInfo.nickname}</div>
            <div className={descClass}>{breakLine(userInfo.introduction)}</div>
            <div className="icon-expand">
                <i className={`${isExpand ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} enif-f-1x enif-pointer`} onClick={() => setIsExpand(!isExpand)}></i>
            </div>
        </div>
    )
}

export default ProfileMini;