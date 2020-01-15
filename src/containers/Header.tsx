import React, { useState, useContext } from 'react';
import logo from '../assets/img/logo_white.png'
import imgProfile from '../assets/img/profile.png';
import Navigation from '../components/Header/Navigation'
import PopupUser from '../components/Header/PopupUser'
import Image from '../components/Common/AaaImage';
import BoardContext from '../contexts/BoardContext';
import { useHistory } from 'react-router';
import AuthContext from '../contexts/AuthContext';


const TAG = 'HEADER';

function Header() {

    const [isShowPopupUser, setIsShowPopupUser] = useState(false);
    const history = useHistory();
    const boardContext = useContext(BoardContext);
    const authContext = useContext(AuthContext);
    // console.log(boardContext)
    // const authContext = useContext(AuthContext);

    // const dispatch = useDispatch();
    // const authentication = useSelector((state: any) => state.authentication)
    // const onLogout = () => dispatch(authLogout())

    // this.state = {
    //     isShowPopupUser: false,
    //     boards: []
    // }

    const togglePopup = () => {
        setIsShowPopupUser(!isShowPopupUser)
        // this.setState({
        //     isShowPopupUser: !this.state.isShowPopupUser
        // })
    }

    // componentDidMount() {
    //     console.log(`[%s] componentDidMount`, TAG)
    //     this.fetch();
    // }

    const clickLogo = () => {
        if (history.location.pathname === '/') {
            window.location.reload();
        }
        else {
            history.push('/');
        }
    }

    // fetch = async () => {
    //     await BoardService.retrieveBoards()
    //         .then((res) => {
    //             this.setState({
    //                 boards: res.data
    //             })
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         })
    // }

    // const { level, profile_path } = this.props;
    // const { isShowPopupUser, boards } = this.state;
    return (
        <>
            <div id="aaa-top" className="main-header-wrapper">
                <div className="main-header">
                    <div className="header-logo" onClick={clickLogo}>
                        <img src={logo} alt="logo" /><p>서울대학교 아마추어 천문회</p>
                    </div>
                    {
                        authContext.authInfo.user.level > 0 &&
                        <div className="profile-img-wrapper">
                            <Image className="profile-img" onClick={togglePopup} imgSrc={authContext.authInfo.user.profile_path} defaultImgSrc={imgProfile} />
                            {
                                isShowPopupUser &&
                                <PopupUser
                                    profile_path={authContext.authInfo.user.profile_path}
                                    togglePopup={togglePopup}
                                    logout={authContext.authLogout} />
                            }
                        </div>
                    }
                    {
                        authContext.authInfo.user.level === 0 &&
                        <div className="guest-logout-wrapper">
                            <p onClick={authContext.authLogout}>LOGOUT</p>
                        </div>
                    }
                </div>
            </div>
            <Navigation boards={boardContext.boardsInfo} />
        </>
    );
    // }
}

export default Header;
