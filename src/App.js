import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';

import './App.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

import Section from './containers/Section';
import Loading from './components/Common/Loading';
import { getToken } from 'utils/tokenManager';
import { updateToken } from './services';
import { authLogin, authLogout } from './actions';
import history from 'common/history';
// import UserContext from './UserContext';

const TAG = 'App'


class App extends Component {

    constructor(props) {
        console.log(`[%s] constructor`, TAG)
        super(props);
        this.state = {
            isReady: false
        }
    }

    componentDidMount() {
        this.checkToken();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.isReady === false) {
            return false;
        }
        return true;
    }

    checkToken = async () => {
        console.log(`[%s] checkToken`, TAG)

        // const { cookies } = this.props;
        // const token = (sessionStorage.getItem('token') || localStorage.getItem('token'))
        const accessToken = getToken();

        if (!accessToken) {
            //토큰이 없으면 logout
            console.log(window.location.pathname);
            history.push(window.location.pathname);
            this.props.onLogout();
            this.setState({
                isReady: true
            })
        }
        else {
            // 서버에 토큰 확인 , invalid => logout, valid => 로그인 유지(연장)
            await updateToken()
                .then((res) => {
                    console.log(`[${TAG}] Token is valid`)

                    const { token, user_id, nickname, level, profile_path, autoLogin } = res.data;

                    this.props.onAuthLogin(user_id, nickname, level, profile_path, token, autoLogin);
                    this.setState({
                        isReady: true
                    })
                })
                .catch((res) => {
                    console.log(`[${TAG}] Token is not valid`)
                    alert("토큰이 만료되어 로그아웃 됩니다.")
                    console.log(window.location.pathname);
                    history.push(window.location.pathname);
                    this.props.onLogout();
                    this.setState({
                        isReady: true
                    })
                })
        }
    }

    render() {
        console.log(`[${TAG}] render...`);
        let { isReady } = this.state;
        let { loginState } = this.props;
        return (
            <div className="snuaaa-wrapper">
                {(() => {
                    if (!isReady) {
                        return <Loading />
                    }
                    else if (!loginState && !(window.location.pathname === '/page/login' || window.location.pathname === '/page/signup')) {
                        return <Redirect to='/login' />
                    }
                    else {
                        return (
                            <Section />
                        )
                    }
                })()}
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
        onAuthLogin: (user_id, nickname, level, profile_path, token, autoLogin) => dispatch(authLogin(user_id, nickname, level, profile_path, token, autoLogin)),
        onLogout: () => dispatch(authLogout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
