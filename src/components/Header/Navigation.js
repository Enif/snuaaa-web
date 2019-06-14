import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const TAG = 'Navication';

class Navigation extends React.Component {

    constructor(props) {
        console.log(`[%s] constructor`, TAG)
        super(props);
        this.state = {
            isShowAbout: false,
            isShowNotice: false,
            isShowBoard: false,
            isShowPhotoBoard: false,
            isShowOfficial: false,
        }
    }

    setShowAbout = (isShow) => {
        this.setState({
            isShowAbout: isShow
        })
    }

    setShowNotice = (isShow) => {
        this.setState({
            isShowNotice: isShow
        })
    }

    setShowBoard = (isShow) => {
        this.setState({
            isShowBoard: isShow
        })
    }

    setShowPhotoBoard = (isShow) => {
        this.setState({
            isShowPhotoBoard: isShow
        })
    }

    setShowOfficial = (isShow) => {
        this.setState({
            isShowOfficial: isShow
        })
    }


    render() {

        let subAboutClass = 'menu-nav-sub' + (this.state.isShowAbout ? '' : ' menu-nav-hidden')
        let subNoticeClass = 'menu-nav-sub' + (this.state.isShowNotice ? '' : ' menu-nav-hidden')
        let subBoardClass = 'menu-nav-sub' + (this.state.isShowBoard ? '' : ' menu-nav-hidden')
        let subPhotoBoardClass = 'menu-nav-sub' + (this.state.isShowPhotoBoard ? '' : ' menu-nav-hidden')
        let subOfficialClass = 'menu-nav-sub' + (this.state.isShowOfficial ? '' : ' menu-nav-hidden')

        const activeStyle = {
            fontWeight: 'bold',
            color: '#fad55f'
        };

        return (
            <div className="main-menu-nav-wrapper pos-relative">
                <nav>
                    {/* <input className="nav-toggle" id="nav-toggle" type="checkbox"/> 
                    <label className="navicon" htmlFor="nav-toggle"><span className="navicon-bar"></span></label> */}
                        
                    <ul className="nav-items">
                        <li className="menu-nav">                            
                            <NavLink to="/" activeStyle={activeStyle}>
                                <div className="menu-item-1">★</div>
                            </NavLink>
                        </li>
                        <li className="menu-nav" onClick={() => this.setShowAbout(true)} onMouseEnter={() => this.setShowAbout(true)} onMouseLeave={() => this.setShowAbout(false)}>
                            <div className="menu-item-1"><span></span>AAA소개</div>
                            {
                                <div className={subAboutClass}>
                                    <ul>
                                        <Link to='/about/aboutAAA'><li>AAA는?</li></Link>
                                        <Link to='/about/contact'><li>찾아오는길&amp;연락처</li></Link>
                                        <Link to='/about/equipment'><li>장비소개</li></Link>
                                        <Link to='/about/observation'><li>김태영<span> 기념</span> 관측소<span> 소개</span></li></Link>
                                        <Link to='/about/history'><li>동아리 발자취</li></Link>
                                        <Link to='/about/officers'><li><span>역대 </span>회장단/임원진</li></Link>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li className="menu-nav" onClick={() => this.setShowNotice(true)} onMouseEnter={() => this.setShowNotice(true)} onMouseLeave={() => this.setShowNotice(false)}>
                            <div className="menu-item-1"><span></span>AAA알림</div>
                            {
                                <div className={subNoticeClass}>
                                    <ul>
                                        <Link to='/board/brd01'><li>소리통</li></Link>
                                        <Link to='/board/brd02'><li>천기누설</li></Link>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li className="menu-nav" onClick={() => this.setShowBoard(true)} onMouseEnter={() => this.setShowBoard(true)} onMouseLeave={() => this.setShowBoard(false)}>
                            <div className="menu-item-1"><span></span>AAA일상</div>
                            {
                                <div className={subBoardClass}>
                                    <ul>
                                        <Link to='/board/brd03'><li>낡은읽기장</li></Link>
                                        <Link to='/board/brd04'><li>관측게시판</li></Link>
                                        <Link to='/board/brd10'><li>후기게시판</li></Link>
                                        <Link to='/board/brd91'><li>운영자에게</li></Link>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li className="menu-nav" onClick={() => this.setShowOfficial(true)} onMouseEnter={() => this.setShowOfficial(true)} onMouseLeave={() => this.setShowOfficial(false)}>
                            <div className="menu-item-1"><span></span>AAA기록</div>
                            {
                                <div className={subOfficialClass}>
                                    <ul>
                                        <Link to='/board/brd05'><li>아고라</li></Link>
                                        <Link to='/board/brd09'><li>문서보관소</li></Link>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li className="menu-nav" onClick={() => this.setShowPhotoBoard(true)} onMouseEnter={() => this.setShowPhotoBoard(true)} onMouseLeave={() => this.setShowPhotoBoard(false)}>
                            <div className="menu-item-1"><span></span>AAA사진</div>
                            {
                                <div className={subPhotoBoardClass}>
                                    <ul>
                                        <Link to='/board/brd07'><li>추억만들기</li></Link>
                                        <Link to='/board/brd08'><li>별사진</li></Link>
                                    </ul>
                                </div>
                            }
                        </li>
                        {/* <li className="menu-nav"><a href="http://snuaaa.net">별들의 흔적</a></li> */}
                    </ul>
                </nav>
            </div>
        )
    }
} 

export default Navigation
