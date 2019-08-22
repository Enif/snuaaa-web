import React from 'react'
import { convertDateWithDay, convertTime } from 'utils/convertDate';

function RiseSetMobile({ riseSetInfo }) {
    const today = new Date();

    return (
        <div className="rise-set-mobile-wrapper">
            <div className="moon-phase-wrapper">
                {/* <div className="moon-phase"></div> */}
                <div className="moon-container">
                    <div className={`phase-${Math.round(riseSetInfo.lunAge * 100 / 29.7)} northern-hemisphere`}>
                        <div className="half">
                            <div className="ellipse white"></div>
                            <div className="ellipse black"></div>
                        </div>
                        <div className="half">
                            <div className="ellipse black"></div>
                            <div className="ellipse white"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rise-set-desc">
                <h5>{convertDateWithDay(today)}</h5>
                <p>월령 {riseSetInfo.lunAge}</p>
            </div>
            {/* <p>일출 {convertTime(riseSetInfo.sunrise)} / 일몰 {convertTime(riseSetInfo.sunset)}</p>
            <p>월출 {convertTime(riseSetInfo.moonrise)} / 월몰 {convertTime(riseSetInfo.moonset)}</p>
            <p>천문박명 {convertTime(riseSetInfo.astm)} / {convertTime(riseSetInfo.aste)} </p> */}
        </div>
    )
}

export default RiseSetMobile;
