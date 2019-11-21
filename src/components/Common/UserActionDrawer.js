import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserActionDrawer({ children, user_uuid }) {

    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        if (isOpened) {
            window.addEventListener('click', closeDrawer, true)
        }
        else {
            window.removeEventListener('click', closeDrawer, true)
        }
    }, [isOpened])

    const closeDrawer = function () {
        setIsOpened(false);
        window.removeEventListener('click', closeDrawer, true)
    }

    const clickChildren = function (e) {
        setIsOpened(!isOpened);
    }

    return (
        <>
            <span className="enif-pointer" onClick={clickChildren}>
                {children}
            </span>
            <div className="actions-drawer">
                {
                    isOpened &&
                    <Link to={`/userpage/${user_uuid}`}>
                        <div className={`user-actions-wrapper ${isOpened && " opened"}`}>
                            <div className="edit-delete-wrapper">
                                <div className="action-unit-wrapper edit-wrapper" >
                                    <div className="action-unit">
                                        <i className="ri-account-box-line enif-f-1p2x"></i>&nbsp;유저정보
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                }
            </div>
        </>
    )
}

export default UserActionDrawer;
