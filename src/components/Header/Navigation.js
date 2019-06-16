import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation({ boards }) {

    const [isShowAbout, setIsShowAbout] = useState(false);
    const [isShowNotice, setIsShowNotice] = useState(false);
    const [isShowBoard, setIsShowBoard] = useState(false);
    const [isShowOfficial, setIsShowOfficial] = useState(false);
    const [isShowPhotoBoard, setIsShowPhotoBoard] = useState(false);


    let subAboutClass = 'menu-nav-sub' + (isShowAbout ? '' : ' menu-nav-hidden')
    let subNoticeClass = 'menu-nav-sub' + (isShowNotice ? '' : ' menu-nav-hidden')
    let subBoardClass = 'menu-nav-sub' + (isShowBoard ? '' : ' menu-nav-hidden')
    let subPhotoBoardClass = 'menu-nav-sub' + (isShowPhotoBoard ? '' : ' menu-nav-hidden')
    let subOfficialClass = 'menu-nav-sub' + (isShowOfficial ? '' : ' menu-nav-hidden')

    const activeStyle = {
        fontWeight: 'bold',
        color: '#fad55f'
    };

    let noticeBoards = [];
    let communityBoards = [];
    let officialBoards = [];
    let photoBoards = [];

    if (boards.length > 0) {
        boards.forEach((board) => {
            if (board.menu == 1) {
                noticeBoards.push(board);
            }
            else if (board.menu == 2) {
                communityBoards.push(board);
            }
            else if (board.menu == 3) {
                officialBoards.push(board);
            }
            else if (board.menu == 4) {
                photoBoards.push(board);
            }
            else {
            }
        })
    }

    function makeBoardList(boards) {
        const boardList = boards.map((board) => {
            return (
                <Link to={`/board/${board.board_id}`} key={board.board_id}>
                    <li>{board.board_name}</li>
                </Link>
            )
        })
        return (
            <ul>{boardList}</ul>
        )
    }

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
                    <li className="menu-nav" onClick={() => setIsShowAbout(true)} onMouseEnter={() => setIsShowAbout(true)} onMouseLeave={() => setIsShowAbout(false)}>
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
                    <li className="menu-nav" onClick={() => setIsShowNotice(true)} onMouseEnter={() => setIsShowNotice(true)} onMouseLeave={() => setIsShowNotice(false)}>
                        <div className="menu-item-1"><span></span>AAA알림</div>
                        <div className={subNoticeClass}>
                            {makeBoardList(noticeBoards)}
                        </div>
                    </li>
                    <li className="menu-nav" onClick={() => setIsShowBoard(true)} onMouseEnter={() => setIsShowBoard(true)} onMouseLeave={() => setIsShowBoard(false)}>
                        <div className="menu-item-1"><span></span>AAA일상</div>
                        <div className={subBoardClass}>
                            {makeBoardList(communityBoards)}
                        </div>
                    </li>
                    <li className="menu-nav" onClick={() => setIsShowOfficial(true)} onMouseEnter={() => setIsShowOfficial(true)} onMouseLeave={() => setIsShowOfficial(false)}>
                        <div className="menu-item-1"><span></span>AAA기록</div>
                        <div className={subOfficialClass}>
                            {makeBoardList(officialBoards)}
                        </div>
                    </li>
                    <li className="menu-nav" onClick={() => setIsShowPhotoBoard(true)} onMouseEnter={() => setIsShowPhotoBoard(true)} onMouseLeave={() => setIsShowPhotoBoard(false)}>
                        <div className="menu-item-1"><span></span>AAA사진</div>
                        <div className={subPhotoBoardClass}>
                            {makeBoardList(photoBoards)}
                        </div>
                    </li>
                    {/* <li className="menu-nav"><a href="http://snuaaa.net">별들의 흔적</a></li> */}
                </ul>
            </nav>
        </div>
    )
}

export default Navigation
