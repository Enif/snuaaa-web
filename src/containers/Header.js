import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loginCheck, authLogout } from '../actions';
import logo from '../assets/img/logo_white.png'
import imgProfile from '../assets/img/profile.png';
import UserContext from '../UserContext';
import Navigation from '../components/Header/Navigation'
import PopupUser from '../components/Header/PopupUser'



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
        console.log(window.location.pathname)
    }

    render() {

        const { loginState } = this.props;
        let { isShowPopupUser } = this.state;
        return (
            <div className="main-header-wrapper">
                <div className="main-header">
                    <Link to="/">
                        <div className="header-logo">
                            <img src={logo} /><p>서울대학교 아마추어 천문회</p>
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
                            <img onClick={this.togglePopup} src={imgProfile}/>
                            {
                                isShowPopupUser && <PopupUser togglePopup={this.togglePopup} logout={this.props.onLogout}/>
                            }
                        </div>)
                    }
                </div>
                <Navigation />
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