import React, { useState } from 'react';
import Image from './Image';
import { breakLine } from '../../utils/breakLine';

function ProfileMini({profileImg, nickname, userDesc}) {

    const [isExpand, setIsExpand] = useState(false);

    let descClass = isExpand ? "userdesc expanded" : "userdesc";
    let icon = isExpand ? "expand_less" : "expand_more"

    return (
        <div className="profile-mini-wrapper">
            <div className="profile-img">
                <Image imgSrc={profileImg}/>
            </div>
            <div className="nickname">{nickname}</div>
            <div className={descClass}>{breakLine(userDesc)}</div>
            <div>
                <i className="material-icons pointer" onClick={() => setIsExpand(!isExpand)}>{icon}</i>
            </div>
        </div>
    )
}

export default ProfileMini;