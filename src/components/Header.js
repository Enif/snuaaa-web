import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loginCheck, authLogout } from '../actions';
import logo from '../assets/img/logo_white.png'
import UserContext from '../UserContext';

const TAG = 'HEADER';

class Header extends React.Component {

    constructor(props) {
        console.log(`[%s] constructor`, TAG)
        super(props);
        this.state = {
            isShowAbout: false,
            isShowBoard: false,
            isShowPhotoBoard: false
        }
    }

    componentDidMount() {
        console.log(`[%s] componentDidMount`, TAG)
    }

    setShowAbout = (isShow) => {
        this.setState({
            isShowAbout: isShow
        })
    }

    toggleShowAbout = () => {
        this.setState({
            isShowAbout: !this.state.isShowAbout
        })
    }

    setShowBoard = (isShow) => {
        this.setState({
            isShowBoard: isShow
        })
    }

    toggleShowBoard = () => {
        this.setState({
            isShowBoard: !this.state.isShowBoard
        })
    }

    setShowPhotoBoard = (isShow) => {
        this.setState({
            isShowPhotoBoard: isShow
        })
    }

    toggleShowPhotoBoard = () => {
        this.setState({
            isShowPhotoBoard: !this.state.isShowPhotoBoard
        })
    }


    render() {
        const activeStyle = {
            fontWeight: 'bold',
            color: '#fad55f'
        };

        const { loginState } = this.props
        let subAboutClass = 'menu-nav-sub' + (this.state.isShowAbout ? '' : ' menu-nav-hidden')
        let subBoardClass = 'menu-nav-sub' + (this.state.isShowBoard ? '' : ' menu-nav-hidden')
        let subPhotoBoardClass = 'menu-nav-sub' + (this.state.isShowPhotoBoard ? '' : ' menu-nav-hidden')


        return (
            <div className="main-header-wrapper">
                <div className="main-header">
                    <div className="header-logo">
                        <Link to="/"><img src={logo} /></Link>
                    </div>
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
                            <li className="menu-nav" onClick={() => this.toggleShowAbout()} onMouseEnter={() => this.setShowAbout(true)} onMouseLeave={() => this.setShowAbout(false)}>
                                <a href="#" >동아리 소개</a>
                                {
                                    <div className={subAboutClass}>
                                        <ul>
                                            <Link to='/about/aboutAAA'><li>AAA는 ?</li></Link>
                                            <Link to='/about/contact'><li>찾아오는길 &amp; 연락처</li></Link>
                                            <Link to='/about/equipment'><li>장비소개</li></Link>
                                            <Link to='/about/observation'><li>김태영 기념 관측소 소개</li></Link>
                                            <Link to='/about/history'><li>동아리 발자취</li></Link>
                                            <Link to='/about/officers'><li>역대 회장단 / 임원진</li></Link>
                                        </ul>
                                    </div>
                                }
                            </li>
                            <li className="menu-nav" onClick={() => this.toggleShowBoard()} onMouseEnter={() => this.setShowBoard(true)} onMouseLeave={() => this.setShowBoard(false)}>
                                <a href="#">별들의 이야기</a>
                                {
                                    <div className={subBoardClass}>
                                        <ul>
                                            <Link to='/board/b01'><li>천기누설</li></Link>
                                            <Link to='/board/b02'><li>낡은읽기장</li></Link>
                                            <Link to='/board/b03'><li>관측게시판</li></Link>
                                            <Link to='/board/b04'><li>아고라</li></Link>
                                        </ul>
                                    </div>
                                }
                            </li>
                            <li className="menu-nav" onClick={() => this.toggleShowPhotoBoard()} onMouseEnter={() => this.setShowPhotoBoard(true)} onMouseLeave={() => this.setShowPhotoBoard(false)}>
                                <a href="#">별들의 순간</a>
                                {
                                    <div className={subPhotoBoardClass}>
                                        <ul>
                                            <Link to='/photoboard/pb01'><li>추억만들기</li></Link>
                                            <Link to='/photoboard/pb02'><li>별사진</li></Link>
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