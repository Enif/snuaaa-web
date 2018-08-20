import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loginCheck, authLogout } from '../actions';


const TAG = 'HEADER';

class Header extends React.Component {

    constructor(props) {
        console.log(`[%s] constructor`, TAG)
        super(props);
        this.checkToken();
    }

    componentDidMount() {
        console.log(`[%s] componentDidMount`, TAG)
    }

    // App.js에서 확인해야하나 router 문제로 header에 임시로 생성하였음.
    checkToken = () => {
        console.log(`[%s] checkToken`, TAG)
        const token = localStorage.getItem('token');
        if(!token){
            //토큰이 없으면 logout
        }
        else {
            console.log(`[%s] Token exists`, TAG)
            // 토큰valid 확인 , invalid => logout, valid => 로그인 유지(연장)
            this.props.onLoginCheck();
        }
    }

    render() {
        const activeStyle = {
            fontWeight: 'bold',
            color: '#54afff'
        };

        const { loginState } = this.props
        console.log('[%s]' + JSON.stringify(this.props), TAG);
        console.log('[%s]' + loginState, TAG);

        return (
            <div id="main-header-wrapper">
                <div id="main-header">
                    <div id="header-sign">
                        {
                            !loginState ?
                            (<p>
                                <Link to="signup"> SIGN UP </Link>
                                /
                                <Link to="login"> LOG IN </Link>
                            </p>)
                            :
                            (<p>
                                <Link to="userinfo"> INFO </Link>
                                /
                                <a onClick={this.props.onLogout}> LOG OUT </a>
                            </p>)
                        }
                        
                    </div>
                </div>
                <div id="main-menu-nav-wrapper">
                    <nav>
                        <input className="nav-toggle" id="nav-toggle" type="checkbox"/> 
                        <label className="navicon" htmlFor="nav-toggle"><span className="navicon-bar"></span></label>
                            
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
        );
    }
}

//export default Header;

const mapStateToProps = (state) => {
    return {
        loginState: state.authentication.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginCheck: () => dispatch(loginCheck()),
        onLogout: () => dispatch(authLogout())
    }
}

//export default Header
export default connect(mapStateToProps, mapDispatchToProps)(Header);