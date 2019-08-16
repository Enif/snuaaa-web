import React from 'react'
import icon_stella from 'assets/img/common/icon_stella.png';
import icon_apod from 'assets/img/common/icon_apod.png'

const SideBar = () => {

    return (
        <div className="side-right">
            <div className="side-bar-wrapper">
                <a href="https://stellarium-web.org/" target="_blanck">
                    <img src={icon_stella} />
                </a>
                <a href="https://apod.nasa.gov/apod/" target="_blanck">
                    <img src={icon_apod} />
                </a>
                <a href="#aaa-top" className="btn-top-up-link">
                    <div className="btn-top-up">
                        <i className="material-icons pointer">keyboard_arrow_up</i>
                        TOP
                    </div>
                </a>
            </div>
        </div>
    )
}

export default SideBar;

