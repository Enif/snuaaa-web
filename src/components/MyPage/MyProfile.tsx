import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AaaImage from '../Common/AaaImage';
import imgDefaultProfile from 'assets/img/common/profile.png';
import { breakLine } from '../../utils/breakLine';
import UserType from '../../types/UserType';

type MyProfileProps = {
    userInfo: UserType;
    isCanEdit: boolean;
}

function MyProfile({ userInfo, isCanEdit }: MyProfileProps) {

    const [isExpand, setIsExpand] = useState(false);

    let descClass = isExpand ? "userdesc expanded" : "userdesc";
    let iconClass = isExpand ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line";

    return (
        <div className="my-profile-wrapper">
            <div className="my-left">
                <div className="profile-img-wrapper with-border">
                    <div className={`profile-img-border grade${userInfo.grade ? userInfo.grade : 9}`}>
                        <AaaImage className="profile-img" imgSrc={userInfo.profile_path} defaultImgSrc={imgDefaultProfile} />

                    </div>
                </div>
                <div className="profile-img">
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