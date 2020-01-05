import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'components/Common/AaaImage.tsx';
import imgProfile from 'assets/img/profile.png';

const PopupUser = ({profile_path, togglePopup, logout}) => {

    return (
        <div className="popup-user-wrapper">
            <div className="btn-toggle" onClick={togglePopup}>
                <i className="ri-icons ri-close-fill"></i>
            </div>
            <div className="popup-profile-wrapper">
                <Image imgSrc={profile_path} defaultImgSrc={imgProfile} className="popup-profile" />
            </div>
            <Link to="/mypage/info" onClick={togglePopup}>
                <p>My Page</p>
            </Link>
            <p onClick={() => {
                logout();
                togglePopup();
                }}>Log out</p>
        </div>
    )
}

export default PopupUser;
