import React from 'react';
import map from 'assets/img/map_google.png'

class Contact extends React.Component {

    render() {
        return (
            <div className="intro-div-wrapper" id="contact">
                <h3>Contact Us</h3>
                <div className="intro-contact-wrapper">
                    <img src={map} alt="map" />
                    <h4>서울대학교 아마추어 천문회<br />
                        Amateur Astronomy Association
                    </h4>
                    <p className="intro-content">
                        08826<br />
                        서울특별시 관악구 관악로 1, 서울대학교 학생회관 63동 611호<br />
                        Seoul National University, Students' union, Building 63, 6F, 611<br />
                        1 Gwanak-ro, Gwanak-gu, Seoul, KR<br />
                        <br />
                        www.snuaaa.net<br />
                        02-874-9374<br />
                    </p>
                </div>
            </div>
        )
    }
}

export default Contact;