import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'components/Common/Image';
import imgProfile from 'assets/img/profile.png';

const PopupUser = ({profile_path, togglePopup, logout}) => {

    return (
        <div className="popup-user-wrapper">
            <div className="btn-toggle" onClick={togglePopup}>
                <i className="material-icons">close</i>
            </div>
            <div className="poup-profile-wrapper">
                <Image imgSrc={profile_path} defaultImgSrc={imgProfile} className="poup-profile" />
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
