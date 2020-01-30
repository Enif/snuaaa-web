import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../components/Common/AaaImage';
import imgProfile from '../../assets/img/profile.png';

type PopupUserProps = {
    profile_path: string;
    togglePopup: () => void;
    logout: () => void;
}

function PopupUser({ profile_path, togglePopup, logout }: PopupUserProps) {

    useEffect(() => {
        window.addEventListener('click', togglePopup);
        document.body.classList.add('enif-overflow-hidden-mobile');
        return function() {
            window.removeEventListener('click', togglePopup);
            document.body.classList.remove('enif-overflow-hidden-mobile');
        }
    }, [])

    return (
        <div className="popup-user-wrapper" onClick={(e) => e.stopPropagation()}>
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
