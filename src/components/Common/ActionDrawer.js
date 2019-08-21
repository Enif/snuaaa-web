import React, { useState } from 'react';


function ActionDrawer({ clickEdit, clickDelete }) {

    const [isOpened, setIsOpened] = useState(false);


    return (
        <div className="actions-drawer">
            <i className="material-icons pointer" onClick={() => setIsOpened(!isOpened)}>more_vert</i>
            {
                // isOpened &&
                <div className={`actions-wrapper ${isOpened && " opened"}`}>
                    <div className="edit-delete-wrapper">
                        <div className="action-unit-wrapper edit-wrapper" onClick={clickEdit}>
                            <div className="action-unit">
                                <i className="material-icons">edit</i>&nbsp;수정
                            </div>
                        </div>
                        <div className="action-unit-wrapper delete-wrapper" onClick={clickDelete}>
                            <div className="action-unit">
                                <i className="material-icons">delete</i>&nbsp;삭제
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default ActionDrawer;