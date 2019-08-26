import React, { useState } from 'react';

function UserActionDrawer({ children, clickUserInfo }) {

    const [isOpened, setIsOpened] = useState(false);
    const clickChildren = function () {
        setIsOpened(!isOpened);
    }

    return (
        <>
            {
                React.cloneElement(
                    children,
                    {
                        onClick: clickChildren
                    },
                    
                )
            }
            <div className="actions-drawer">
                {
                    <div className={`actions-wrapper ${isOpened && " opened"}`}>
                        <div className="edit-delete-wrapper">
                            <div className="action-unit-wrapper edit-wrapper" onClick={clickUserInfo}>
                                <div className="action-unit">
                                    <i className="material-icons">account_circle</i>&nbsp;유저정보
                            </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default UserActionDrawer;
