import React from 'react';
import { Link } from 'react-router-dom';

const PopupUser = ({togglePopup, logout}) => {

    return (
        <div className="popup-user-wrapper">
            <div className="btn-toggle" onClick={togglePopup}>
                <i class="material-icons">close</i>
            </div>
            <Link to="/mypage/profile" onClick={togglePopup}>
                <p>My Page</p>
            </Link>
            <Link to="/mypage/post" onClick={togglePopup}>
                <p>Post &amp; Comments</p>
            </Link>
            <p onClick={() => {
                logout();
                togglePopup();
                }}>Log out</p>
        </div>
    )
}

export default PopupUser;
