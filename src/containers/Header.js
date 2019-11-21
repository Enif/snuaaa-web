import React from 'react';
import { connect } from 'react-redux';
import history from 'common/history';

import { authLogout } from '../actions';
import logo from '../assets/img/logo_white.png'
import imgProfile from '../assets/img/profile.png';
import Navigation from '../components/Header/Navigation'
import PopupUser from '../components/Header/PopupUser'
import Image from '../components/Common/Image';
import * as service from 'services';


const TAG = 'HEADER';

class Header extends React.Component {

    constructor(props) {
        console.log(`[%s] constructor`, TAG)
        super(props);
        this.state = {
            isShowPopupUser: false,
            boards: []
        }
    }

    togglePopup = () => {
        this.setState({
            isShowPopupUser: !this.state.isShowPopupUser
        })
    }

    componentDidMount() {
        console.log(`[%s] componentDidMount`, TAG)
        this.fetch();
    }

    clickLogo = () => {
        if (history.location.pathname === '/') {
            window.location.reload();
        }
        else {
            history.push('/');
        }
    }

    fetch = async () => {
        await service.retrieveBoards()
            .then((res) => {
                this.setState({
                    boards: res.data
                })
            })
            .catch((err) => {
                console.error(err);
            })
    }

    render() {

        const { clickLogo } = this;
        const { level, profile_path } = this.props;
        const { isShowPopupUser, boards } = this.state;
        return (
            <>
                <div id="aaa-top" className="main-header-wrapper">
                    <div className="main-header">
                        <div className="header-logo" onClick={clickLogo}>
                            <img src={logo} alt="logo" /><p>서울대학교 아마추어 천문회</p>
                        </div>
                        {
                            level > 0 &&
                            <div className="profile-img-wrapper">
                                <Image className="profile-img" onClick={this.togglePopup} imgSrc={profile_path} defaultImgSrc={imgProfile} />
                                {
                                    isShowPopupUser &&
                                    <PopupUser
                                        profile_path={profile_path}
                                        togglePopup={this.togglePopup}
                                        logout={
                                            () => {
                                                this.props.onLogout();
                                            }
                                        } />
                                }
                            </div>
                        }
                        {
                            level === 0 &&
                            <div className="guest-logout-wrapper">
                                <p onClick={this.props.onLogout}>LOGOUT</p>
                            </div>
                        }
                    </div>
                </div>
                <Navigation boards={boards} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginState: state.authentication.isLoggedIn,
        nickname: state.authentication.nickname,
        level: state.authentication.level,
        profile_path: state.authentication.profile_path
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header);
