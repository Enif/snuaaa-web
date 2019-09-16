import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditPassword from './EditPassword';
import EditProfile from './EditProfile';

function EditMyInfo() {

    const [isSelectInfo, setIsSelectInfo] = useState(true);


    return (
        <div>
            <div className="my-title-wrapper">
                <Link to={'/mypage/info'}>
                    <i className="material-icons">keyboard_backspace</i>
                </Link>
                <h3>Profile</h3>
            </div>

            <div className="my-select-edit-wrapper">
                <button className={`my-select-edit-btn ${isSelectInfo ? "selected" : ""}`} onClick={() => setIsSelectInfo(true)}>개인정보 변경</button>
                <button className={`my-select-edit-btn ${isSelectInfo ? "" : "selected"}`} onClick={() => setIsSelectInfo(false)}>비밀번호 변경</button>
            </div>
            {
                isSelectInfo ?
                    <EditProfile />
                    :
                    <EditPassword />
            }
        </div>
    )
}

export default EditMyInfo;
