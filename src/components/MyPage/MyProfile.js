import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/AaaImage.tsx';
import imgDefaultProfile from 'assets/img/profile.png';
import { breakLine } from 'utils/breakLine';

function MyProfile({ userInfo, isCanEdit }) {

    const [isExpand, setIsExpand] = useState(false);

    let descClass = isExpand ? "userdesc expanded" : "userdesc";
    let iconClass = isExpand ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line";

    return (
        <div className="my-profile-wrapper">
            <div className="my-left">
                <div className="profile-img">
                    <Image imgSrc={userInfo.profile_path} defaultImgSrc={imgDefaultProfile} />
                </div>
                <div className="nickname">{userInfo.nickname}</div>
                <div className="aaa-no">{userInfo.aaa_no}</div>
                
                {isCanEdit &&
                    <div className="btn-edit-info">
                        <Link to="profile">
                            <button>회원정보 수정</button>
                        </Link>
                    </div>
                }
            </div>
            <div className="enif-divider"></div>
            <div className="my-right">
                <div className={descClass}>{breakLine(userInfo.introduction)}</div>
                <div className="icon-expand">
                    <i className={`${iconClass} enif-pointer`} onClick={() => setIsExpand(!isExpand)}></i>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;