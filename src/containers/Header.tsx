import React, { useState, useContext } from 'react';
import { connect, useDispatch, useSelector, shallowEqual } from 'react-redux';
// import history from 'common/history';

import { authLogout } from '../actions';
import logo from '../assets/img/logo_white.png'
import imgProfile from '../assets/img/profile.png';
import Navigation from '../components/Header/Navigation'
import PopupUser from '../components/Header/PopupUser'
import Image from '../components/Common/AaaImage';
import BoardService from '../services/BoardService';
import BoardContext from '../contexts/BoardContext';
import { useHistory } from 'react-router';
import AuthContext from '../contexts/AuthContext';


const TAG = 'HEADER';

function Header() {

    const [isShowPopupUser, setIsShowPopupUser] = useState(false);
    const history = useHistory();
    const boardContext = useContext(BoardContext);
    console.log(boardContext)
    // const authContext = useContext(AuthContext);

    const dispatch = useDispatch();
    const authentication = useSelector((state: any) => state.authentication)
    const onLogout = () => dispatch(authLogout())
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
                        authentication.level > 0 &&
                        <div className="profile-img-wrapper">
                            <Image className="profile-img" onClick={togglePopup} imgSrc={authentication.profile_path} defaultImgSrc={imgProfile} />
                            {
                                isShowPopupUser &&
                                <PopupUser
                                    profile_path={authentication.profile_path}
                                    togglePopup={togglePopup}
                                    logout={
                                        () => {
                                            onLogout();
                                        }
                                    } />
                            }
                        </div>
                    }
                    {
                        authentication.level === 0 &&
                        <div className="guest-logout-wrapper">
                            <p onClick={onLogout}>LOGOUT</p>
                        </div>
                    }
                </div>
            </div>
            <Navigation boards={boardContext} />
        </>
    );
    // }
}

// const mapStateToProps = (state: any) => {
//     return {
//         loginState: state.authentication.isLoggedIn,
//         nickname: state.authentication.nickname,
//         level: state.authentication.level,
//         profile_path: state.authentication.profile_path
//     }
// }

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         onLogout: () => dispatch(authLogout())
//     }
// }

export default Header;

// export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header);
