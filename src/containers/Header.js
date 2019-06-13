import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authLogout } from '../actions';
import logo from '../assets/img/logo_white.png'
import imgProfile from '../assets/img/profile.png';
import Navigation from '../components/Header/Navigation'
import PopupUser from '../components/Header/PopupUser'
import Image from '../components/Common/Image';



const TAG = 'HEADER';

class Header extends React.Component {

    constructor(props) {
        console.log(`[%s] constructor`, TAG)
        super(props);
        this.state = {
            isShowPopupUser: false
        }
    }

    togglePopup = () => {
        this.setState({
            isShowPopupUser: !this.state.isShowPopupUser
        })
    }

    componentDidMount() {
        console.log(`[%s] componentDidMount`, TAG)
    }

    render() {

        console.log(window.location.pathname)

        const { loginState, profile_path } = this.props;
        let { isShowPopupUser } = this.state;
        console.log(this.props)
        return (
            <>
                <div className="main-header-wrapper">
                    <div className="main-header">
                        <Link to="/">
                            <div className="header-logo">
                                <img src={logo} alt="logo" /><p>서울대학교 아마추어 천문회</p>
                            </div>    
                        </Link>
                        {
                            !loginState ?
                            (<p>
                                <Link to="/signup"> SIGN UP </Link>
                                /
                                <Link to="/login"> LOG IN </Link>
                            </p>)
                            :
                            (<div className="profile-img-wrapper">
                                <Image onClick={this.togglePopup} imgSrc={profile_path} defaultImgSrc={imgProfile} />
                                {/* <img onClick={this.togglePopup} src={imgProfile}/> */}
                                {
                                    isShowPopupUser && <PopupUser togglePopup={this.togglePopup} logout={this.props.onLogout}/>
                                }
                            </div>)
                        }
                    </div>
                </div>
                <Navigation />
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

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Header);