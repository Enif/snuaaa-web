import React from 'react'
import icon_weather from 'assets/img/common/icon_weather.png'
import icon_stella from 'assets/img/common/icon_stella.png';
import icon_apod from 'assets/img/common/icon_apod.png'

const ExtLinkMobile = () => {

    return (
        <div className="ext-link-mobile">
            <a className="link-img" href="http://www.weather.go.kr/weather/main.jsp" target="_blank" rel="noopener noreferrer">
                <img src={icon_weather} alt="weather" />
            </a>
            <a className="link-img" href="https://stellarium-web.org/" target="_blank" rel="noopener noreferrer">
                <img src={icon_stella} alt="stellarium" />
            </a>
            <a className="link-img" href="https://apod.nasa.gov/apod/" target="_blank" rel="noopener noreferrer">
                <img src={icon_apod} alt="apod" />
            </a>
        </div>
    )
}

export default ExtLinkMobile;

