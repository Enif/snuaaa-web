import React from 'react';

const PopUp = ({ title, contents }) => {
    return (
        <div className="popup-wrapper">
            <div className="popup-box">
                <div className="popup-star">★</div>
                <h5>{title}</h5>
                <div className="popup-contents">
                    {contents && <p>{contents.split('\n').map(line => {
                        return (<span>{line} <br /></span>)
                    })}</p>}
                </div>

            </div>
        </div>
    )
}

export default PopUp;