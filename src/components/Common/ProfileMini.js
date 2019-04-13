import React from 'react';
import Image from './Image';
import { breakLine } from '../../utils/breakLine';

const ProfileMini = ({profileImg, nickname, userDesc}) => {
    return (
        <div className="profile-mini-wrapper">
            <div className="profile-img">
                <Image imgSrc={profileImg}/>
            </div>
            <div className="nickname">{nickname}</div>
            <div className="userdesc">{breakLine(userDesc)}</div>
        </div>
    )
}

export default ProfileMini;