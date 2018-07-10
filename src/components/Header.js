import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class Header extends React.Component {

    render() {
        const activeStyle = {
            fontWeight: 'bold',
            color: '#54afff'
        };

        return (
            <div>
                <div id="main-header-wrapper">
                    <div id="main-header">
                        <div id="header-sign">
                            <p>
                                <Link to="signup"> SIGN UP </Link>
                                /
                                <Link to="login"> LOG IN </Link>
                            </p>
                        </div>
                    </div>
                    <div id="main-menu-nav-wrapper">
                        <nav>
                            <input className="nav-toggle" id="nav-toggle" type="checkbox"/> 
                            <label className="navicon" for="nav-toggle"><span class="navicon-bar"></span></label>
                                
                            <ul className="nav-items">
                                <li className="menu-nav"><NavLink to="/" activeStyle={activeStyle}>★</NavLink></li>
                                <li className="menu-nav"><NavLink to="/about" activeStyle={activeStyle}>동아리 소개</NavLink></li>
                                <li className="menu-nav"><NavLink to="/notice" activeStyle={activeStyle}>별들의 알림</NavLink></li>
                                <li className="menu-nav"><NavLink to="/board" activeStyle={activeStyle}>별들의 이야기</NavLink></li>
                                <li className="menu-nav"><NavLink to="/album" activeStyle={activeStyle}>별들의 순간</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;