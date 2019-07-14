import React from 'react';

const PopUp = ({ title, contents, isAction, cancel, confirm }) => {
    return (
        <div className="popup-wrapper">
            <div className="popup-box">
                <div className="popup-star">★</div>
                {title && <h5>{title}</h5>}
                <div className="popup-contents">
                    {contents && <p>{contents.split('\n').map(line => {
                        return (<span>{line} <br /></span>)
                    })}</p>}
                </div>
                {isAction &&
                    <div className="popup-action">
                        <button onClick={confirm}>OK</button>
                        <button onClick={cancel}>CANCEL</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default PopUp;