import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class Header extends React.Component {

    render() {
        const activeStyle = {
            fontWeight: 'bold',
            color: '#FFFFFF'
        };

        return (
            <div>
                <div id="main-header-wrapper">
                    <div id="main-header">
                        <div id="header-sign">
                            <p>
                                <Link to="signup"> SIGN UP </Link>
                                /
                                <Link to="signin"> SIGN IN </Link>
                            </p>
                        </div>
                    </div>
                    <div id="main-menu-nav-wrapper">
                        <nav>
                            <ul>
                                <li className="menu-nav"><NavLink to="/" activeStyle={activeStyle}>★</NavLink></li>
                                <li className="menu-nav"><NavLink to="/about" activeStyle={activeStyle}>동아리 소개</NavLink></li>
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