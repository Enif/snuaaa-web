import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
            <div>
                <div id="main-header-wrapper">
                    <div id="main-header">
                    </div>
                    <div id="main-menu-nav-wrapper">
                        <nav>
                            <ul>
                                {/* <li className="menu-nav"><NavLink exact to="/" activeStyle="">★</NavLink></li> */}
                                <li className="menu-nav">★</li>
                                <li className="menu-nav">동아리 소개</li>
                                <li className="menu-nav">별들의 알림</li>
                                <li className="menu-nav">별들의 이야기</li>
                                <li className="menu-nav">별들의 순간</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;