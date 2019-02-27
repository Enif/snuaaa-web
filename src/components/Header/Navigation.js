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
            isShowOfficial: false
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
            <div className="main-menu-nav-wrapper">
                <nav>
                    {/* <input className="nav-toggle" id="nav-toggle" type="checkbox"/> 
                    <label className="navicon" htmlFor="nav-toggle"><span className="navicon-bar"></span></label> */}
                        
                    <ul className="nav-items">
                        <li className="menu-nav"><NavLink to="/" activeStyle={activeStyle}>★</NavLink></li>
                        <li className="menu-nav" onClick={() => this.setShowAbout(true)} onMouseEnter={() => this.setShowAbout(true)} onMouseLeave={() => this.setShowAbout(false)}>
                            <a href="#" ><span>동아리</span> 소개</a>
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
                        <li className="menu-nav" onClick={() => this.setShowNotice(true)} onMouseEnter={() => this.setShowNotice(true)} onMouseLeave={() => this.setShowNotice(false)}>
                            <a href="#"><span>별들의</span> 알림</a>
                            {
                                <div className={subNoticeClass}>
                                    <ul>
                                        <Link to='/board/b00'><li>소리통</li></Link>
                                        <Link to='/board/b01'><li>천기누설</li></Link>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li className="menu-nav" onClick={() => this.setShowBoard(true)} onMouseEnter={() => this.setShowBoard(true)} onMouseLeave={() => this.setShowBoard(false)}>
                            <a href="#"><span>별들의</span> 이야기</a>
                            {
                                <div className={subBoardClass}>
                                    <ul>
                                        <Link to='/board/b02'><li>낡은읽기장</li></Link>
                                        <Link to='/board/b03'><li>관측게시판</li></Link>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li className="menu-nav" onClick={() => this.setShowOfficial(true)} onMouseEnter={() => this.setShowOfficial(true)} onMouseLeave={() => this.setShowOfficial(false)}>
                            <a href="#"><span>별들의</span> 회담</a>
                            {
                                <div className={subOfficialClass}>
                                    <ul>
                                        <Link to='/board/b04'><li>아고라</li></Link>
                                        <Link to='/document'><li>문서보관소</li></Link>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li className="menu-nav" onClick={() => this.setShowPhotoBoard(true)} onMouseEnter={() => this.setShowPhotoBoard(true)} onMouseLeave={() => this.setShowPhotoBoard(false)}>
                            <a href="#"><span>별들의</span> 순간</a>
                            {
                                <div className={subPhotoBoardClass}>
                                    <ul>
                                        <Link to='/photoboard/pb01'><li>추억만들기</li></Link>
                                        <Link to='/photoboard/pb02'><li>별사진</li></Link>
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
