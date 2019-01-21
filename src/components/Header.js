import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loginCheck, authLogout } from '../actions';
import UserContext from '../UserContext';

const TAG = 'HEADER';

class Header extends React.Component {

    constructor(props) {
        console.log(`[%s] constructor`, TAG)
        super(props);
        this.state = {
            isShowBoard: false,
            isShowPhotoBoard: false
        }
    }

    componentDidMount() {
        console.log(`[%s] componentDidMount`, TAG)
    }

    showBoardList = () => {
        this.setState({
            isShowBoard: true
        })
    }

    showPhotoBoardList = () => {
        this.setState({
            isShowPhotoBoard: true
        })
    }

    hideBoardList = () => {
        this.setState({
            isShowBoard: false
        })
    }

    hidePhotoBoardList = () => {
        this.setState({
            isShowPhotoBoard: false
        })
    }

    render() {
        const activeStyle = {
            fontWeight: 'bold',
            color: '#e2ad5f'
        };

        const { loginState } = this.props

        return (
            <div className="main-header-wrapper">
                <div className="main-header">
                    <div className="header-sign">
                        {
                            !loginState ?
                            (<p>
                                <Link to="/signup"> SIGN UP </Link>
                                /
                                <Link to="/login"> LOG IN </Link>
                            </p>)
                            :
                            (<p>
                                <Link to="/userinfo"> INFO </Link>
                                /
                                <a onClick={this.props.onLogout}> LOG OUT </a>
                            </p>)
                        }
                    </div>
                </div>
                <div className="main-menu-nav-wrapper">
                    <nav>
                        <input className="nav-toggle" id="nav-toggle" type="checkbox"/> 
                        <label className="navicon" htmlFor="nav-toggle"><span className="navicon-bar"></span></label>
                            
                        <ul className="nav-items">
                            <li className="menu-nav"><NavLink to="/" activeStyle={activeStyle}>★</NavLink></li>
                            <li className="menu-nav"><NavLink to="/about" activeStyle={activeStyle}>동아리 소개</NavLink></li>
                            <li className="menu-nav" onMouseEnter={() => this.showBoardList()} onMouseLeave={() => this.hideBoardList()}>
                                <NavLink to="/board/b01" activeStyle={activeStyle}>별들의 이야기</NavLink>
                                {
                                    this.state.isShowBoard &&
                                    <div className="menu-nav-sub">
                                        <ul>
                                            <li><NavLink to='/board/b01' proptest="ttt1">천기누설</NavLink></li>
                                            <li><NavLink to='/board/b02' proptest="ttt2">낡은읽기장</NavLink></li>
                                            <li><NavLink to='/board/b03' proptest="ttt3">관측게시판</NavLink></li>
                                            <li><NavLink to='/board/b04' proptest="ttt4">아고라</NavLink></li>
                                        </ul>
                                    </div>
                                }
                            </li>
                            <li className="menu-nav" onMouseEnter={() => this.showPhotoBoardList()} onMouseLeave={() => this.hidePhotoBoardList()}>
                                <NavLink to="/photoboard/pb01" activeStyle={activeStyle}>별들의 순간</NavLink>
                                {
                                    this.state.isShowPhotoBoard &&
                                    <div className="menu-nav-sub">
                                        <ul>
                                            <li><NavLink to='/photoboard/pb01' proptest="ttt1">추억만들기</NavLink></li>
                                            <li><NavLink to='/photoboard/pb02' proptest="ttt2">별사진</NavLink></li>
                                        </ul>
                                    </div>
                                }
                            </li>
                            <li className="menu-nav"><a href="http://snuaaa.net">별들의 흔적</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Header);